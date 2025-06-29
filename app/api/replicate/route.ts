import { NextResponse } from "next/server";
import Replicate from "replicate"

export const POST = async (req: Request) => {
    try {
        const {prompt} = await req.json();
        console.log("Image Prompt", prompt)

        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN
        })

        //Using flux model (its free actaully hehe)
        const output = await replicate.run("black-forest-labs/flux-schnell",{
            input: {
                prompt: prompt,
                aspect_ratio: "1:1",
                                 num_outputs: 1,
                 output_format: "jpg",
                 output_quality: 80,
                 num_inference_steps: 4
            }
        });

        console.log("repliacte output:", output )

      
        // output will arr of image URLs 
        const imageUrl = Array.isArray(output) ? output[0] : output;

        if(!imageUrl){
            throw new Error("No image generated")
        }

                 //img from the url
         const imageResponse = await fetch(imageUrl);
         if(!imageResponse.ok){
             throw new Error("Failed to fetch generated image")
         }

        console.log("imageRes:",imageResponse)

        const imageBuffer = await imageResponse.arrayBuffer();
        console.log("Img Buffer", imageBuffer)

        const blob = new Blob([imageBuffer], {type: "image/jpg"});

        return new Response(blob, {
            headers: {
                'Content-Type': 'image/png',
                'Content-Disposition': 'attachment; filename="thumbnail.jpg"'
            },
            status: 200
        })
        
    } catch (error) {
        console.error("Replicate api error",error)
        return NextResponse.json({
            error: "Failed to generate img",details: error
        }, {status: 500})
        
    }
}
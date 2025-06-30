import { NextResponse } from "next/server";

export const POST = async(req: Request)=> {
    try {
        const {input } = await req.json();
        console.log("intput",input)

        const token = process.env.HUGGING_FACE_API_KEY
        console.log("tokenee",token)

        const res = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(input)
        })
        console.log("res",res)

        //converting res into blob
        const blob = await res.blob();
        // const buffer = await blob.arrayBuffer();

        //Respond with the img as a buffer (in client side we converting this buffer into a blob)
        const imageName = 'thumbnail.png';
        // const imageBuffer = Buffer.from(buffer);

        return new Response(blob, {
            headers: {
                'Content-Type': 'image/png',
                'Content-Disposition': `attachment; filename="${imageName}"`
            },
            status: 200,
        })

        
    } catch (error:any) {
        console.log("error", error)
        return NextResponse.json({error: error.message})
        
    }

}
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const { prompt } = await req.json();
        console.log("Image Prompt:", prompt);

        // Use Pollinations.ai - completely free, no API key needed
        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&model=flux&nologo=true`;
        
        console.log("Generated image URL:", imageUrl);

        // Fetch the image
        const imageResponse = await fetch(imageUrl);
        if (!imageResponse.ok) {
            throw new Error("Failed to fetch generated image");
        }

        const imageBuffer = await imageResponse.arrayBuffer();
        const blob = new Blob([imageBuffer], { type: 'image/jpeg' });

        return new Response(blob, {
            headers: {
                'Content-Type': 'image/jpeg',
                'Content-Disposition': 'attachment; filename="thumbnail.jpg"'
            },
            status: 200,
        });

    } catch (error: any) {
        console.error("Image generation error:", error);
        return NextResponse.json(
            { error: "Failed to generate image", details: error.message },
            { status: 500 }
        );
    }
};
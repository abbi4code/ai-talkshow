import { NextResponse } from "next/server";
import { ElevenLabsClient } from "elevenlabs"
import { Readable } from "stream";


export const POST = async (req: Request) => {
    try {
        const { voicePrompt, voicetype } = await req.json();

        const elevenlabs = new ElevenLabsClient({
            apiKey: process.env.ELEVEN_LABS_API_URL,
        });
        
        const audioRes = await elevenlabs.generate({
            voice: voicetype,
            text: voicePrompt,
            model_id: "eleven_monolingual_v1"
        })
        // converting it into nodejs readable stream
        const readableAudio = Readable.from(audioRes)
        const chunks = []

        for await (const chunk of readableAudio) {
            chunks.push(chunk)
        }

        const audioBuffer = Buffer.concat(chunks)
        
        return new NextResponse(audioBuffer, {
            status: 200,
            headers: {
                "Content-Type": "audio/mpeg",
                "Content-Disposition": `attachment; filename="audio.mp3"`,
            }
        })
      
    } catch (error: any) {
        console.log("Err", error);
        return NextResponse.json({error: error.message})
        
    }
}
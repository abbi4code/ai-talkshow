import { NextResponse } from "next/server";
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import { Readable } from "stream";

export const POST = async (req: Request) => {
    try {
        const { voiceId, voicePrompt } = await req.json();
        
        if (!voiceId || !voicePrompt) {
            return NextResponse.json(
                { error: "voiceId and voicePrompt are required" },
                { status: 400 }
            );
        }

        const elevenlabs = new ElevenLabsClient({
            apiKey: process.env.ELEVEN_LABS_API_KEY,
        });
        
        const readableAudio = await elevenlabs.textToSpeech.stream(voiceId, {
            text: voicePrompt,
            modelId: "eleven_flash_v2_5"
        });
        const reader = readableAudio.getReader();
        
        const chunks: Uint8Array[] = []

        while(true){
            const {done, value} = await reader.read();
            if (done) break;
            chunks.push(value)
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
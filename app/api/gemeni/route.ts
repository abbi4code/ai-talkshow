import { NextResponse } from "next/server";
import { GoogleGenAI} from "@google/genai";

export const POST = async (req: Request) => {
  try {
    const { textPrompt } = await req.json();
    const GenAI = new GoogleGenAI({apiKey: process.env.GEMENI_API_KEY || ""});
    const prompt = `
You are an expert podcast script writer.

Write a short podcast script (80–120 words) about the topic below.
Make the tone conversational, friendly, and engaging.

Format:
- Introduction (hook the audience)
- One key idea or insight
- A concise conclusion with a takeaway

Requirements:
- Do NOT include sound cues like (music), (sound effect), etc.
- Do NOT include speaker labels like "Host:" or "Narrator:"
- Write as a flowing speech paragraph, not in bullet points.
- Avoid repetitive filler phrases.
- Return only plain text.

Topic: "${textPrompt}"
`;



    const result = await GenAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 0
        }
      }
    })
    console.log(result.text);
    const textresult = result.text;
    return new NextResponse(JSON.stringify({ content: textresult }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.log("error", error);
    return new NextResponse(
      JSON.stringify({
        error: "Failed to generate Content",
        details: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

import { NextResponse } from "next/server";
import { GoogleGenAI} from "@google/genai";

export const POST = async (req: Request) => {
  try {
    const { textPrompt } = await req.json();
    const GenAI = new GoogleGenAI({apiKey: process.env.GEMENI_API_KEY || ""});
    const prompt = `
Write a short podcast script, not more than 20 words, about the following topic:
"${textPrompt}"

Include an introduction, one key idea, and a conclusion. Keep the tone conversational and engaging and dont include text like these (Short musical interlude) just give the result out as text .
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

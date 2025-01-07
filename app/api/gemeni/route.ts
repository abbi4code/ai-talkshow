import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const POST = async (req: Request) => {
  try {
    const { textPrompt } = await req.json();
    const GenAI = new GoogleGenerativeAI(process.env.GEMENI_API_KEY || "");
    const model = GenAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
Write a short podcast script, not more than 20 words, about the following topic:
"${textPrompt}"

Include an introduction, one key idea, and a conclusion. Keep the tone conversational and engaging and dont include text like these (Short musical interlude) just give the result out as text .
`;

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    const textresult = result.response.text();
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

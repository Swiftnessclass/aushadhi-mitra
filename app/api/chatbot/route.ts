import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    // Try generating the content
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = await response.text();

    return NextResponse.json({ reply: text });
  } catch (error: any) {
    console.error("Gemini API error:", error);

    // Handle rate limit error
    if (error.status === 429) {
      return NextResponse.json(
        {
          reply:
            "⚠️ You’ve reached the daily or per-minute Gemini API usage limit. Please try again after a while or check your billing and quota settings.",
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { reply: "❌ Sorry, something went wrong while processing your request." },
      { status: 500 }
    );
  }
}

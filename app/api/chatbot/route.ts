import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GROQ_API_KEY!);

export async function POST(req: Request) {
  try {
    // Load and log message
    const body = await req.json();
    const message = body.message;
    console.log("Incoming message:", message);

    if (!message) {
      return NextResponse.json({ reply: "No message provided." }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = await response.text();

    return NextResponse.json({ reply: text });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));

    if (error.status === 429) {
      return NextResponse.json(
        { reply: "⚠️ Rate limit reached. Try again later." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { reply: "❌ Internal server error. Check logs for more info." },
      { status: 500 }
    );
  }
}

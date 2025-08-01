import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY || "",
  baseURL: "https://api.groq.com/openai/v1",
});

type ChatRequest = {
  message: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatRequest;

    // Input validation
    if (!body?.message || typeof body.message !== "string" || body.message.trim() === "") {
      return NextResponse.json(
        { reply: "❌ Invalid input. Please provide a message string." },
        { status: 400 }
      );
    }

    const userMessage = body.message.trim();
    console.log("🔹 Incoming message:", userMessage);

    const chatCompletion = await openai.chat.completions.create({
      model: "gemma-7b-it", // Can be changed to "llama3-8b", etc.
      messages: [{ role: "user", content: userMessage }],
      temperature: 0.7,
    });

    const reply = chatCompletion.choices?.[0]?.message?.content;

    if (!reply) {
      console.error("❌ No reply from Groq model.");
      return NextResponse.json(
        { reply: "❌ No response received from the AI model." },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("❌ Groq API error:", error.message || error);

    return NextResponse.json(
      { reply: "❌ Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

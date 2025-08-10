import { NextResponse } from "next/server";
import OpenAI from "openai";

// Make sure you have set GROQ_API_KEY in your .env.local file
const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY || "", // Safe fallback
  baseURL: "https://api.groq.com/openai/v1",
});

type ChatRequest = {
  message: string;
};

export async function POST(req: Request) {
  try {
    const body: ChatRequest = await req.json();

    if (!body || typeof body.message !== "string" || body.message.trim() === "") {
      return NextResponse.json(
        { reply: "Invalid input. Please send a valid message." },
        { status: 400 }
      );
    }

    const userMessage: string = body.message.trim();
    console.log("Incoming message:", userMessage);

    const chatCompletion = await openai.chat.completions.create({
      model: "llama3-70b-8192", // switched to supported model
      messages: [{ role: "user", content: userMessage }],
      temperature: 0.7,
    });
    

    const reply: string | undefined = chatCompletion.choices?.[0]?.message?.content ?? undefined;

    if (!reply) {
      return NextResponse.json(
        { reply: "No response generated from the model." },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Groq API error:", error.message, error.stack);
    } else {
      console.error("Groq API error (unknown):", error);
    }
  
    return NextResponse.json(
      { reply: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
  
}

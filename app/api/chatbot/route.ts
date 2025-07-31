import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body.message;

    console.log("Incoming message:", message);

    if (!message) {
      return NextResponse.json({ reply: "No message provided." }, { status: 400 });
    }

    const chatCompletion = await openai.chat.completions.create({
      model: "gemma-7b-it", // ✅ or use other available Groq models like mixtral-8x7b, llama3-8b
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
    });

    const reply = chatCompletion.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Groq API error:", error);

    return NextResponse.json(
      { reply: "❌ Internal server error. Check logs for more info." },
      { status: 500 }
    );
  }
}

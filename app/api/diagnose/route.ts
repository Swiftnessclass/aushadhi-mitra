import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GROQ_API_KEY!);

export async function POST(req: Request) {
  try {
    const { name, gender, symptoms } = await req.json();

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return NextResponse.json(
        { error: "No symptoms provided." },
        { status: 400 }
      );
    }

    const prompt = `Patient name: ${name || "N/A"}\nGender: ${gender}\nSymptoms: ${symptoms.join(
      ", "
    )}\n\nGive a possible diagnosis.`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return NextResponse.json({ prediction: text });
  } catch (error: any) {
    console.error("Diagnosis error:", error);
    return NextResponse.json(
      { error: "Diagnosis failed. Please check your Gemini API and input." },
      { status: 500 }
    );
  }
}

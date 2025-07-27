import { NextRequest, NextResponse } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function POST(req: NextRequest) {
  try {
    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Server misconfigured: API key missing" },
        { status: 500 }
      );
    }

    const { name, gender, symptoms } = await req.json();

    if (
      typeof name !== "string" || !name.trim() ||
      typeof gender !== "string" || !gender.trim() ||
      !Array.isArray(symptoms) || symptoms.length === 0 ||
      symptoms.some(s => typeof s !== "string" || !s.trim())
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const prompt = `Patient name: ${name}
Gender: ${gender}
Symptoms: ${symptoms.join(", ")}

Based on the symptoms, suggest the most likely diagnosis with a short explanation.`;

    const groqResponse = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3-70b-8192", // or another supported Groq model
        messages: [
          { role: "system", content: "You are a medical assistant." },
          { role: "user", content: prompt }
        ]
      }),
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      throw new Error(`Groq API error: ${groqResponse.status} - ${errorText}`);
    }

    const result = await groqResponse.json();
    const prediction =
      result.choices?.[0]?.message?.content?.trim() ||
      "No diagnosis returned by Groq.";

    const htmlContent = `
      <h1>Diagnosis Report</h1>
      <p><strong>Patient Name:</strong> ${name}</p>
      <p><strong>Gender:</strong> ${gender}</p>
      <p><strong>Symptoms:</strong> ${symptoms.join(", ")}</p>
      <p><strong>Diagnosis:</strong> ${prediction}</p>
    `;

    return NextResponse.json(
      {
        message: "Diagnosis successful",
        name,
        prediction,
        content: htmlContent,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Diagnosis failed:", err);
    return NextResponse.json(
      { error: "Diagnosis failed", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}

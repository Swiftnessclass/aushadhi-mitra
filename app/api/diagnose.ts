import type { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, gender, symptoms } = req.body;

  const cleanSymptoms = symptoms.join(", ");
  const prompt = `
You are a medical assistant diagnosing a patient.

Patient Info:
Name: ${name || "Anonymous"}
Gender: ${gender}
Symptoms: ${cleanSymptoms}

Provide a diagnosis with the following format:
- **Disease Name**
- **Brief History**
- **Causes**
- **Symptoms**
- **Possible Side Effects**
- **Preventive and Curative Measures** (detailed)
- **Medicinal Recommendations**
- **When to Seek Emergency Help**
- **External References**
`;

  try {
    const response = await fetch("https://api.ai71.in/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AI71_API_KEY}`,
      },
      body: JSON.stringify({
        model: "tiiuae/falcon-180b-chat",
        messages: [
          { role: "system", content: "You are a medical assistant." },
          { role: "user", content: prompt },
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI71 API failed with status ${response.status}`);
    }

    const data = await response.json();
    const diagnosis = data.choices?.[0]?.message?.content || "No response from AI71";

    res.status(200).json({ diagnosis });
  } catch (error) {
    console.error("AI71 Diagnosis error:", error);
    res.status(500).json({ error: "Diagnosis failed" });
  }
}

import { NextResponse } from "next/server";
import { connectDB } from "@/Lib/db";
import { Diagnosis } from "@/models/Diagnosis";

export async function POST(req: Request) {
  try {
    const { symptoms } = await req.json();

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return NextResponse.json({ error: "No symptoms provided." }, { status: 400 });
    }

    await connectDB();

    // Normalize input
    const inputSymptoms = symptoms.map((s: string) => s.toLowerCase().trim());

    // Match any diagnosis with at least one matching symptom
    const matches = await Diagnosis.find({
      symptoms: { $in: inputSymptoms },
    });

    if (!matches.length) {
      return NextResponse.json({ prediction: "No matching diagnosis found." });
    }

    // You can return the best match (most common symptom overlap)
    const topMatch = matches[0]; // or write logic to sort by relevance
    return NextResponse.json({ prediction: topMatch.diagnosis });
  } catch (error) {
    console.error("Diagnosis DB error:", error);
    return NextResponse.json(
      { error: "Diagnosis lookup failed. Please try again." },
      { status: 500 }
    );
  }
}

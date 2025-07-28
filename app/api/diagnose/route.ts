import { NextResponse } from "next/server";
import { connectDB } from "@/Lib/db";
import { Diagnosis } from "@/models/Diagnosis";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, gender, symptoms } = body;

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return NextResponse.json({ error: "No symptoms provided." }, { status: 400 });
    }

    await connectDB();

    // Normalize symptoms input
    const inputSymptoms = symptoms.map((s: string) => s.toLowerCase().trim());

    // Find diagnoses that contain any of the input symptoms
    const matches = await Diagnosis.find({
      symptoms: { $in: inputSymptoms },
    });

    if (!matches.length) {
      return NextResponse.json({ prediction: "No matching diagnosis found." });
    }

    // Optional: sort by most overlapping symptoms
    const topMatch = matches
      .map((entry) => {
        const overlap = entry.symptoms.filter((sym: string) =>
          inputSymptoms.includes(sym.toLowerCase().trim())
        ).length;
        return { entry, overlap };
      })
      .sort((a, b) => b.overlap - a.overlap)[0].entry;

    return NextResponse.json({ prediction: topMatch.diagnosis });
  } catch (error) {
    console.error("Diagnosis DB error:", error);
    return NextResponse.json(
      { error: "Diagnosis lookup failed. Please try again." },
      { status: 500 }
    );
  }
}

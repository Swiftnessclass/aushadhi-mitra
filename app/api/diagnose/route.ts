import { NextResponse } from "next/server";
import { connectDB } from "@/Lib/db";
import { Diagnosis } from "@/models/Diagnosis";

// Define the expected shape of the incoming request
type DiagnosisRequest = {
  name: string;
  gender: string;
  symptoms: string[];
};

export async function POST(req: Request) {
  try {
    const body: DiagnosisRequest = await req.json();
    const { name, gender, symptoms } = body;

    // Basic input validation
    if (
      !name || typeof name !== "string" ||
      !gender || typeof gender !== "string" ||
      !Array.isArray(symptoms) || symptoms.length === 0
    ) {
      return NextResponse.json(
        { error: "Invalid input. Name, gender, and symptoms are required." },
        { status: 400 }
      );
    }

    await connectDB();

    // Normalize input symptoms
    const inputSymptoms = symptoms.map((s: string) => s.toLowerCase().trim());

    // Find all potential matches
    const matches = await Diagnosis.find({
      symptoms: { $in: inputSymptoms },
    });

    if (matches.length === 0) {
      return NextResponse.json({ prediction: "No matching diagnosis found." });
    }

    // Rank results by overlapping symptoms
    const rankedMatches = matches
      .map((entry) => {
        const overlap = entry.symptoms.filter((sym: string) =>
          inputSymptoms.includes(sym.toLowerCase().trim())
        ).length;

        return { entry, overlap };
      })
      .sort((a, b) => b.overlap - a.overlap);

    const topMatch = rankedMatches[0].entry;

    const top3 = rankedMatches.slice(0, 3).map((match) => ({
      diagnosis: match.entry.diagnosis,
      overlap: match.overlap,
    }));

    return NextResponse.json({
      prediction: topMatch.diagnosis,
      suggestions: top3,
    });

  } catch (error) {
    if (error instanceof Error) {
      console.error("Diagnosis API Error:", error.message);
    } else {
      console.error("Diagnosis API Unknown Error:", error);
    }

    return NextResponse.json(
      { error: "Diagnosis lookup failed. Please try again later." },
      { status: 500 }
    );
  }
}

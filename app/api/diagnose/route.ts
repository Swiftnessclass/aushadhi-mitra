import { NextResponse } from "next/server";
import { connectDB } from "@/Lib/db";
import { Diagnosis } from "@/models/Diagnosis";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, gender, symptoms } = body;

    // Basic input validation
    if (!name || !gender || !Array.isArray(symptoms) || symptoms.length === 0) {
      return NextResponse.json(
        { error: "Invalid input. Name, gender, and symptoms are required." },
        { status: 400 }
      );
    }

    await connectDB();

    // Normalize symptoms
    const inputSymptoms = symptoms.map((s: string) => s.toLowerCase().trim());

    // Find all possible matches from DB
    const matches = await Diagnosis.find({
      symptoms: { $in: inputSymptoms },
    });

    if (matches.length === 0) {
      return NextResponse.json({ prediction: "No matching diagnosis found." });
    }

    // Rank matches by overlap count
    const rankedMatches = matches
      .map((entry) => {
        const overlap = entry.symptoms.filter((sym: string) =>
          inputSymptoms.includes(sym.toLowerCase().trim())
        ).length;
        return { entry, overlap };
      })
      .sort((a, b) => b.overlap - a.overlap);

    const topMatch = rankedMatches[0].entry;

    // Optional: return top 3 predictions
    const top3 = rankedMatches.slice(0, 3).map((match) => ({
      diagnosis: match.entry.diagnosis,
      overlap: match.overlap,
    }));

    return NextResponse.json({
      prediction: topMatch.diagnosis,
      suggestions: top3,
    });

  } catch (error: any) {
    console.error("Diagnosis API Error:", error.message || error);
    return NextResponse.json(
      { error: "Diagnosis lookup failed. Please try again later." },
      { status: 500 }
    );
  }
}

// app/api/schemes/feedback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/Lib/db";
import Feedback from "@/models/feedback"; 
export async function POST(req: NextRequest) {
  try {
    const { schemeId, feedback } = await req.json();

    if (!schemeId || !feedback) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    await connectDB(); // Connect to MongoDB

    const newFeedback = new Feedback({ schemeId, feedback });
    await newFeedback.save();

    return NextResponse.json({ message: "Feedback submitted successfully" }, { status: 201 });
  } catch (error) {
    console.error("Feedback Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

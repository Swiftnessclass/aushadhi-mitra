import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/Lib/db";
import { Medicine } from "@/models/medicine";

// ✅ Correct usage with async params
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = context.params; // Destructure safely
    const medicine = await Medicine.findById(id);

    if (!medicine) {
      return NextResponse.json({ error: "Medicine not found" }, { status: 404 });
    }

    return NextResponse.json(medicine);
  } catch (error) {
    console.error("Error fetching medicine:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// app/api/medicines/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/Lib/db";
import { Medicine } from "@/models/medicine";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const medicine = await Medicine.findById(params.id);

    if (!medicine) {
      return NextResponse.json({ error: "Medicine not found" }, { status: 404 });
    }

    return NextResponse.json(medicine);
  } catch (error) {
    console.error("Error fetching medicine:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

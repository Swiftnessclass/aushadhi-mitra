import { NextRequest, NextResponse } from "next/server";
import medicines from "@/app/data/medicine.json";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const medicine = medicines.find((med) => med._id === params.id); // or med.id

  if (!medicine) {
    return NextResponse.json({ error: "Medicine not found" }, { status: 404 });
  }

  return NextResponse.json(medicine);
}

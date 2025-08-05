import { NextResponse } from "next/server";
import medicines from "@/app/data/medicine.json" assert { type: "json" };

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const medicine = medicines.find((med) => med._id === id);

  if (!medicine) {
    return NextResponse.json({ error: "Medicine not found" }, { status: 404 });
  }

  return NextResponse.json(medicine);
}

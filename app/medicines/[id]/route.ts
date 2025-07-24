// app/api/medicines/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

// Dummy medicine data (or fetch from DB)
const medicines = [
  { _id: "1", name: "Paracetamol", price: 10 },
  { _id: "2", name: "Amoxicillin", price: 20 },
];

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params; // ✅ Correct way to access param

  const medicine = medicines.find((med) => med._id === id);

  if (!medicine) {
    return NextResponse.json({ error: "Medicine not found" }, { status: 404 });
  }

  return NextResponse.json(medicine);
}

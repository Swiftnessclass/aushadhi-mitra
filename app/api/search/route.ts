import { connectDB } from "@/Lib/db";
import searchMedicine from "@/models/searchMedicine";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const disease = searchParams.get("disease");

  if (!disease) return NextResponse.json({ error: "Missing disease" }, { status: 400 });

  await connectDB();

  const medicines = await searchMedicine.find({ disease: { $regex: disease, $options: "i" } });

  return NextResponse.json(medicines);
}

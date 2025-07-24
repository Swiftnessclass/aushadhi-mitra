import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/Lib/db";
import Scheme from "@/models/Scheme";

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const age = searchParams.get("age");
  const income = searchParams.get("income");
  const category = searchParams.get("category");

  const query: any = {};

  if (age) query.minAge = { $lte: parseInt(age) };
  if (income) query.maxIncome = { $gte: parseInt(income) };
  if (category) query.category = category;

  const schemes = await Scheme.find(query);
  return NextResponse.json(schemes);
}

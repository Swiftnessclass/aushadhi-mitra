import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/Lib/db";
import Scheme from "@/models/Scheme";

type SchemeData = {
  _id: string;
  title: string;
  description: string;
  category: string;
  minAge: number;
  maxIncome: number;
};

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const age = searchParams.get("age");
  const income = searchParams.get("income");
  const category = searchParams.get("category");

  const query: {
    minAge?: { $lte: number };
    maxIncome?: { $gte: number };
    category?: string;
  } = {};

  if (age) query.minAge = { $lte: parseInt(age) };
  if (income) query.maxIncome = { $gte: parseInt(income) };
  if (category) query.category = category;

  const schemes = await Scheme.find(query).lean<SchemeData[]>();
  return NextResponse.json(schemes);
}

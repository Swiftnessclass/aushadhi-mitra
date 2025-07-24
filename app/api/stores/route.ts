import { NextResponse } from "next/server";
import { connectDB } from "@/Lib/db";
import { Store } from "@/models/store";

export async function GET(){
  await connectDB();
  const stores = await Store.find();
  return NextResponse.json(stores);
}
// app/api/contact/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Optionally send email or save to DB
  console.log("Contact Message:", { name, email, message });

  return NextResponse.json({ success: true }, { status: 200 });
}

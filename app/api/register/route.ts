import { NextResponse } from "next/server";
import { connectDB } from "@/Lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password, age, gender, location, language } = await req.json();

    const userExists = await User.findOne({ email });
    if (userExists) return NextResponse.json({ error: "User already exists" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      age: Number(age),
      gender,
      location,
      language,
    });

    return NextResponse.json({ message: "User created", user });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

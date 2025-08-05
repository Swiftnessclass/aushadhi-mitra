import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Ensure this route only works on POST requests
export async function POST(req: Request) {
  try {
    const { name, address, email, medicine } = await req.json();

    // Basic validation
    if (!name || !email || !address || !medicine?.name) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create reusable transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Aushadhi Mitra" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Medicine Purchase Confirmation",
      text: `Hi ${name},\n\nThank you for your purchase!\n\nMedicine: ${medicine.name}\nDelivery Address: ${address}\n\nWe appreciate your trust in Aushadhi Mitra.`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send confirmation email" },
      { status: 500 }
    );
  }
}

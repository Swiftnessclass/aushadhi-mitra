import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, phone, address } = await req.json();

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // your App Password
      },
    });

    // Email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL, // admin email
      subject: `New Scheme Application - ${name}`,
      text: `
        A new application has been submitted:
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Address: ${address}
      `,
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Application Received",
      text: `Hello ${name},\n\nWe have received your application. Our team will review it and get back to you soon.\n\nThank you!`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}

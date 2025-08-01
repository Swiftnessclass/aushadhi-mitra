"use client";

import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(
        "service_ricjpiu",        // ✅ Your EmailJS service ID
        "template_g7pd41o",       // ✅ Your EmailJS template ID
        form.current,
        "epCteR0Y65mz0tyKn"       // ✅ Your EmailJS public key
      )
      .then(
        () => {
          console.log("SUCCESS!");
          alert("Message sent successfully!");
          form.current?.reset();
        },
        (error) => {
          console.error("FAILED...", error.text);
          alert("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient- px-4">
     <form
  ref={form}
  onSubmit={sendEmail}
  className="w-full max-w-md p-6 space-y-4 bg-white shadow-lg rounded-lg text-gray-800"
>
  <input type="hidden" name="company_name" value="Aushadhi Mitra" />

  <div>
    <label className="block mb-1 font-medium text-gray-800">Name</label>
    <input
      type="text"
      name="user_name"
      required
      className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
    />
  </div>

  <div>
    <label className="block mb-1 font-medium text-gray-800">Email</label>
    <input
      type="email"
      name="user_email"
      required
      className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
    />
  </div>

  <div>
    <label className="block mb-1 font-medium text-gray-800">Message</label>
    <textarea
      name="message"
      required
      className="w-full border border-gray-300 p-2 rounded h-28 resize-none focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
    />
  </div>

  <input
    type="submit"
    value="Send"
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer transition"
  />
</form>

    </div>
  );
}

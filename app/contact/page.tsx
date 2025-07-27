// app/contact/page.tsx
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
        "service_ricjpiu", // Replace with your EmailJS service ID
        "template_g7pd41o", // Replace with your EmailJS template ID
        form.current,
        "epCteR0Y65mz0tyKn" // Replace with your EmailJS public key
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
    <form ref={form} onSubmit={sendEmail} className="max-w-md mx-auto p-4 space-y-4 bg-white shadow-md rounded">
     <input type="hidden" name="company_name" value="Aushadhi Mitra" />
  
    <div>
      <label className="block mb-1 font-medium">Name</label>
      <input
        type="text"
        name="user_name"
        required
        className="w-full border border-gray-300 p-2 rounded"
      />
    </div>
  
    <div>
      <label className="block mb-1 font-medium">Email</label>
      <input
        type="email"
        name="user_email"
        required
        className="w-full border border-gray-300 p-2 rounded"
      />
    </div>
  
    <div>
      <label className="block mb-1 font-medium">Message</label>
      <textarea
        name="message"
        required
        className="w-full border border-gray-300 p-2 rounded"
      />
    </div>
  
    <input
      type="submit"
      value="Send"
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer"
    />
  </form>
  
  );
}

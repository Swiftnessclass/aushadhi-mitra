"use client";

import { useEffect, useState } from "react";

// Type definition
type Medicine = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", address: "", location: "" });
  const [submitted, setSubmitted] = useState(false);

  // Fetch all medicines
  useEffect(() => {
    fetch("/api/medicines")
      .then((res) => res.json())
      .then((data) => setMedicines(data))
      .catch(() => console.log("Error fetching medicines"));
  }, []);

  // Fetch single medicine
  const handleSelectMedicine = async (id: string) => {
    try {
      const res = await fetch(`/api/medicines/${id}`);
      if (!res.ok) throw new Error("Medicine not found");
      const data = await res.json();
      setSelectedMedicine(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle purchase form submission
  const handlePurchaseSubmit = async () => {
    try {
      // Simulate sending email (POST to your email service API here)
      await fetch("/api/send-email", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          medicine: selectedMedicine?.name,
          price: selectedMedicine?.price,
        }),
        headers: { "Content-Type": "application/json" },
      });

      setSubmitted(true);
      setFormData({ name: "", address: "", location: "" });
      setSelectedMedicine(null);
      setShowPurchaseForm(false);
    } catch (err) {
      console.error("Error sending email:", err);
    }
  };

  // ✅ Confirmation popup
  if (submitted) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">✅ Order Submitted!</h1>
        <p className="text-gray-700">A confirmation email has been sent to your inbox.</p>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setSubmitted(false)}
        >
          Back to Medicines
        </button>
      </div>
    );
  }

  // ✅ Purchase form UI
  if (showPurchaseForm && selectedMedicine) {
    return (
      <div className="p-8 max-w-md mx-auto">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Delivery Information</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="location"
            placeholder="City / Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
            onClick={handlePurchaseSubmit}
          >
            Submit Purchase
          </button>
        </div>
      </div>
    );
  }

  // ✅ Show selected medicine with purchase option
  if (selectedMedicine) {
    return (
      <div className="p-8 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Purchase Medicine</h1>
        <div className="border p-4 rounded shadow-md bg-white">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">{selectedMedicine.name}</h2>
          <p className="text-gray-600 mb-2">{selectedMedicine.description}</p>
          <p className="text-green-700 font-bold text-lg mb-4">₹{selectedMedicine.price}</p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
            onClick={() => setShowPurchaseForm(true)}
          >
            Confirm Purchase
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            onClick={() => setSelectedMedicine(null)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // ✅ List of all medicines
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">Available Medicines</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {medicines.map((med) => (
          <div
            key={med._id}
            onClick={() => handleSelectMedicine(med._id)}
            className="border p-4 rounded-lg shadow hover:scale-105 transition-transform bg-white cursor-pointer"
          >
            <h2 className="text-lg font-semibold text-gray-800">{med.name}</h2>
            <p className="text-gray-600">{med.description}</p>
            <p className="text-green-700 font-bold mt-2">₹{med.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

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
  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false);
 

  // Fetch all medicines
  useEffect(() => {
    fetch("/api/medicines")
      .then((res) => res.json())
      .then((data) => setMedicines(data))
      .catch(() => console.log("Error fetching medicines:"));

  }, []);

  // Fetch single medicine on selection
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

  // Handle purchase confirmation
  const handleConfirmPurchase = async () => {
    // Simulate order placement or add POST request here
    setPurchaseConfirmed(true);
    setSelectedMedicine(null);
  };

  // Show purchase confirmation page
  if (purchaseConfirmed) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">🎉 Purchase Confirmed!</h1>
        <p className="mb-4">Thank you for your purchase.</p>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setPurchaseConfirmed(false)}
        >
          Back to Medicines
        </button>
      </div>
    );
  }

  // Show single medicine purchase view
  if (selectedMedicine) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Purchase Medicine</h1>
        <div className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">{selectedMedicine.name}</h2>
          <p className="text-gray-700 mb-2">{selectedMedicine.description}</p>
          <p className="text-green-700 font-bold text-lg mb-4">
            Price: ₹{selectedMedicine.price}
          </p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
            onClick={handleConfirmPurchase}
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

  // Show list of medicines
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Available Medicines</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {medicines.map((med) => (
          <div
            key={med._id}
            onClick={() => handleSelectMedicine(med._id)}
            className="border p-4 rounded shadow cursor-pointer hover:scale-105 transition-transform"
          >
            <h2 className="text-lg font-semibold">{med.name}</h2>
            <p className="text-gray-700">{med.description}</p>
            <p className="text-green-700 font-bold mt-2">₹{med.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

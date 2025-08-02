"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Medicine = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

export default function PurchasePage() {
  const { id } = useParams();
  const router = useRouter();
  const [medicine, setMedicine] = useState<Medicine | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/medicines/${id}`)
        .then(async (res) => {
          if (!res.ok) {
            throw new Error("Medicine not found");
          }
          return res.json();
        })
        .then((data) => setMedicine(data))
        .catch((err) => {
          console.error("Failed to fetch medicine:", err);
          setMedicine(null);
        });
    }
  }, [id]);

  if (!medicine) {
    return <p className="p-8">Loading medicine details...</p>;
  }

  return (
    <div className="p-8">
     

      <h1 className="text-2xl font-bold mb-4">Purchase Medicine</h1>
      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">{medicine.name}</h2>
        <p className="text-gray-700 mb-2">{medicine.description}</p>
        <p className="text-green-700 font-bold text-lg mb-4">
          Price: ₹{medicine.price}
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Confirm Purchase
        </button>
      </div>
    
    </div>
  );
}

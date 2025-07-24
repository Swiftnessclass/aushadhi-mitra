"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Medicine = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

export default function MedicineList() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      const res = await fetch("/api/medicines");
      const data = await res.json();
      console.log("Fetched medicines:", data); 
      setMedicines(data);
    };

    fetchMedicines();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{medicines.map((medicine) => (
  medicine._id ? (
    <Link key={medicine._id} href={`/purchase/${medicine._id}`}>
      <div className="cursor-pointer border p-4 rounded shadow hover:bg-gray-100">
        <h2 className="text-xl font-semibold">{medicine.name}</h2>
        <p className="text-gray-700">{medicine.description}</p>
        <p className="text-green-700 font-bold text-lg">Price: ₹{medicine.price}</p>
      </div>
    </Link>
  ) : null
      ))}
    </div>
  );
}

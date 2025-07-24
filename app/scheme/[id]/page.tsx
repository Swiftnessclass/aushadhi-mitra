import { notFound } from "next/navigation";

type Medicine = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

async function getMedicine(id: string): Promise<Medicine | null> {
  const res = await fetch(`http://localhost:3000/api/medicines/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  if (data?.error) return null;

  return data;
}

export default async function PurchasePage({ params }: { params: { id: string } }) {
  const medicine = await getMedicine(params.id);

  if (!medicine) return notFound(); // or show fallback

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Purchase Medicine</h1>
      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">{medicine.name}</h2>
        <p className="text-gray-700 mb-2">{medicine.description}</p>
        <p className="text-green-700 font-bold text-lg mb-4">Price: ₹{medicine.price}</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Confirm Purchase
        </button>
      </div>
    </div>
  );
}

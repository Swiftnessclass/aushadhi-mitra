"use client";
import { useRouter } from "next/navigation";

type Props = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

export default function MedicineCard({ _id, name, description, price }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/purchase/${_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer p-4 border rounded-lg hover:shadow-lg transition duration-200"
    >
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-green-700 font-bold mt-2">₹{price}</p>
    </div>
  );
}

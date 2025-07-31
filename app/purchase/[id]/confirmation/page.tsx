import Link from "next/link";




export default function PurchaseConfirmation() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-green-700 mb-4">Purchase Successful 🎉</h1>
      <p className="text-lg text-gray-800 mb-4">Thank you for your purchase. Your order has been placed successfully.</p>
      <Link href="/" className="text-blue-600 hover:underline">Go back to homepage</Link>
    </div>
  );
}

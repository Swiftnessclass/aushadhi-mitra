type SchemeProps = {
  scheme: {
    title: string;
    description: string;
    category: string;
    minAge: number;
    maxIncome: number;
  };
};

export default function SchemeCard({ scheme }: SchemeProps) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-2">{scheme.title}</h2>
      <p className="mb-2">{scheme.description}</p>
      <p className="text-sm text-gray-600">Category: {scheme.category}</p>
      <p className="text-sm text-gray-600">Min Age: {scheme.minAge}</p>
      <p className="text-sm text-gray-600">Max Income: ₹{scheme.maxIncome}</p>
    </div>
  );
}

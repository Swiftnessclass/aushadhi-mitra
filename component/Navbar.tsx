import Link from "next/link";

export const Navbar = () => {
  return(
    <nav className="bg-blue-800 text-white p-4 flex justify-between">
    <Link href="/" className="font-bold text-xl">Aushadhi Mitra</Link>
    <div className="space-x-4">
      <Link href="/medicines">Medicines</Link>
      <Link href="/stores">Stores</Link>
      <Link href="/hospitals">Hospitals</Link>
      <Link href="/schemes">Schemes</Link>
    </div>
  </nav>
  );
}
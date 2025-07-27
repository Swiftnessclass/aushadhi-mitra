import Link from "next/link";

export const Navbar = () => {
  return(
    <nav className="bg-blue-800 text-white p-4 flex justify-between">
    <Link href="/" className="font-bold text-xl">Aushadhi Mitra</Link>
    <div className="space-x-4">
      <Link href="/medicines">Medicines</Link>
      <Link href="/pharmacy">pharmacy</Link>
      <Link href="/diagnosis" >AI Symptom Checker</Link>
      <Link href="/Schemes">Schemes</Link>
      <Link href="/contact" className="hover:underline">
  Contact
</Link>

    </div>
  </nav>
  );
}
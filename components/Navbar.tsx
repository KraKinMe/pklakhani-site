import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 border-b">
      <h1 className="font-semibold text-lg">
        P.K. Lakhani & Co.
      </h1>

      <div className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/services">Services</Link>
        <Link href="/careers">Careers</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
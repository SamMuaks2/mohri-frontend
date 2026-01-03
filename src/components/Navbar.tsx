import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/articles", label: "Articles" },
  { href: "/certifications", label: "Certifications" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav className="border-b border-yellow-600/50 bg-black">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-white">
          Mohri<span className="text-yellow-500">.</span>
        </Link>
        <div className="space-x-6 hidden md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-yellow-500 transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
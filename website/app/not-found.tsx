import Link from "next/link";
import { Home, Info, GraduationCap, Mail, Film, Image, Music, Drama } from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About Us", icon: Info },
  { href: "/academy", label: "Academy", icon: GraduationCap },
  { href: "/contact", label: "Contact", icon: Mail },
  { href: "/productions", label: "Productions", icon: Film },
  { href: "/gallery", label: "Gallery", icon: Image },
  { href: "/dance-academy-kanpur", label: "Dance Academy Kanpur", icon: Music },
  { href: "/acting-school-kanpur", label: "Acting School Kanpur", icon: Drama },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-black text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-8xl md:text-9xl font-black text-amber-500/20 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Page not found
        </h2>
        <p className="text-zinc-400 mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 mb-12"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="text-left">
          <h3 className="text-lg font-semibold text-amber-400 mb-4">Quick links</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {links.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-2 text-zinc-300 hover:text-amber-400 transition-colors py-2"
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

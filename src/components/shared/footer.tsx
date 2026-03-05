import Link from "next/link";

const legalLinks = [
  { href: "/legal/privacidad", label: "Privacidad" },
  { href: "/legal/terminos", label: "Terminos" },
  { href: "/legal/cookies", label: "Cookies" },
  { href: "/legal/desistimiento", label: "Desistimiento" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Legal links */}
        <nav className="flex flex-wrap items-center gap-4">
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-[var(--color-white-40)] hover:text-[var(--color-white-75)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Contact & copyright */}
        <div className="flex flex-col md:flex-row items-center gap-2 text-xs text-[var(--color-white-40)]">
          <a
            href="mailto:hola@loamclub.com"
            className="hover:text-[var(--color-white-75)] transition-colors"
          >
            hola@loamclub.com
          </a>
          <span className="hidden md:inline">·</span>
          <span>&copy; {new Date().getFullYear()} LOAM CLUB. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
}

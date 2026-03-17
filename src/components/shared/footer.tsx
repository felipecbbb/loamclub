import Link from "next/link";

const legalLinks = [
  { href: "/legal/privacidad", label: "Privacidad" },
  { href: "/legal/terminos", label: "Términos" },
  { href: "/legal/cookies", label: "Cookies" },
  { href: "/legal/desistimiento", label: "Desistimiento" },
];

export function Footer() {
  return (
    <footer className="w-full bg-[#5B6644] bg-roots mt-auto relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Top row: logo + tagline */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-10">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link
              href="/"
              className="font-display text-2xl font-bold text-[var(--color-gold)]"
            >
              LOAM CL<span className="italic">U</span>B
            </Link>
            <span className="text-sm text-[#F7F5F0]/70 italic">
              Cuida tus raíces
            </span>
          </div>

          {/* Legal links */}
          <nav className="flex flex-wrap items-center justify-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-[#F7F5F0]/70 hover:text-[#F7F5F0] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-[#F7F5F0]/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <a
            href="mailto:hola@loamclub.com"
            className="text-xs text-[#F7F5F0]/70 hover:text-[#F7F5F0] transition-colors"
          >
            hola@loamclub.com
          </a>
          <span className="text-xs text-[#F7F5F0]/70">
            &copy; {new Date().getFullYear()} LOAM CLUB. Todos los derechos
            reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}

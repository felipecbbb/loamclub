export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-[var(--color-green-dark)] p-6 hidden md:block">
        <div className="font-display text-2xl font-bold text-[var(--color-gold)] mb-8">
          LOAM <span className="italic">CLUB</span>
        </div>
        <nav className="flex flex-col gap-2">
          <a href="/app/dashboard" className="text-sm text-[var(--color-white-75)] hover:text-white py-2">
            Dashboard
          </a>
          <a href="/app/biblioteca" className="text-sm text-[var(--color-white-75)] hover:text-white py-2">
            Biblioteca
          </a>
          <a href="/app/perfil" className="text-sm text-[var(--color-white-75)] hover:text-white py-2">
            Perfil
          </a>
          <a href="/app/ayuda" className="text-sm text-[var(--color-white-75)] hover:text-white py-2">
            Ayuda
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

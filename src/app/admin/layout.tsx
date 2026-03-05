export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-[var(--color-green-dark)] p-6 hidden md:block">
        <div className="font-display text-2xl font-bold text-[var(--color-gold)] mb-2">
          LOAM <span className="italic">CLUB</span>
        </div>
        <div className="text-xs text-[var(--color-white-40)] mb-8 uppercase tracking-widest">
          Admin
        </div>
        <nav className="flex flex-col gap-2">
          <a href="/admin/dashboard" className="text-sm text-[var(--color-white-75)] hover:text-white py-2">
            Dashboard
          </a>
          <a href="/admin/cursos" className="text-sm text-[var(--color-white-75)] hover:text-white py-2">
            Cursos
          </a>
          <a href="/admin/alumnas" className="text-sm text-[var(--color-white-75)] hover:text-white py-2">
            Alumnas
          </a>
          <a href="/admin/facturacion" className="text-sm text-[var(--color-white-75)] hover:text-white py-2">
            Facturacion
          </a>
          <a href="/admin/config" className="text-sm text-[var(--color-white-75)] hover:text-white py-2">
            Configuracion
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

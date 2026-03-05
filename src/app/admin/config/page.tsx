export const metadata = { title: "Configuracion" };

export default function ConfigPage() {
  const links = [
    {
      title: "Stripe Dashboard",
      description: "Gestiona pagos, suscripciones y facturas.",
      href: "https://dashboard.stripe.com",
      color: "bg-purple-500/20 text-purple-400",
    },
    {
      title: "Supabase Dashboard",
      description: "Base de datos, autenticacion y almacenamiento.",
      href: "https://supabase.com/dashboard",
      color: "bg-green-500/20 text-green-400",
    },
    {
      title: "Vercel Dashboard",
      description: "Despliegues, dominios y logs.",
      href: "https://vercel.com/dashboard",
      color: "bg-white/10 text-white/70",
    },
  ];

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold text-white">Configuracion</h1>

      {/* Site info */}
      <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Informacion del sitio</h2>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-white/50">Nombre</dt>
            <dd className="text-white">LOAM CLUB</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-white/50">URL</dt>
            <dd className="font-mono text-xs text-white/70">
              {process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-white/50">Supabase URL</dt>
            <dd className="font-mono text-xs text-white/70">
              {process.env.NEXT_PUBLIC_SUPABASE_URL ?? "No configurada"}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-white/50">Entorno</dt>
            <dd className="text-white">
              <span className="rounded bg-white/10 px-2 py-0.5 text-xs">
                {process.env.NODE_ENV ?? "development"}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      {/* External links */}
      <h2 className="mb-4 text-lg font-semibold text-white">Servicios externos</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {links.map((link) => (
          <a
            key={link.title}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/20 hover:bg-white/[0.07]"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className={`rounded px-2 py-0.5 text-xs font-medium ${link.color}`}>
                {link.title}
              </span>
              <svg
                className="h-4 w-4 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:text-white/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </div>
            <p className="text-sm text-white/50">{link.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Dashboard" };

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [profilesRes, activeSubsRes, recentSignupsRes, canceledSubsRes] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("subscriptions").select("id, plan", { count: "exact" }).eq("status", "active"),
    supabase.from("profiles").select("*").order("created_at", { ascending: false }).limit(10),
    supabase.from("subscriptions").select("id", { count: "exact", head: true }).eq("status", "canceled"),
  ]);

  const totalAlumnas = profilesRes.count ?? 0;
  const activeCount = activeSubsRes.count ?? 0;
  const activeSubs = activeSubsRes.data ?? [];
  const recentSignups = recentSignupsRes.data ?? [];
  const canceledCount = canceledSubsRes.count ?? 0;

  const priceMap: Record<string, number> = { base: 90, plus: 180 };
  const mrr = activeSubs.reduce((sum, sub) => sum + (priceMap[sub.plan] ?? 29), 0);
  const churnRate = totalAlumnas > 0 ? ((canceledCount / totalAlumnas) * 100).toFixed(1) : "0.0";

  const metrics = [
    { label: "Total alumnas", value: totalAlumnas.toString() },
    { label: "Alumnas activas", value: activeCount.toString() },
    { label: "MRR estimado", value: `${mrr.toLocaleString("es-ES")} EUR` },
    { label: "Churn rate", value: `${churnRate}%` },
  ];

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold text-white">Dashboard</h1>

      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-white/50">{m.label}</p>
            <p className="mt-1 text-3xl font-bold text-[#fddf59]">{m.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Registros recientes</h2>
        {recentSignups.length === 0 ? (
          <p className="text-sm text-white/50">Sin registros recientes.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/50">
                  <th className="pb-3 pr-4 font-medium">Nombre</th>
                  <th className="pb-3 pr-4 font-medium">Email</th>
                  <th className="pb-3 pr-4 font-medium">Rol</th>
                  <th className="pb-3 font-medium">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {recentSignups.map((p) => (
                  <tr key={p.id} className="border-b border-white/5 text-white/80">
                    <td className="py-3 pr-4">{p.full_name ?? "Sin nombre"}</td>
                    <td className="py-3 pr-4">{p.email}</td>
                    <td className="py-3 pr-4">
                      <span
                        className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
                          p.role === "admin"
                            ? "bg-[#fddf59]/20 text-[#fddf59]"
                            : "bg-white/10 text-white/60"
                        }`}
                      >
                        {p.role}
                      </span>
                    </td>
                    <td className="py-3">
                      {new Date(p.created_at).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

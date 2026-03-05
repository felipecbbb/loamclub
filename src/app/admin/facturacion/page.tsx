"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { SubscriptionPlan, SubscriptionStatus } from "@/types/database";

interface SubscriptionRow {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  user_email?: string;
  user_name?: string;
}

const statusColors: Record<string, string> = {
  active: "bg-green-500/20 text-green-400",
  past_due: "bg-yellow-500/20 text-yellow-400",
  canceled: "bg-red-500/20 text-red-400",
  incomplete: "bg-white/10 text-white/40",
  trialing: "bg-blue-500/20 text-blue-400",
};

const statusLabels: Record<string, string> = {
  active: "Activa",
  past_due: "Pago pendiente",
  canceled: "Cancelada",
  incomplete: "Incompleta",
  trialing: "Prueba",
};

const priceMap: Record<string, number> = { base: 90, plus: 180 };

export default function FacturacionPage() {
  const supabase = createClient();
  const [subscriptions, setSubscriptions] = useState<SubscriptionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [planFilter, setPlanFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: subs } = await supabase
      .from("subscriptions")
      .select("*")
      .order("created_at", { ascending: false });

    if (!subs || subs.length === 0) {
      setSubscriptions([]);
      setLoading(false);
      return;
    }

    const userIds = [...new Set(subs.map((s) => s.user_id))];
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, email, full_name")
      .in("id", userIds);

    const profileMap = new Map((profiles ?? []).map((p) => [p.id, p]));

    const rows: SubscriptionRow[] = subs.map((s) => {
      const profile = profileMap.get(s.user_id);
      return {
        ...s,
        user_email: profile?.email ?? "Desconocido",
        user_name: profile?.full_name ?? undefined,
      };
    });

    setSubscriptions(rows);
    setLoading(false);
  };

  const filtered = subscriptions.filter((s) => {
    const matchesPlan = planFilter === "all" || s.plan === planFilter;
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    return matchesPlan && matchesStatus;
  });

  const activeSubs = subscriptions.filter((s) => s.status === "active");
  const mrr = activeSubs.reduce((sum, s) => sum + (priceMap[s.plan] ?? 29), 0);
  const mrrBase = activeSubs.filter((s) => s.plan === "base").length * (priceMap.base ?? 29);
  const mrrPlus = activeSubs.filter((s) => s.plan === "plus").length * (priceMap.plus ?? 49);

  const selectClass =
    "rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#fddf59]/50 [&>option]:bg-[#2e3520] [&>option]:text-white";

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold text-white">Facturacion</h1>

      {/* MRR cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">MRR total</p>
          <p className="mt-1 text-3xl font-bold text-[#fddf59]">{mrr.toLocaleString("es-ES")} EUR</p>
          <p className="mt-1 text-xs text-white/30">{activeSubs.length} suscripciones activas</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">MRR Base</p>
          <p className="mt-1 text-2xl font-bold text-white">{mrrBase.toLocaleString("es-ES")} EUR</p>
          <p className="mt-1 text-xs text-white/30">
            {activeSubs.filter((s) => s.plan === "base").length} suscripciones
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">MRR Plus</p>
          <p className="mt-1 text-2xl font-bold text-white">{mrrPlus.toLocaleString("es-ES")} EUR</p>
          <p className="mt-1 text-xs text-white/30">
            {activeSubs.filter((s) => s.plan === "plus").length} suscripciones
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <select className={selectClass} value={planFilter} onChange={(e) => setPlanFilter(e.target.value)}>
          <option value="all">Todos los planes</option>
          <option value="base">Base</option>
          <option value="plus">Plus</option>
        </select>
        <select className={selectClass} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">Todos los estados</option>
          <option value="active">Activa</option>
          <option value="past_due">Pago pendiente</option>
          <option value="canceled">Cancelada</option>
          <option value="trialing">Prueba</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-white/50">Cargando...</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-white/50">No se encontraron suscripciones.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/50">
                <th className="px-4 py-3 font-medium">Alumna</th>
                <th className="px-4 py-3 font-medium">Plan</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Periodo</th>
                <th className="px-4 py-3 font-medium">Stripe</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-white/5 text-white/80">
                  <td className="px-4 py-3">
                    <div>{s.user_name ?? "Sin nombre"}</div>
                    <div className="text-xs text-white/40">{s.user_email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-[#fddf59]/15 px-2 py-0.5 text-xs font-semibold uppercase text-[#fddf59]">
                      {s.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded px-2 py-0.5 text-xs font-medium ${statusColors[s.status] ?? ""}`}>
                      {statusLabels[s.status] ?? s.status}
                    </span>
                    {s.cancel_at_period_end && (
                      <span className="ml-1 text-[10px] text-orange-400">Cancela</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-white/50">
                    {new Date(s.current_period_start).toLocaleDateString("es-ES")} -{" "}
                    {new Date(s.current_period_end).toLocaleDateString("es-ES")}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`https://dashboard.stripe.com/subscriptions/${s.stripe_subscription_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#fddf59] hover:underline"
                    >
                      Ver en Stripe
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

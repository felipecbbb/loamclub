"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { SubscriptionStatus } from "@/types/database";

interface AlumnaRow {
  id: string;
  full_name: string | null;
  email: string;
  role: string;
  created_at: string;
  subscription?: {
    plan: string;
    status: SubscriptionStatus;
  } | null;
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

export default function AlumnasPage() {
  const supabase = createClient();
  const [alumnas, setAlumnas] = useState<AlumnaRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    fetchAlumnas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAlumnas = async () => {
    setLoading(true);
    const { data: profiles } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!profiles) {
      setLoading(false);
      return;
    }

    const { data: subscriptions } = await supabase
      .from("subscriptions")
      .select("user_id, plan, status")
      .order("created_at", { ascending: false });

    const subMap = new Map<string, { plan: string; status: SubscriptionStatus }>();
    (subscriptions ?? []).forEach((sub) => {
      if (!subMap.has(sub.user_id)) {
        subMap.set(sub.user_id, { plan: sub.plan, status: sub.status });
      }
    });

    const rows: AlumnaRow[] = profiles.map((p) => ({
      id: p.id,
      full_name: p.full_name,
      email: p.email,
      role: p.role,
      created_at: p.created_at,
      subscription: subMap.get(p.id) ?? null,
    }));

    setAlumnas(rows);
    setLoading(false);
  };

  const filtered = alumnas.filter((a) => {
    const matchesSearch =
      !search ||
      (a.full_name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "none" && !a.subscription) ||
      a.subscription?.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const inputClass =
    "rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#fddf59]/50 focus:ring-1 focus:ring-[#fddf59]/30";
  const selectClass =
    "rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#fddf59]/50 [&>option]:bg-[#2e3520] [&>option]:text-white";

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold text-white">Alumnas</h1>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <input
          className={inputClass + " flex-1 min-w-[200px]"}
          placeholder="Buscar por nombre o email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className={selectClass} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">Todos los estados</option>
          <option value="active">Activa</option>
          <option value="past_due">Pago pendiente</option>
          <option value="canceled">Cancelada</option>
          <option value="trialing">Prueba</option>
          <option value="none">Sin suscripcion</option>
        </select>
      </div>

      {loading ? (
        <p className="text-white/50">Cargando...</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-white/50">No se encontraron alumnas.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/50">
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Plan</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Registro</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-b border-white/5 text-white/80 transition-colors hover:bg-white/[0.03]">
                  <td className="px-4 py-3">
                    <Link href={`/admin/alumnas/${a.id}`} className="hover:text-[#fddf59]">
                      {a.full_name ?? "Sin nombre"}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{a.email}</td>
                  <td className="px-4 py-3">
                    {a.subscription ? (
                      <span className="rounded bg-[#fddf59]/15 px-2 py-0.5 text-xs font-medium text-[#fddf59] uppercase">
                        {a.subscription.plan}
                      </span>
                    ) : (
                      <span className="text-xs text-white/30">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {a.subscription ? (
                      <span className={`rounded px-2 py-0.5 text-xs font-medium ${statusColors[a.subscription.status] ?? "bg-white/10 text-white/40"}`}>
                        {statusLabels[a.subscription.status] ?? a.subscription.status}
                      </span>
                    ) : (
                      <span className="text-xs text-white/30">Sin suscripcion</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-white/50">
                    {new Date(a.created_at).toLocaleDateString("es-ES", {
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

      <p className="mt-4 text-xs text-white/30">{filtered.length} de {alumnas.length} alumnas</p>
    </div>
  );
}

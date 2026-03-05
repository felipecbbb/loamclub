"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { SubscriptionPlan, SubscriptionStatus } from "@/types/database";

interface ProfileData {
  full_name: string | null;
  email: string;
}

interface SubscriptionData {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

export default function PerfilPage() {
  const supabase = createClient();
  const router = useRouter();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionData | null>(
    null
  );
  const [editName, setEditName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name, email")
        .eq("id", user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
        setEditName(profileData.full_name || "");
      }

      const { data: subData } = await supabase
        .from("subscriptions")
        .select("plan, status, current_period_end, cancel_at_period_end")
        .eq("user_id", user.id)
        .eq("status", "active")
        .maybeSingle();

      setSubscription(subData);
      setLoading(false);
    }
    load();
  }, [supabase]);

  async function handleSaveName() {
    setSaving(true);
    setSaved(false);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({ full_name: editName, updated_at: new Date().toISOString() })
      .eq("id", user.id);

    if (!error) {
      setProfile((prev) => (prev ? { ...prev, full_name: editName } : prev));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    setSaving(false);
  }

  async function handleManageSubscription() {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // Handle error silently
    }
    setPortalLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function planLabel(plan: SubscriptionPlan) {
    return plan === "plus" ? "Plan Plus" : "Plan Base";
  }

  function statusLabel(status: SubscriptionStatus) {
    const labels: Record<SubscriptionStatus, string> = {
      active: "Activa",
      past_due: "Pago pendiente",
      canceled: "Cancelada",
      incomplete: "Incompleta",
      trialing: "Periodo de prueba",
    };
    return labels[status] || status;
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-6 max-w-2xl">
        <div className="h-8 w-32 bg-white/10 rounded" />
        <div className="h-40 bg-white/10 rounded-xl" />
        <div className="h-40 bg-white/10 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-8">
      <h1 className="font-display text-3xl font-bold">Perfil</h1>

      {/* User info */}
      <div className="bg-[var(--color-green-dark)] rounded-2xl p-6 space-y-5">
        <h2 className="font-medium text-lg">Informacion personal</h2>

        <div>
          <label className="block text-sm text-[var(--color-white-75)] mb-1.5">
            Email
          </label>
          <p className="text-sm bg-white/5 rounded-lg px-4 py-2.5">
            {profile?.email}
          </p>
        </div>

        <div>
          <label className="block text-sm text-[var(--color-white-75)] mb-1.5">
            Nombre
          </label>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 focus:border-[var(--color-gold)]"
            placeholder="Tu nombre"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveName}
            disabled={saving || editName === (profile?.full_name || "")}
            className="bg-[var(--color-gold)] text-[var(--color-green-dark)] font-medium text-sm px-5 py-2 rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Guardando..." : "Guardar nombre"}
          </button>
          {saved && (
            <span className="text-sm text-[var(--color-gold)]">
              Guardado correctamente
            </span>
          )}
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-[var(--color-green-dark)] rounded-2xl p-6 space-y-5">
        <h2 className="font-medium text-lg">Suscripcion</h2>

        {subscription ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-[var(--color-white-40)]">Plan</p>
                <p className="font-medium">
                  {planLabel(subscription.plan)}
                </p>
              </div>
              <div>
                <p className="text-sm text-[var(--color-white-40)]">Estado</p>
                <p className="font-medium">
                  {statusLabel(subscription.status)}
                </p>
              </div>
              <div>
                <p className="text-sm text-[var(--color-white-40)]">
                  Proxima facturacion
                </p>
                <p className="font-medium">
                  {formatDate(subscription.current_period_end)}
                </p>
              </div>
              {subscription.cancel_at_period_end && (
                <div>
                  <p className="text-sm text-[var(--color-gold)]">
                    Se cancelara al final del periodo
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={handleManageSubscription}
              disabled={portalLoading}
              className="bg-white/10 text-white text-sm px-5 py-2 rounded-lg hover:bg-white/15 transition-colors disabled:opacity-50"
            >
              {portalLoading ? "Cargando..." : "Gestionar suscripcion"}
            </button>
          </>
        ) : (
          <p className="text-sm text-[var(--color-white-75)]">
            No tienes una suscripcion activa.
          </p>
        )}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="text-sm text-[var(--color-white-40)] hover:text-white transition-colors"
      >
        Cerrar sesion
      </button>
    </div>
  );
}

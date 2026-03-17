"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string;
  stripe_customer_id: string | null;
  created_at: string;
}

interface Subscription {
  id: string;
  plan: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  stripe_subscription_id: string;
}

interface LessonProgress {
  id: string;
  lesson_id: string;
  completed: boolean;
  completed_at: string | null;
  lesson_title?: string;
}

interface ExerciseResponse {
  id: string;
  exercise_id: string;
  response: Record<string, unknown>;
  completed: boolean;
  completed_at: string | null;
  exercise_title?: string;
  exercise_type?: string;
}

const statusColors: Record<string, string> = {
  active: "bg-green-500/20 text-green-400",
  past_due: "bg-yellow-500/20 text-yellow-400",
  canceled: "bg-red-500/20 text-red-400",
  incomplete: "bg-white/10 text-white/40",
  trialing: "bg-blue-500/20 text-blue-400",
};

export default function DetalleAlumnaPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [responses, setResponses] = useState<ExerciseResponse[]>([]);
  const [totalLessons, setTotalLessons] = useState(0);

  useEffect(() => {
    const load = async () => {
      const [profileRes, subsRes, progressRes, responsesRes, lessonsCountRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", params.id).single(),
        supabase.from("subscriptions").select("*").eq("user_id", params.id).order("created_at", { ascending: false }),
        supabase.from("lesson_progress").select("*").eq("user_id", params.id),
        supabase.from("exercise_responses").select("*").eq("user_id", params.id),
        supabase.from("lessons").select("id", { count: "exact", head: true }),
      ]);

      setProfile(profileRes.data);
      setSubscriptions(subsRes.data ?? []);
      setTotalLessons(lessonsCountRes.count ?? 0);

      // Enrich progress with lesson titles
      const progressData = progressRes.data ?? [];
      if (progressData.length > 0) {
        const lessonIds = progressData.map((p) => p.lesson_id);
        const { data: lessonsData } = await supabase
          .from("lessons")
          .select("id, title")
          .in("id", lessonIds);
        const lessonMap = new Map((lessonsData ?? []).map((l) => [l.id, l.title]));
        setProgress(progressData.map((p) => ({ ...p, lesson_title: lessonMap.get(p.lesson_id) ?? "Desconocida" })));
      } else {
        setProgress([]);
      }

      // Enrich responses with exercise info
      const responsesData = responsesRes.data ?? [];
      if (responsesData.length > 0) {
        const exerciseIds = responsesData.map((r) => r.exercise_id);
        const { data: exercisesData } = await supabase
          .from("exercises")
          .select("id, title, type")
          .in("id", exerciseIds);
        const exerciseMap = new Map((exercisesData ?? []).map((e) => [e.id, e]));
        setResponses(
          responsesData.map((r) => ({
            ...r,
            exercise_title: exerciseMap.get(r.exercise_id)?.title ?? "Desconocido",
            exercise_type: exerciseMap.get(r.exercise_id)?.type ?? "unknown",
          }))
        );
      } else {
        setResponses([]);
      }

      setLoading(false);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  if (loading) {
    return (
      <div>
        <h1 className="mb-8 font-display text-3xl font-bold text-white">Detalle alumna</h1>
        <p className="text-white/50">Cargando...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div>
        <h1 className="mb-8 font-display text-3xl font-bold text-white">Alumna no encontrada</h1>
        <button onClick={() => router.push("/admin/alumnas")} className="text-[#fddf59] hover:underline">
          Volver a alumnas
        </button>
      </div>
    );
  }

  const completedLessons = progress.filter((p) => p.completed).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <button onClick={() => router.push("/admin/alumnas")} className="text-white/50 hover:text-white">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h1 className="font-display text-3xl font-bold text-white">
          {profile.full_name ?? profile.email}
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile info */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Perfil</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-white/50">Nombre</dt>
              <dd className="text-white">{profile.full_name ?? "Sin nombre"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-white/50">Email</dt>
              <dd className="text-white">{profile.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-white/50">Rol</dt>
              <dd>
                <span
                  className={`rounded px-2 py-0.5 text-xs font-medium ${
                    profile.role === "admin"
                      ? "bg-[#fddf59]/20 text-[#fddf59]"
                      : "bg-white/10 text-white/60"
                  }`}
                >
                  {profile.role}
                </span>
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-white/50">Registro</dt>
              <dd className="text-white">
                {new Date(profile.created_at).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </dd>
            </div>
            {profile.stripe_customer_id && (
              <div className="flex justify-between">
                <dt className="text-white/50">Stripe ID</dt>
                <dd className="font-mono text-xs text-white/70">{profile.stripe_customer_id}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Subscription */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Suscripción</h2>
          {subscriptions.length === 0 ? (
            <p className="text-sm text-white/50">Sin suscripción.</p>
          ) : (
            <div className="space-y-4">
              {subscriptions.map((sub) => (
                <div key={sub.id} className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded bg-[#fddf59]/15 px-2 py-0.5 text-xs font-semibold uppercase text-[#fddf59]">
                      {sub.plan}
                    </span>
                    <span className={`rounded px-2 py-0.5 text-xs font-medium ${statusColors[sub.status] ?? "bg-white/10 text-white/40"}`}>
                      {sub.status}
                    </span>
                    {sub.cancel_at_period_end && (
                      <span className="rounded bg-orange-500/20 px-2 py-0.5 text-xs text-orange-400">
                        Cancela al final del periodo
                      </span>
                    )}
                  </div>
                  <dl className="space-y-1 text-xs text-white/50">
                    <div className="flex justify-between">
                      <dt>Periodo actual</dt>
                      <dd className="text-white/70">
                        {new Date(sub.current_period_start).toLocaleDateString("es-ES")} -{" "}
                        {new Date(sub.current_period_end).toLocaleDateString("es-ES")}
                      </dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lesson progress */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Progreso de lecciones</h2>
          <div className="mb-4 flex items-center gap-4">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#fddf59] transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-sm font-medium text-[#fddf59]">{progressPercent}%</span>
          </div>
          <p className="mb-3 text-xs text-white/40">
            {completedLessons} de {totalLessons} lecciones completadas
          </p>
          {progress.length > 0 && (
            <div className="max-h-48 space-y-1 overflow-y-auto">
              {progress.map((p) => (
                <div key={p.id} className="flex items-center justify-between py-1 text-xs">
                  <span className="text-white/70">{p.lesson_title}</span>
                  <span className={p.completed ? "text-green-400" : "text-white/30"}>
                    {p.completed ? "Completada" : "En progreso"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Exercise responses */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Respuestas a ejercicios</h2>
          {responses.length === 0 ? (
            <p className="text-sm text-white/50">Sin respuestas a ejercicios.</p>
          ) : (
            <div className="max-h-64 space-y-3 overflow-y-auto">
              {responses.map((r) => (
                <div key={r.id} className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs font-medium text-white/80">{r.exercise_title}</span>
                    <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/40">
                      {r.exercise_type}
                    </span>
                    <span className={`text-[10px] ${r.completed ? "text-green-400" : "text-white/30"}`}>
                      {r.completed ? "Completado" : "Pendiente"}
                    </span>
                  </div>
                  <pre className="mt-1 overflow-x-auto text-[10px] text-white/50">
                    {JSON.stringify(r.response, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface LessonWithProgress {
  id: string;
  title: string;
  duration_seconds: number | null;
  last_position: number;
  completed: boolean;
  module_title: string;
}

interface Notification {
  id: string;
  type: string;
  title: string;
  body: string | null;
  read: boolean;
  created_at: string;
}

export default function DashboardPage() {
  const supabase = createClient();
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [totalLessons, setTotalLessons] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [continueLesson, setContinueLesson] =
    useState<LessonWithProgress | null>(null);
  const [upcomingLessons, setUpcomingLessons] = useState<
    {
      id: string;
      title: string;
      module_title: string;
      duration_seconds: number | null;
    }[]
  >([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();
      setUserName(profile?.full_name?.split(" ")[0] || "Alumna");

      // All published lessons with module info
      const now = new Date().toISOString();
      const { data: allLessons } = await supabase
        .from("lessons")
        .select(
          "id, title, duration_seconds, position, module_id, modules!inner(title, published, courses!inner(published))"
        )
        .eq("published", true)
        .or(`publish_at.is.null,publish_at.lte.${now}`);

      const publishedLessons = (allLessons || []).filter(
        (l: Record<string, unknown>) => {
          const mod = l.modules as Record<string, unknown> | null;
          if (!mod) return false;
          const course = mod.courses as Record<string, unknown> | null;
          return mod.published && course?.published;
        }
      );

      setTotalLessons(publishedLessons.length);

      // User progress
      const { data: progressData } = await supabase
        .from("lesson_progress")
        .select("lesson_id, completed, last_position, updated_at")
        .eq("user_id", user.id);

      const completed = (progressData || []).filter((p) => p.completed).length;
      setCompletedLessons(completed);

      // Continue where left off: most recently updated, not completed, with position > 0
      const inProgress = (progressData || [])
        .filter((p) => !p.completed && p.last_position > 0)
        .sort(
          (a, b) =>
            new Date(b.updated_at).getTime() -
            new Date(a.updated_at).getTime()
        );

      if (inProgress.length > 0) {
        const lastProgress = inProgress[0];
        const lesson = publishedLessons.find(
          (l: Record<string, unknown>) => l.id === lastProgress.lesson_id
        );
        if (lesson) {
          const mod = lesson.modules as Record<string, unknown>;
          setContinueLesson({
            id: lesson.id as string,
            title: lesson.title as string,
            duration_seconds: lesson.duration_seconds as number | null,
            last_position: lastProgress.last_position,
            completed: false,
            module_title: (mod?.title as string) || "",
          });
        }
      }

      // Upcoming: published but not started
      const startedIds = new Set(
        (progressData || []).map((p) => p.lesson_id)
      );

      const upcoming = publishedLessons
        .filter(
          (l: Record<string, unknown>) => !startedIds.has(l.id as string)
        )
        .slice(0, 3)
        .map((l: Record<string, unknown>) => {
          const mod = l.modules as Record<string, unknown>;
          return {
            id: l.id as string,
            title: l.title as string,
            module_title: (mod?.title as string) || "",
            duration_seconds: l.duration_seconds as number | null,
          };
        });
      setUpcomingLessons(upcoming);

      // Notifications
      const { data: notifs } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);
      setNotifications(notifs || []);

      setLoading(false);
    }
    load();
  }, [supabase]);

  function formatDuration(seconds: number | null) {
    if (!seconds) return "";
    const m = Math.floor(seconds / 60);
    return `${m} min`;
  }

  function formatPosition(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(Math.floor(s)).padStart(2, "0")}`;
  }

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `hace ${mins} min`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `hace ${hours}h`;
    const days = Math.floor(hours / 24);
    return `hace ${days}d`;
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-6 max-w-4xl">
        <div className="h-8 w-64 bg-white/10 rounded" />
        <div className="h-24 bg-white/10 rounded-xl" />
        <div className="h-32 bg-white/10 rounded-xl" />
      </div>
    );
  }

  const progressPercent =
    totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

  return (
    <div className="max-w-4xl space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="font-display text-3xl font-bold">Hola, {userName}</h1>
        <p className="text-[var(--color-white-75)] mt-1">
          Bienvenida a tu espacio de aprendizaje.
        </p>
      </div>

      {/* Progress overview */}
      <div className="bg-[var(--color-green-dark)] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-medium">Tu progreso</h2>
          <span className="text-sm text-[var(--color-gold)]">
            {completedLessons} de {totalLessons} lecciones
          </span>
        </div>
        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-gold)] rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-[var(--color-white-40)] mt-2">
          {progressPercent}% completado
        </p>
      </div>

      {/* Continue where you left off */}
      {continueLesson && (
        <div className="bg-[var(--color-green-dark)] rounded-2xl p-6">
          <h2 className="font-medium mb-4">Continua donde lo dejaste</h2>
          <button
            onClick={() => router.push(`/app/leccion/${continueLesson.id}`)}
            className="w-full text-left flex items-center gap-4 group"
          >
            <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-white/15 transition-colors">
              <svg
                className="w-8 h-8 text-[var(--color-gold)]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="font-medium truncate group-hover:text-[var(--color-gold)] transition-colors">
                {continueLesson.title}
              </p>
              <p className="text-sm text-[var(--color-white-40)]">
                {continueLesson.module_title}
              </p>
              <p className="text-xs text-[var(--color-white-40)] mt-1">
                Posicion: {formatPosition(continueLesson.last_position)}
                {continueLesson.duration_seconds
                  ? ` / ${formatDuration(continueLesson.duration_seconds)}`
                  : ""}
              </p>
            </div>
          </button>
        </div>
      )}

      {/* Upcoming lessons */}
      {upcomingLessons.length > 0 && (
        <div className="bg-[var(--color-green-dark)] rounded-2xl p-6">
          <h2 className="font-medium mb-4">Proximas lecciones</h2>
          <div className="space-y-3">
            {upcomingLessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => router.push(`/app/leccion/${lesson.id}`)}
                className="w-full text-left flex items-center justify-between py-2 group"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate group-hover:text-[var(--color-gold)] transition-colors">
                    {lesson.title}
                  </p>
                  <p className="text-xs text-[var(--color-white-40)]">
                    {lesson.module_title}
                  </p>
                </div>
                {lesson.duration_seconds && (
                  <span className="text-xs text-[var(--color-white-40)] shrink-0 ml-4">
                    {formatDuration(lesson.duration_seconds)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recent notifications */}
      {notifications.length > 0 && (
        <div className="bg-[var(--color-green-dark)] rounded-2xl p-6">
          <h2 className="font-medium mb-4">Notificaciones recientes</h2>
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-start gap-3 py-2 ${
                  !notif.read ? "opacity-100" : "opacity-60"
                }`}
              >
                {!notif.read && (
                  <span className="w-2 h-2 bg-[var(--color-gold)] rounded-full mt-1.5 shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{notif.title}</p>
                  {notif.body && (
                    <p className="text-xs text-[var(--color-white-40)] mt-0.5">
                      {notif.body}
                    </p>
                  )}
                </div>
                <span className="text-xs text-[var(--color-white-40)] shrink-0">
                  {timeAgo(notif.created_at)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

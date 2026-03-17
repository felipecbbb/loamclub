"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Lesson {
  id: string;
  title: string;
  duration_seconds: number | null;
  position: number;
  completed: boolean;
}

interface Module {
  id: string;
  title: string;
  description: string | null;
  position: number;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  description: string | null;
  cover_url: string | null;
  position: number;
  modules: Module[];
}

export default function BibliotecaPage() {
  const supabase = createClient();
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]);
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(
    new Set()
  );
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set()
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Get all published courses with modules and lessons
      const { data: coursesData } = await supabase
        .from("courses")
        .select(
          `id, title, description, cover_url, position,
           modules(id, title, description, position, published,
             lessons(id, title, duration_seconds, position, published, publish_at)
           )`
        )
        .eq("published", true)
        .order("position");

      // Get user progress
      const { data: progressData } = await supabase
        .from("lesson_progress")
        .select("lesson_id, completed")
        .eq("user_id", user.id);

      const completedSet = new Set(
        (progressData || []).filter((p) => p.completed).map((p) => p.lesson_id)
      );

      const now = new Date().toISOString();

      const formatted: Course[] = (coursesData || [])
        .map((course: Record<string, unknown>) => {
          const rawModules = (course.modules || []) as Record<
            string,
            unknown
          >[];
          const modules: Module[] = rawModules
            .filter((m) => m.published)
            .sort((a, b) => (a.position as number) - (b.position as number))
            .map((mod) => {
              const rawLessons = (mod.lessons || []) as Record<
                string,
                unknown
              >[];
              const lessons: Lesson[] = rawLessons
                .filter(
                  (l) =>
                    l.published &&
                    (!l.publish_at || (l.publish_at as string) <= now)
                )
                .sort(
                  (a, b) => (a.position as number) - (b.position as number)
                )
                .map((l) => ({
                  id: l.id as string,
                  title: l.title as string,
                  duration_seconds: l.duration_seconds as number | null,
                  position: l.position as number,
                  completed: completedSet.has(l.id as string),
                }));

              return {
                id: mod.id as string,
                title: mod.title as string,
                description: mod.description as string | null,
                position: mod.position as number,
                lessons,
              };
            });

          return {
            id: course.id as string,
            title: course.title as string,
            description: course.description as string | null,
            cover_url: course.cover_url as string | null,
            position: course.position as number,
            modules,
          };
        })
        .sort((a: Course, b: Course) => a.position - b.position);

      setCourses(formatted);

      // Auto-expand first course and its first module
      if (formatted.length > 0) {
        setExpandedCourses(new Set([formatted[0].id]));
        if (formatted[0].modules.length > 0) {
          setExpandedModules(new Set([formatted[0].modules[0].id]));
        }
      }

      setLoading(false);
    }
    load();
  }, [supabase]);

  function toggleCourse(id: string) {
    setExpandedCourses((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleModule(id: string) {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function formatDuration(seconds: number | null) {
    if (!seconds) return "";
    const m = Math.floor(seconds / 60);
    return `${m} min`;
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-4 max-w-4xl">
        <div className="h-8 w-48 bg-[var(--color-olive)]/10 rounded" />
        {[1, 2].map((i) => (
          <div key={i} className="h-20 bg-[var(--color-olive)]/10 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="max-w-4xl">
        <h1 className="font-display text-3xl font-bold text-[var(--color-black)] mb-4 animate-fade-up">
          Biblioteca
        </h1>
        <div className="bg-white rounded-2xl border border-[var(--color-olive)]/10 p-8 text-center animate-fade-up delay-100">
          <p className="text-[var(--color-black)]/60">
            Aún no hay contenido disponible. Vuelve pronto.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-3xl font-bold text-[var(--color-black)] mb-6 animate-fade-up">
        Biblioteca
      </h1>

      <div className="space-y-4">
        {courses.map((course, courseIdx) => (
          <div
            key={course.id}
            className={`bg-white rounded-2xl border border-[var(--color-olive)]/10 overflow-hidden card-hover animate-fade-up delay-${Math.min((courseIdx + 1) * 100, 600)}`}
          >
            {/* Course header */}
            <button
              onClick={() => toggleCourse(course.id)}
              className="w-full text-left p-6 flex items-center justify-between group"
            >
              <div className="min-w-0">
                <h2 className="font-display text-xl font-bold text-[var(--color-olive)] group-hover:text-[var(--color-gold)] transition-colors">
                  {course.title}
                </h2>
                {course.description && (
                  <p className="text-sm text-[var(--color-black)]/50 mt-1 line-clamp-2">
                    {course.description}
                  </p>
                )}
                <p className="text-xs text-[var(--color-olive)]/60 mt-2">
                  {course.modules.length}{" "}
                  {course.modules.length === 1 ? "módulo" : "módulos"} ·{" "}
                  {course.modules.reduce(
                    (acc, m) => acc + m.lessons.length,
                    0
                  )}{" "}
                  lecciones
                </p>
              </div>
              <svg
                className={`w-5 h-5 text-[var(--color-olive)]/40 shrink-0 transition-transform duration-300 ${
                  expandedCourses.has(course.id) ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Modules */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                expandedCourses.has(course.id)
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-6 space-y-2">
                  {course.modules.map((mod, modIdx) => (
                    <div
                      key={mod.id}
                      className={`bg-[var(--color-cream)] rounded-xl overflow-hidden animate-fade-up delay-${Math.min((modIdx + 1) * 100, 600)}`}
                    >
                      {/* Module header */}
                      <button
                        onClick={() => toggleModule(mod.id)}
                        className="w-full text-left px-4 py-3 flex items-center justify-between group"
                      >
                        <div className="min-w-0">
                          <h3 className="text-sm font-medium text-[var(--color-black)] group-hover:text-[var(--color-gold)] transition-colors">
                            {mod.title}
                          </h3>
                          <p className="text-xs text-[var(--color-olive)]/60">
                            {mod.lessons.filter((l) => l.completed).length}/
                            {mod.lessons.length} completadas
                          </p>
                        </div>
                        <svg
                          className={`w-4 h-4 text-[var(--color-olive)]/40 shrink-0 transition-transform duration-300 ${
                            expandedModules.has(mod.id) ? "rotate-180" : ""
                          }`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>

                      {/* Lessons */}
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          expandedModules.has(mod.id)
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-4 pb-3 space-y-1">
                            {mod.lessons.map((lesson, idx) => (
                              <button
                                key={lesson.id}
                                onClick={() =>
                                  router.push(`/app/leccion/${lesson.id}`)
                                }
                                className="w-full text-left flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-white transition-colors group"
                              >
                                {/* Completion indicator */}
                                {lesson.completed ? (
                                  <span className="w-6 h-6 rounded-full bg-[var(--color-olive)] flex items-center justify-center shrink-0">
                                    <svg
                                      className="w-3.5 h-3.5 text-[var(--color-gold)]"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="3"
                                    >
                                      <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                  </span>
                                ) : (
                                  <span className="w-6 h-6 rounded-full bg-[var(--color-cream)] border border-[var(--color-olive)]/30 flex items-center justify-center text-xs text-[var(--color-olive)] shrink-0">
                                    {idx + 1}
                                  </span>
                                )}
                                <span className="text-sm truncate flex-1 text-[var(--color-black)] group-hover:text-[var(--color-gold)] transition-colors">
                                  {lesson.title}
                                </span>
                                {lesson.duration_seconds && (
                                  <span className="text-xs text-[var(--color-olive)]/60 shrink-0">
                                    {formatDuration(lesson.duration_seconds)}
                                  </span>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

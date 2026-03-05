"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Lesson {
  id: string;
  title: string;
  published: boolean;
  position: number;
}

interface Module {
  id: string;
  title: string;
  published: boolean;
  position: number;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  published: boolean;
  position: number;
  modules: Module[];
}

export default function CursosPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  const fetchCourses = async () => {
    setLoading(true);
    const { data: coursesData } = await supabase
      .from("courses")
      .select("*")
      .order("position", { ascending: true });

    if (!coursesData) {
      setLoading(false);
      return;
    }

    const coursesWithModules: Course[] = await Promise.all(
      coursesData.map(async (course) => {
        const { data: modulesData } = await supabase
          .from("modules")
          .select("*")
          .eq("course_id", course.id)
          .order("position", { ascending: true });

        const modules: Module[] = await Promise.all(
          (modulesData ?? []).map(async (mod) => {
            const { data: lessonsData } = await supabase
              .from("lessons")
              .select("id, title, published, position")
              .eq("module_id", mod.id)
              .order("position", { ascending: true });

            return { ...mod, lessons: lessonsData ?? [] };
          })
        );

        return { ...course, modules };
      })
    );

    setCourses(coursesWithModules);
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleCourse = (id: string) => {
    setExpandedCourses((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const deleteCourse = async (id: string) => {
    if (!confirm("Eliminar este curso y todo su contenido?")) return;
    await supabase.from("courses").delete().eq("id", id);
    fetchCourses();
  };

  const deleteModule = async (id: string) => {
    if (!confirm("Eliminar este modulo y sus lecciones?")) return;
    await supabase.from("modules").delete().eq("id", id);
    fetchCourses();
  };

  const deleteLesson = async (id: string) => {
    if (!confirm("Eliminar esta leccion?")) return;
    await supabase.from("lessons").delete().eq("id", id);
    fetchCourses();
  };

  if (loading) {
    return (
      <div>
        <h1 className="mb-8 font-display text-3xl font-bold text-white">Cursos</h1>
        <p className="text-white/50">Cargando...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-white">Cursos</h1>
        <Link
          href="/admin/cursos/nuevo"
          className="rounded-lg bg-[#fddf59] px-4 py-2 text-sm font-semibold text-[#2e3520] transition-colors hover:bg-[#fddf59]/90"
        >
          + Nuevo curso
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-white/50">No hay cursos creados aun.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {courses.map((course) => (
            <div key={course.id} className="rounded-xl border border-white/10 bg-white/5">
              {/* Course header */}
              <div className="flex items-center gap-3 p-4">
                <button
                  onClick={() => toggleCourse(course.id)}
                  className="text-white/50 hover:text-white"
                >
                  <svg
                    className={`h-5 w-5 transition-transform ${expandedCourses.has(course.id) ? "rotate-90" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{course.title}</span>
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                        course.published
                          ? "bg-green-500/20 text-green-400"
                          : "bg-white/10 text-white/40"
                      }`}
                    >
                      {course.published ? "Publicado" : "Borrador"}
                    </span>
                  </div>
                  <p className="text-xs text-white/40">
                    {course.modules.length} modulos, {course.modules.reduce((s, m) => s + m.lessons.length, 0)} lecciones
                  </p>
                </div>
                <Link
                  href={`/admin/cursos/${course.id}`}
                  className="rounded px-3 py-1.5 text-xs font-medium text-[#fddf59] transition-colors hover:bg-[#fddf59]/10"
                >
                  Editar
                </Link>
                <button
                  onClick={() => deleteCourse(course.id)}
                  className="rounded px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-400/10"
                >
                  Eliminar
                </button>
              </div>

              {/* Modules */}
              {expandedCourses.has(course.id) && (
                <div className="border-t border-white/5 px-4 pb-4">
                  {course.modules.length === 0 ? (
                    <p className="py-3 pl-8 text-sm text-white/40">Sin modulos.</p>
                  ) : (
                    course.modules.map((mod) => (
                      <div key={mod.id} className="ml-6 mt-2 rounded-lg border border-white/5 bg-white/[0.02]">
                        <div className="flex items-center gap-3 p-3">
                          <button
                            onClick={() => toggleModule(mod.id)}
                            className="text-white/40 hover:text-white"
                          >
                            <svg
                              className={`h-4 w-4 transition-transform ${expandedModules.has(mod.id) ? "rotate-90" : ""}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                          </button>
                          <div className="flex-1">
                            <span className="text-sm font-medium text-white/80">{mod.title}</span>
                            <span className="ml-2 text-xs text-white/30">{mod.lessons.length} lecciones</span>
                          </div>
                          <button
                            onClick={() => deleteModule(mod.id)}
                            className="rounded px-2 py-1 text-[10px] font-medium text-red-400 hover:bg-red-400/10"
                          >
                            Eliminar
                          </button>
                        </div>

                        {expandedModules.has(mod.id) && mod.lessons.length > 0 && (
                          <div className="border-t border-white/5 px-3 pb-3">
                            {mod.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className="ml-7 flex items-center justify-between border-b border-white/[0.03] py-2 last:border-0"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-white/60">{lesson.title}</span>
                                  <span
                                    className={`h-1.5 w-1.5 rounded-full ${lesson.published ? "bg-green-400" : "bg-white/20"}`}
                                  />
                                </div>
                                <button
                                  onClick={() => deleteLesson(lesson.id)}
                                  className="rounded px-2 py-0.5 text-[10px] text-red-400 hover:bg-red-400/10"
                                >
                                  Eliminar
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

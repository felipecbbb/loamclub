"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { generateSlug } from "@/lib/utils/slug";
import type { ExerciseType } from "@/types/database";

type Tab = "curso" | "modulo" | "leccion" | "ejercicio";

interface CourseOption {
  id: string;
  title: string;
}
interface ModuleOption {
  id: string;
  title: string;
  course_id: string;
}
interface LessonOption {
  id: string;
  title: string;
  module_id: string;
}

export default function NuevoCursoPage() {
  const router = useRouter();
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState<Tab>("curso");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Options for selects
  const [courses, setCourses] = useState<CourseOption[]>([]);
  const [modules, setModules] = useState<ModuleOption[]>([]);
  const [lessons, setLessons] = useState<LessonOption[]>([]);

  // Course form
  const [courseTitle, setCourseTitle] = useState("");
  const [courseSlug, setCourseSlug] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [coursePublished, setCoursePublished] = useState(false);

  // Module form
  const [moduleCourseId, setModuleCourseId] = useState("");
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleSlug, setModuleSlug] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [modulePublished, setModulePublished] = useState(false);

  // Lesson form
  const [lessonModuleId, setLessonModuleId] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonSlug, setLessonSlug] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonPublishAt, setLessonPublishAt] = useState("");
  const [lessonPublished, setLessonPublished] = useState(false);

  // Exercise form
  const [exerciseLessonId, setExerciseLessonId] = useState("");
  const [exerciseTitle, setExerciseTitle] = useState("");
  const [exerciseType, setExerciseType] = useState<ExerciseType>("reflection");
  const [exerciseContent, setExerciseContent] = useState("{}");

  useEffect(() => {
    fetchOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOptions = async () => {
    const [c, m, l] = await Promise.all([
      supabase.from("courses").select("id, title").order("position"),
      supabase.from("modules").select("id, title, course_id").order("position"),
      supabase.from("lessons").select("id, title, module_id").order("position"),
    ]);
    setCourses(c.data ?? []);
    setModules(m.data ?? []);
    setLessons(l.data ?? []);
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const saveCourse = async () => {
    setSaving(true);
    const { error } = await supabase.from("courses").insert({
      title: courseTitle,
      slug: courseSlug || generateSlug(courseTitle),
      description: courseDescription || null,
      published: coursePublished,
    });
    setSaving(false);
    if (error) return showMessage("error", error.message);
    showMessage("success", "Curso creado correctamente");
    setCourseTitle("");
    setCourseSlug("");
    setCourseDescription("");
    setCoursePublished(false);
    fetchOptions();
  };

  const saveModule = async () => {
    if (!moduleCourseId) return showMessage("error", "Selecciona un curso");
    setSaving(true);
    const { error } = await supabase.from("modules").insert({
      course_id: moduleCourseId,
      title: moduleTitle,
      slug: moduleSlug || generateSlug(moduleTitle),
      description: moduleDescription || null,
      published: modulePublished,
    });
    setSaving(false);
    if (error) return showMessage("error", error.message);
    showMessage("success", "Modulo creado correctamente");
    setModuleTitle("");
    setModuleSlug("");
    setModuleDescription("");
    setModulePublished(false);
    fetchOptions();
  };

  const saveLesson = async () => {
    if (!lessonModuleId) return showMessage("error", "Selecciona un modulo");
    setSaving(true);
    const { error } = await supabase.from("lessons").insert({
      module_id: lessonModuleId,
      title: lessonTitle,
      slug: lessonSlug || generateSlug(lessonTitle),
      description: lessonDescription || null,
      publish_at: lessonPublishAt || null,
      published: lessonPublished,
    });
    setSaving(false);
    if (error) return showMessage("error", error.message);
    showMessage("success", "Leccion creada correctamente");
    setLessonTitle("");
    setLessonSlug("");
    setLessonDescription("");
    setLessonPublishAt("");
    setLessonPublished(false);
    fetchOptions();
  };

  const saveExercise = async () => {
    if (!exerciseLessonId) return showMessage("error", "Selecciona una leccion");
    let parsedContent: Record<string, unknown>;
    try {
      parsedContent = JSON.parse(exerciseContent);
    } catch {
      return showMessage("error", "El contenido JSON no es valido");
    }
    setSaving(true);
    const { error } = await supabase.from("exercises").insert({
      lesson_id: exerciseLessonId,
      title: exerciseTitle,
      type: exerciseType,
      content: parsedContent,
    });
    setSaving(false);
    if (error) return showMessage("error", error.message);
    showMessage("success", "Ejercicio creado correctamente");
    setExerciseTitle("");
    setExerciseContent("{}");
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "curso", label: "Curso" },
    { key: "modulo", label: "Modulo" },
    { key: "leccion", label: "Leccion" },
    { key: "ejercicio", label: "Ejercicio" },
  ];

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#fddf59]/50 focus:ring-1 focus:ring-[#fddf59]/30";
  const selectClass =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#fddf59]/50 focus:ring-1 focus:ring-[#fddf59]/30 [&>option]:bg-[#2e3520] [&>option]:text-white";
  const labelClass = "mb-1.5 block text-sm font-medium text-white/70";

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <button onClick={() => router.push("/admin/cursos")} className="text-white/50 hover:text-white">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h1 className="font-display text-3xl font-bold text-white">Nuevo contenido</h1>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mb-6 rounded-lg px-4 py-3 text-sm font-medium ${
            message.type === "success"
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-lg bg-white/5 p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === t.key
                ? "bg-[#fddf59] text-[#2e3520]"
                : "text-white/60 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        {/* CURSO */}
        {activeTab === "curso" && (
          <div className="space-y-5">
            <div>
              <label className={labelClass}>Titulo</label>
              <input
                className={inputClass}
                value={courseTitle}
                onChange={(e) => {
                  setCourseTitle(e.target.value);
                  setCourseSlug(generateSlug(e.target.value));
                }}
                placeholder="Nombre del curso"
              />
            </div>
            <div>
              <label className={labelClass}>Slug</label>
              <input
                className={inputClass}
                value={courseSlug}
                onChange={(e) => setCourseSlug(e.target.value)}
                placeholder="auto-generado-del-titulo"
              />
            </div>
            <div>
              <label className={labelClass}>Descripcion</label>
              <textarea
                className={inputClass + " min-h-[100px] resize-y"}
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                placeholder="Descripcion del curso (opcional)"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCoursePublished(!coursePublished)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  coursePublished ? "bg-[#fddf59]" : "bg-white/20"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    coursePublished ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="text-sm text-white/70">Publicado</span>
            </div>
            <button
              onClick={saveCourse}
              disabled={saving || !courseTitle}
              className="rounded-lg bg-[#fddf59] px-6 py-2.5 text-sm font-semibold text-[#2e3520] transition-colors hover:bg-[#fddf59]/90 disabled:opacity-50"
            >
              {saving ? "Guardando..." : "Crear curso"}
            </button>
          </div>
        )}

        {/* MODULO */}
        {activeTab === "modulo" && (
          <div className="space-y-5">
            <div>
              <label className={labelClass}>Curso</label>
              <select className={selectClass} value={moduleCourseId} onChange={(e) => setModuleCourseId(e.target.value)}>
                <option value="">Seleccionar curso...</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Titulo</label>
              <input
                className={inputClass}
                value={moduleTitle}
                onChange={(e) => {
                  setModuleTitle(e.target.value);
                  setModuleSlug(generateSlug(e.target.value));
                }}
                placeholder="Nombre del modulo"
              />
            </div>
            <div>
              <label className={labelClass}>Slug</label>
              <input
                className={inputClass}
                value={moduleSlug}
                onChange={(e) => setModuleSlug(e.target.value)}
                placeholder="auto-generado-del-titulo"
              />
            </div>
            <div>
              <label className={labelClass}>Descripcion</label>
              <textarea
                className={inputClass + " min-h-[100px] resize-y"}
                value={moduleDescription}
                onChange={(e) => setModuleDescription(e.target.value)}
                placeholder="Descripcion del modulo (opcional)"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setModulePublished(!modulePublished)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  modulePublished ? "bg-[#fddf59]" : "bg-white/20"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    modulePublished ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="text-sm text-white/70">Publicado</span>
            </div>
            <button
              onClick={saveModule}
              disabled={saving || !moduleTitle || !moduleCourseId}
              className="rounded-lg bg-[#fddf59] px-6 py-2.5 text-sm font-semibold text-[#2e3520] transition-colors hover:bg-[#fddf59]/90 disabled:opacity-50"
            >
              {saving ? "Guardando..." : "Crear modulo"}
            </button>
          </div>
        )}

        {/* LECCION */}
        {activeTab === "leccion" && (
          <div className="space-y-5">
            <div>
              <label className={labelClass}>Modulo</label>
              <select className={selectClass} value={lessonModuleId} onChange={(e) => setLessonModuleId(e.target.value)}>
                <option value="">Seleccionar modulo...</option>
                {modules.map((m) => {
                  const course = courses.find((c) => c.id === m.course_id);
                  return (
                    <option key={m.id} value={m.id}>
                      {course ? `${course.title} > ` : ""}{m.title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label className={labelClass}>Titulo</label>
              <input
                className={inputClass}
                value={lessonTitle}
                onChange={(e) => {
                  setLessonTitle(e.target.value);
                  setLessonSlug(generateSlug(e.target.value));
                }}
                placeholder="Nombre de la leccion"
              />
            </div>
            <div>
              <label className={labelClass}>Slug</label>
              <input
                className={inputClass}
                value={lessonSlug}
                onChange={(e) => setLessonSlug(e.target.value)}
                placeholder="auto-generado-del-titulo"
              />
            </div>
            <div>
              <label className={labelClass}>Descripcion</label>
              <textarea
                className={inputClass + " min-h-[100px] resize-y"}
                value={lessonDescription}
                onChange={(e) => setLessonDescription(e.target.value)}
                placeholder="Descripcion de la leccion (opcional)"
              />
            </div>
            <div>
              <label className={labelClass}>Publicar en (fecha y hora)</label>
              <input
                type="datetime-local"
                className={inputClass}
                value={lessonPublishAt}
                onChange={(e) => setLessonPublishAt(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setLessonPublished(!lessonPublished)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  lessonPublished ? "bg-[#fddf59]" : "bg-white/20"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    lessonPublished ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="text-sm text-white/70">Publicada</span>
            </div>
            <button
              onClick={saveLesson}
              disabled={saving || !lessonTitle || !lessonModuleId}
              className="rounded-lg bg-[#fddf59] px-6 py-2.5 text-sm font-semibold text-[#2e3520] transition-colors hover:bg-[#fddf59]/90 disabled:opacity-50"
            >
              {saving ? "Guardando..." : "Crear leccion"}
            </button>
          </div>
        )}

        {/* EJERCICIO */}
        {activeTab === "ejercicio" && (
          <div className="space-y-5">
            <div>
              <label className={labelClass}>Leccion</label>
              <select className={selectClass} value={exerciseLessonId} onChange={(e) => setExerciseLessonId(e.target.value)}>
                <option value="">Seleccionar leccion...</option>
                {lessons.map((l) => {
                  const mod = modules.find((m) => m.id === l.module_id);
                  const course = mod ? courses.find((c) => c.id === mod.course_id) : null;
                  return (
                    <option key={l.id} value={l.id}>
                      {course ? `${course.title} > ` : ""}{mod ? `${mod.title} > ` : ""}{l.title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label className={labelClass}>Titulo</label>
              <input
                className={inputClass}
                value={exerciseTitle}
                onChange={(e) => setExerciseTitle(e.target.value)}
                placeholder="Nombre del ejercicio"
              />
            </div>
            <div>
              <label className={labelClass}>Tipo</label>
              <select
                className={selectClass}
                value={exerciseType}
                onChange={(e) => setExerciseType(e.target.value as ExerciseType)}
              >
                <option value="reflection">Reflexion</option>
                <option value="quiz">Quiz</option>
                <option value="checklist">Checklist</option>
                <option value="download">Descarga</option>
                <option value="freeform">Libre</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Contenido (JSON)</label>
              <textarea
                className={inputClass + " min-h-[200px] resize-y font-mono text-xs"}
                value={exerciseContent}
                onChange={(e) => setExerciseContent(e.target.value)}
                placeholder='{ "prompt": "...", "options": [...] }'
              />
            </div>
            <button
              onClick={saveExercise}
              disabled={saving || !exerciseTitle || !exerciseLessonId}
              className="rounded-lg bg-[#fddf59] px-6 py-2.5 text-sm font-semibold text-[#2e3520] transition-colors hover:bg-[#fddf59]/90 disabled:opacity-50"
            >
              {saving ? "Guardando..." : "Crear ejercicio"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { generateSlug } from "@/lib/utils/slug";

export default function EditarCursoPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error || !data) {
        setMessage({ type: "error", text: "Curso no encontrado" });
        setLoading(false);
        return;
      }

      setTitle(data.title);
      setSlug(data.slug);
      setDescription(data.description ?? "");
      setPublished(data.published);
      setPosition(data.position);
      setLoading(false);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("courses")
      .update({
        title,
        slug: slug || generateSlug(title),
        description: description || null,
        published,
        position,
      })
      .eq("id", params.id);

    setSaving(false);
    if (error) return showMessage("error", error.message);
    showMessage("success", "Curso actualizado correctamente");
  };

  const handleDelete = async () => {
    if (!confirm("¿Eliminar este curso y todo su contenido? Esta acción no se puede deshacer.")) return;
    const { error } = await supabase.from("courses").delete().eq("id", params.id);
    if (error) return showMessage("error", error.message);
    router.push("/admin/cursos");
  };

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#fddf59]/50 focus:ring-1 focus:ring-[#fddf59]/30";
  const labelClass = "mb-1.5 block text-sm font-medium text-white/70";

  if (loading) {
    return (
      <div>
        <h1 className="mb-8 font-display text-3xl font-bold text-white">Editar curso</h1>
        <p className="text-white/50">Cargando...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <button onClick={() => router.push("/admin/cursos")} className="text-white/50 hover:text-white">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h1 className="font-display text-3xl font-bold text-white">Editar curso</h1>
      </div>

      {message && (
        <div
          className={`mb-6 rounded-lg px-4 py-3 text-sm font-medium ${
            message.type === "success" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Título</label>
            <input
              className={inputClass}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setSlug(generateSlug(e.target.value));
              }}
            />
          </div>
          <div>
            <label className={labelClass}>Slug</label>
            <input className={inputClass} value={slug} onChange={(e) => setSlug(e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Descripción</label>
            <textarea
              className={inputClass + " min-h-[100px] resize-y"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Posición</label>
            <input
              type="number"
              className={inputClass + " w-32"}
              value={position}
              onChange={(e) => setPosition(parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPublished(!published)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                published ? "bg-[#fddf59]" : "bg-white/20"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  published ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-sm text-white/70">Publicado</span>
          </div>

          <div className="flex items-center gap-3 border-t border-white/10 pt-5">
            <button
              onClick={handleSave}
              disabled={saving || !title}
              className="rounded-lg bg-[#fddf59] px-6 py-2.5 text-sm font-semibold text-[#2e3520] transition-colors hover:bg-[#fddf59]/90 disabled:opacity-50"
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
            <button
              onClick={handleDelete}
              className="rounded-lg bg-red-500/10 px-6 py-2.5 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/20"
            >
              Eliminar curso
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

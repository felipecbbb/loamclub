"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useProgress } from "@/hooks/use-progress";
import type { ExerciseType } from "@/types/database";
import MuxPlayer from "@mux/mux-player-react";

interface LessonData {
  id: string;
  title: string;
  description: string | null;
  mux_playback_id: string | null;
  duration_seconds: number | null;
  module_id: string;
}

interface ExerciseData {
  id: string;
  title: string;
  type: ExerciseType;
  content: Record<string, unknown>;
  position: number;
}

interface ExerciseResponseData {
  exercise_id: string;
  response: Record<string, unknown>;
  completed: boolean;
}

interface SiblingLesson {
  id: string;
  title: string;
}

export default function LeccionPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const supabase = createClient();
  const { updateProgress, markCompleted, getProgress } = useProgress();

  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [exercises, setExercises] = useState<ExerciseData[]>([]);
  const [responses, setResponses] = useState<Map<string, ExerciseResponseData>>(
    new Map()
  );
  const [localResponses, setLocalResponses] = useState<
    Map<string, Record<string, unknown>>
  >(new Map());
  const [savingExercise, setSavingExercise] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [markingComplete, setMarkingComplete] = useState(false);
  const [prevLesson, setPrevLesson] = useState<SiblingLesson | null>(null);
  const [nextLesson, setNextLesson] = useState<SiblingLesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [playbackToken, setPlaybackToken] = useState<string | null>(null);
  const [tokenLoading, setTokenLoading] = useState(false);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    setUserId(user.id);

    // Load lesson
    const { data: lessonData } = await supabase
      .from("lessons")
      .select("id, title, description, mux_playback_id, duration_seconds, module_id")
      .eq("id", id)
      .single();

    if (!lessonData) {
      router.push("/app/biblioteca");
      return;
    }
    setLesson(lessonData);

    // Load exercises
    const { data: exercisesData } = await supabase
      .from("exercises")
      .select("id, title, type, content, position")
      .eq("lesson_id", id)
      .order("position");
    setExercises(exercisesData || []);

    // Load existing responses
    const { data: responsesData } = await supabase
      .from("exercise_responses")
      .select("exercise_id, response, completed")
      .eq("user_id", user.id)
      .in(
        "exercise_id",
        (exercisesData || []).map((e) => e.id)
      );

    const respMap = new Map<string, ExerciseResponseData>();
    const localMap = new Map<string, Record<string, unknown>>();
    (responsesData || []).forEach((r) => {
      respMap.set(r.exercise_id, r);
      localMap.set(r.exercise_id, r.response);
    });
    setResponses(respMap);
    setLocalResponses(localMap);

    // Load progress
    const progress = await getProgress(id);
    setIsCompleted(progress?.completed || false);

    // Load sibling lessons (prev/next in same module)
    const { data: siblings } = await supabase
      .from("lessons")
      .select("id, title, position")
      .eq("module_id", lessonData.module_id)
      .eq("published", true)
      .order("position");

    if (siblings) {
      const currentIdx = siblings.findIndex((s) => s.id === id);
      if (currentIdx > 0) {
        setPrevLesson({
          id: siblings[currentIdx - 1].id,
          title: siblings[currentIdx - 1].title,
        });
      } else {
        setPrevLesson(null);
      }
      if (currentIdx < siblings.length - 1) {
        setNextLesson({
          id: siblings[currentIdx + 1].id,
          title: siblings[currentIdx + 1].title,
        });
      } else {
        setNextLesson(null);
      }
    }

    setLoading(false);

    // Fetch playback token if lesson has a Mux playback ID
    if (lessonData.mux_playback_id) {
      setTokenLoading(true);
      try {
        const res = await fetch("/api/mux/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ playbackId: lessonData.mux_playback_id }),
        });
        const tokenData = await res.json();
        if (tokenData.token) {
          setPlaybackToken(tokenData.token);
        }
      } catch {
        // Token fetch failed - video won't play for signed assets
      }
      setTokenLoading(false);
    }
  }, [id, supabase, router, getProgress]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Auto-save progress every 15 seconds while watching
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  function updateLocalResponse(
    exerciseId: string,
    data: Record<string, unknown>
  ) {
    setLocalResponses((prev) => {
      const next = new Map(prev);
      next.set(exerciseId, { ...(prev.get(exerciseId) || {}), ...data });
      return next;
    });
  }

  async function saveExerciseResponse(
    exerciseId: string,
    completed: boolean = false
  ) {
    if (!userId) return;
    setSavingExercise(exerciseId);

    const response = localResponses.get(exerciseId) || {};

    const existing = responses.get(exerciseId);
    if (existing) {
      await supabase
        .from("exercise_responses")
        .update({
          response,
          completed,
          completed_at: completed ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .eq("exercise_id", exerciseId);
    } else {
      await supabase.from("exercise_responses").insert({
        user_id: userId,
        exercise_id: exerciseId,
        response,
        completed,
        completed_at: completed ? new Date().toISOString() : null,
      });
    }

    setResponses((prev) => {
      const next = new Map(prev);
      next.set(exerciseId, { exercise_id: exerciseId, response, completed });
      return next;
    });

    setSavingExercise(null);
  }

  async function handleMarkCompleted() {
    setMarkingComplete(true);
    await markCompleted(id);
    setIsCompleted(true);
    setMarkingComplete(false);
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-6 max-w-4xl">
        <div className="aspect-video bg-[var(--color-border)] rounded-2xl" />
        <div className="h-8 w-64 bg-[var(--color-border)] rounded" />
        <div className="h-20 bg-[var(--color-border)] rounded-xl" />
      </div>
    );
  }

  if (!lesson) return null;

  return (
    <div className="max-w-4xl space-y-8">
      {/* Video player */}
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-[var(--color-olive)] shadow-lg">
        {lesson.mux_playback_id ? (
          tokenLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <MuxPlayer
              playbackId={lesson.mux_playback_id}
              tokens={playbackToken ? { playback: playbackToken } : undefined}
              metadata={{
                video_title: lesson.title,
              }}
              accentColor="#fddf59"
              style={{ width: "100%", height: "100%", borderRadius: "1rem" }}
              onTimeUpdate={(e: Event) => {
                const target = e.target as HTMLMediaElement;
                if (target && !progressIntervalRef.current) {
                  progressIntervalRef.current = setInterval(() => {
                    if (target.currentTime > 0) {
                      updateProgress(id, Math.floor(target.currentTime));
                    }
                  }, 15000);
                }
              }}
              onPause={(e: Event) => {
                const target = e.target as HTMLMediaElement;
                if (target?.currentTime > 0) {
                  updateProgress(id, Math.floor(target.currentTime));
                }
              }}
              onEnded={() => {
                if (!isCompleted) {
                  handleMarkCompleted();
                }
              }}
            />
          )
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <p className="text-sm text-white/60">
                Video pendiente de subir
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Lesson info */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-black)]">
          {lesson.title}
        </h1>
        {lesson.description && (
          <p className="text-[var(--color-text-secondary)] mt-2 leading-relaxed">
            {lesson.description}
          </p>
        )}
      </div>

      {/* Completion status */}
      <div className="flex items-center gap-4">
        {isCompleted ? (
          <div className="flex items-center gap-2 rounded-full bg-[var(--color-olive)]/10 px-4 py-2">
            <svg
              className="w-5 h-5 text-[var(--color-olive)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-sm font-medium text-[var(--color-olive)]">Lección completada</span>
          </div>
        ) : (
          <button
            onClick={handleMarkCompleted}
            disabled={markingComplete}
            className="bg-[var(--color-olive)] text-white font-medium text-sm px-5 py-2.5 rounded-full hover:brightness-110 transition-all disabled:opacity-50"
          >
            {markingComplete ? "Guardando..." : "Marcar como completada"}
          </button>
        )}
      </div>

      {/* Exercises */}
      {exercises.length > 0 && (
        <div className="space-y-6">
          <h2 className="font-display text-xl font-bold text-[var(--color-black)]">Ejercicios</h2>
          {exercises.map((exercise) => (
            <ExerciseRenderer
              key={exercise.id}
              exercise={exercise}
              localResponse={localResponses.get(exercise.id) || {}}
              savedResponse={responses.get(exercise.id)}
              saving={savingExercise === exercise.id}
              onUpdateLocal={(data) =>
                updateLocalResponse(exercise.id, data)
              }
              onSave={(completed) =>
                saveExerciseResponse(exercise.id, completed)
              }
            />
          ))}
        </div>
      )}

      {/* Prev/Next navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border)]">
        {prevLesson ? (
          <button
            onClick={() => router.push(`/app/leccion/${prevLesson.id}`)}
            className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-olive)] transition-colors group"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="truncate max-w-[200px]">{prevLesson.title}</span>
          </button>
        ) : (
          <div />
        )}
        {nextLesson ? (
          <button
            onClick={() => router.push(`/app/leccion/${nextLesson.id}`)}
            className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-olive)] transition-colors group"
          >
            <span className="truncate max-w-[200px]">{nextLesson.title}</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

/* ─── Exercise renderers ─── */

function ExerciseRenderer({
  exercise,
  localResponse,
  savedResponse,
  saving,
  onUpdateLocal,
  onSave,
}: {
  exercise: ExerciseData;
  localResponse: Record<string, unknown>;
  savedResponse?: ExerciseResponseData;
  saving: boolean;
  onUpdateLocal: (data: Record<string, unknown>) => void;
  onSave: (completed?: boolean) => void;
}) {
  const isCompleted = savedResponse?.completed || false;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm card-hover">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-[var(--color-olive)]" />
          <h3 className="font-medium text-[var(--color-black)]">{exercise.title}</h3>
        </div>
        {isCompleted && (
          <span className="text-xs text-[var(--color-olive)] flex items-center gap-1 bg-[var(--color-olive)]/10 px-2.5 py-1 rounded-full">
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Completado
          </span>
        )}
      </div>

      {exercise.type === "reflection" && (
        <ReflectionExercise
          content={exercise.content}
          localResponse={localResponse}
          saving={saving}
          completed={isCompleted}
          onUpdateLocal={onUpdateLocal}
          onSave={onSave}
        />
      )}
      {exercise.type === "quiz" && (
        <QuizExercise
          content={exercise.content}
          localResponse={localResponse}
          saving={saving}
          completed={isCompleted}
          onUpdateLocal={onUpdateLocal}
          onSave={onSave}
        />
      )}
      {exercise.type === "checklist" && (
        <ChecklistExercise
          content={exercise.content}
          localResponse={localResponse}
          saving={saving}
          completed={isCompleted}
          onUpdateLocal={onUpdateLocal}
          onSave={onSave}
        />
      )}
      {exercise.type === "download" && (
        <DownloadExercise content={exercise.content} />
      )}
      {exercise.type === "freeform" && (
        <FreeformExercise content={exercise.content} />
      )}
    </div>
  );
}

function ReflectionExercise({
  content,
  localResponse,
  saving,
  completed,
  onUpdateLocal,
  onSave,
}: {
  content: Record<string, unknown>;
  localResponse: Record<string, unknown>;
  saving: boolean;
  completed: boolean;
  onUpdateLocal: (data: Record<string, unknown>) => void;
  onSave: (completed?: boolean) => void;
}) {
  const prompt = (content.prompt as string) || "";
  const text = (localResponse.text as string) || "";

  return (
    <div className="space-y-3">
      {prompt && (
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {prompt}
        </p>
      )}
      <textarea
        value={text}
        onChange={(e) => onUpdateLocal({ text: e.target.value })}
        rows={4}
        className="w-full border border-[var(--color-border-strong)] bg-[var(--color-cream)] rounded-lg px-4 py-3 text-sm text-[var(--color-black)] resize-y focus:outline-none focus:ring-2 focus:ring-[var(--color-olive)]/30 focus:border-[var(--color-olive)] placeholder-[var(--color-olive-light)]"
        placeholder="Escribe tu reflexión aquí..."
      />
      <button
        onClick={() => onSave(true)}
        disabled={saving || !text.trim()}
        className="bg-[var(--color-olive)] text-white font-medium text-sm px-5 py-2 rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saving ? "Guardando..." : completed ? "Actualizar" : "Guardar"}
      </button>
    </div>
  );
}

function QuizExercise({
  content,
  localResponse,
  saving,
  completed,
  onUpdateLocal,
  onSave,
}: {
  content: Record<string, unknown>;
  localResponse: Record<string, unknown>;
  saving: boolean;
  completed: boolean;
  onUpdateLocal: (data: Record<string, unknown>) => void;
  onSave: (completed?: boolean) => void;
}) {
  const question = (content.question as string) || "";
  const options = (content.options as string[]) || [];
  const correctIndex = content.correct_index as number | undefined;
  const selected = localResponse.selected as number | undefined;
  const [showFeedback, setShowFeedback] = useState(false);

  function handleSelect(idx: number) {
    onUpdateLocal({ selected: idx });
    setShowFeedback(false);
  }

  function handleSubmit() {
    onSave(true);
    setShowFeedback(true);
  }

  return (
    <div className="space-y-3">
      {question && (
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {question}
        </p>
      )}
      <div className="space-y-2">
        {options.map((option, idx) => {
          const isSelected = selected === idx;
          const isCorrect = correctIndex === idx;
          const showResult = showFeedback || completed;

          let borderClass = "border-[var(--color-border-strong)]";
          if (isSelected) borderClass = "border-[var(--color-olive)]";
          if (showResult && isSelected && !isCorrect)
            borderClass = "border-red-400";
          if (showResult && isCorrect) borderClass = "border-green-500";

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={completed}
              className={`w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-lg border ${borderClass} bg-[var(--color-cream)] text-sm text-[var(--color-black)] transition-colors hover:bg-[var(--color-olive-faint)] disabled:cursor-default`}
            >
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isSelected
                    ? "border-[var(--color-olive)]"
                    : "border-[var(--color-olive-light)]"
                }`}
              >
                {isSelected && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-olive)]" />
                )}
              </span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>
      {showFeedback && correctIndex !== undefined && (
        <p
          className={`text-sm font-medium ${
            selected === correctIndex ? "text-green-600" : "text-red-500"
          }`}
        >
          {selected === correctIndex
            ? "¡Correcto!"
            : `Incorrecto. La respuesta correcta es: ${options[correctIndex]}`}
        </p>
      )}
      {!completed && (
        <button
          onClick={handleSubmit}
          disabled={saving || selected === undefined}
          className="bg-[var(--color-olive)] text-white font-medium text-sm px-5 py-2 rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Guardando..." : "Comprobar"}
        </button>
      )}
    </div>
  );
}

function ChecklistExercise({
  content,
  localResponse,
  saving,
  completed,
  onUpdateLocal,
  onSave,
}: {
  content: Record<string, unknown>;
  localResponse: Record<string, unknown>;
  saving: boolean;
  completed: boolean;
  onUpdateLocal: (data: Record<string, unknown>) => void;
  onSave: (completed?: boolean) => void;
}) {
  const items = (content.items as string[]) || [];
  const checked = (localResponse.checked as boolean[]) || items.map(() => false);

  function toggleItem(idx: number) {
    const next = [...checked];
    while (next.length < items.length) next.push(false);
    next[idx] = !next[idx];
    onUpdateLocal({ checked: next });
  }

  const allChecked = items.length > 0 && checked.length >= items.length && checked.every(Boolean);

  return (
    <div className="space-y-3">
      {(content.instructions as string) && (
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {content.instructions as string}
        </p>
      )}
      <div className="space-y-2">
        {items.map((item, idx) => (
          <label
            key={idx}
            className="flex items-start gap-3 cursor-pointer group rounded-lg px-3 py-2 hover:bg-[var(--color-olive-faint)] transition-colors"
          >
            <input
              type="checkbox"
              checked={checked[idx] || false}
              onChange={() => toggleItem(idx)}
              className="mt-0.5 w-4 h-4 rounded border-[var(--color-olive-light)] bg-[var(--color-cream)] text-[var(--color-olive)] focus:ring-[var(--color-olive)]/50 accent-[#5B6644]"
            />
            <span
              className={`text-sm ${
                checked[idx]
                  ? "text-[var(--color-olive-light)] line-through"
                  : "text-[var(--color-black)]"
              }`}
            >
              {item}
            </span>
          </label>
        ))}
      </div>
      <button
        onClick={() => onSave(allChecked)}
        disabled={saving}
        className="bg-[var(--color-olive)] text-white font-medium text-sm px-5 py-2 rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
      >
        {saving ? "Guardando..." : "Guardar progreso"}
      </button>
    </div>
  );
}

function DownloadExercise({
  content,
}: {
  content: Record<string, unknown>;
}) {
  const url = (content.url as string) || "#";
  const label =
    (content.label as string) || "Descargar recurso";
  const instructions = content.instructions as string;

  return (
    <div className="space-y-3">
      {instructions && (
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {instructions}
        </p>
      )}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[var(--color-olive)] text-white text-sm px-5 py-2.5 rounded-lg hover:brightness-110 transition-all"
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        {label}
      </a>
    </div>
  );
}

function FreeformExercise({
  content,
}: {
  content: Record<string, unknown>;
}) {
  const text = (content.text as string) || (content.markdown as string) || "";

  return (
    <div className="prose prose-sm max-w-none">
      <div
        className="text-sm text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}

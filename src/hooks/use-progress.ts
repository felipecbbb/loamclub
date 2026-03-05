"use client";

import { useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

export function useProgress() {
  const supabase = createClient();

  const getProgress = useCallback(
    async (lessonId: string) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from("lesson_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("lesson_id", lessonId)
        .maybeSingle();

      return data;
    },
    [supabase]
  );

  const updateProgress = useCallback(
    async (lessonId: string, lastPosition: number) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      const existing = await getProgress(lessonId);

      if (existing) {
        const { data, error } = await supabase
          .from("lesson_progress")
          .update({
            last_position: lastPosition,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("lesson_progress")
          .insert({
            user_id: user.id,
            lesson_id: lessonId,
            last_position: lastPosition,
          })
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    [supabase, getProgress]
  );

  const markCompleted = useCallback(
    async (lessonId: string) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      const existing = await getProgress(lessonId);

      if (existing) {
        const { data, error } = await supabase
          .from("lesson_progress")
          .update({
            completed: true,
            completed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("lesson_progress")
          .insert({
            user_id: user.id,
            lesson_id: lessonId,
            completed: true,
            completed_at: new Date().toISOString(),
          })
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    [supabase, getProgress]
  );

  return { getProgress, updateProgress, markCompleted };
}

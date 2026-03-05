"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];

interface UseUserReturn {
  user: User | null;
  profile: Profile | null;
  subscription: Subscription | null;
  loading: boolean;
}

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function load() {
      setLoading(true);

      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        setUser(null);
        setProfile(null);
        setSubscription(null);
        setLoading(false);
        return;
      }

      setUser(authUser);

      // Fetch profile and subscription in parallel
      const [profileResult, subscriptionResult] = await Promise.all([
        supabase
          .from("profiles")
          .select("*")
          .eq("id", authUser.id)
          .single(),
        supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", authUser.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
      ]);

      setProfile(profileResult.data);
      setSubscription(subscriptionResult.data);
      setLoading(false);
    }

    load();

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        load();
      } else {
        setUser(null);
        setProfile(null);
        setSubscription(null);
        setLoading(false);
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return { user, profile, subscription, loading };
}

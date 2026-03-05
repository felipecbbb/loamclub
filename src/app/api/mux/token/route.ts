import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { playbackId } = await request.json();

    if (!playbackId) {
      return NextResponse.json(
        { error: "Playback ID required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Verify active subscription
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("status")
      .eq("user_id", user.id)
      .eq("status", "active")
      .single();

    if (!subscription) {
      return NextResponse.json(
        { error: "Active subscription required" },
        { status: 403 }
      );
    }

    const signingKey = Buffer.from(
      process.env.MUX_SIGNING_PRIVATE_KEY!,
      "base64"
    );

    const token = jwt.sign(
      {
        sub: playbackId,
        aud: "v",
        exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
        kid: process.env.MUX_SIGNING_KEY_ID!,
      },
      signingKey,
      { algorithm: "RS256" }
    );

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Mux token error:", error);
    return NextResponse.json(
      { error: "Error generating token" },
      { status: 500 }
    );
  }
}

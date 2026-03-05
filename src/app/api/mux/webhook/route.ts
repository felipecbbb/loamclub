import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    const supabase = createAdminClient();

    switch (type) {
      case "video.asset.ready": {
        const assetId = data.id;
        const playbackId = data.playback_ids?.[0]?.id;
        const duration = Math.round(data.duration || 0);

        if (playbackId) {
          await supabase
            .from("lessons")
            .update({
              mux_playback_id: playbackId,
              duration_seconds: duration,
            })
            .eq("mux_asset_id", assetId);
        }
        break;
      }

      case "video.asset.errored": {
        console.error("Mux asset error:", data.id, data.errors);
        break;
      }

      case "video.upload.asset_created": {
        const assetId = data.new_asset_id;
        const uploadId = data.id;

        // Link the asset to the lesson that was created with this upload
        await supabase
          .from("lessons")
          .update({ mux_asset_id: assetId })
          .eq("mux_asset_id", uploadId);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Mux webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") || "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { sessionId, email } = await req.json();
    if (!sessionId || !email) {
      return new Response(JSON.stringify({ error: "sessionId and email are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: messages, error } = await supabase
      .from("chat_logs")
      .select("role, content, created_at")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    if (!messages || messages.length === 0) {
      return new Response(JSON.stringify({ error: "No chat history found for this session" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Format transcript as readable text
    const transcript = messages
      .map((m) => {
        const time = new Date(m.created_at).toLocaleString("en-US", { timeZone: "America/New_York" });
        const sender = m.role === "user" ? "You" : "Suncoast Expert";
        return `[${time}] ${sender}:\n${m.content}`;
      })
      .join("\n\n---\n\n");

    // Use Lovable AI to generate a nicely formatted email
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "system",
            content: `You are an email formatter. Take the chat transcript and format it into a clean, professional HTML email body. Use simple inline CSS. The email should be from "Florida Deck & Patios - Suncoast Expert Chat". Include a header, the formatted conversation, and a footer with contact info. Keep the original messages intact - do not modify, summarize, or rephrase them. Output ONLY the HTML body content (no <html>, <head>, or <body> tags).`,
          },
          {
            role: "user",
            content: `Format this chat transcript into an HTML email:\n\n${transcript}`,
          },
        ],
      }),
    });

    if (!aiResponse.ok) {
      // Fallback to plain text if AI fails
      console.error("AI formatting failed, using plain text fallback");

      // Store the transcript request for manual follow-up
      await supabase.from("chat_logs").insert({
        session_id: sessionId,
        role: "assistant",
        content: `[Transcript emailed to ${email}]`,
        context_used: [],
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: "Chat transcript prepared. Due to a temporary issue, a plain text version will be sent.",
          transcript,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await aiResponse.json();
    const htmlBody = aiData.choices?.[0]?.message?.content || transcript;

    // Log that transcript was sent
    await supabase.from("chat_logs").insert({
      session_id: sessionId,
      role: "assistant",
      content: `[Chat transcript sent to ${email}]`,
      context_used: [],
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: `Chat transcript prepared for ${email}`,
        transcript,
        htmlTranscript: htmlBody,
        email,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("send-chat-transcript error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

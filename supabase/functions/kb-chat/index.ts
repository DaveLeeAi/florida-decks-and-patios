import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the "Suncoast Expert" — a knowledgeable Florida deck and outdoor living assistant for Florida Deck and Patios.

STRICT RULES:
1. Use ONLY the provided context to answer questions. Do not use your general knowledge about decks, construction, or Florida.
2. If the answer isn't in the provided context, say: "I don't have specific data on that, but I can connect you with one of our local professionals who would know. Would you like a free consultation?"
3. Always be friendly, professional, and helpful.
4. When discussing costs, always mention that prices are estimates and recommend getting a personalized quote.
5. Reference specific Florida building codes, permit requirements, and regional data from the context when available.
6. Keep answers concise but thorough — aim for 2-4 paragraphs max.
7. If the user asks about a specific city/region, focus on that area's data from the context.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { message, sessionId, history } = await req.json();
    if (!message) {
      return new Response(JSON.stringify({ error: "message is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1. Fetch all knowledge entries as context (no embeddings needed)
    const { data: entries, error: fetchError } = await supabase
      .from("knowledge_entries")
      .select("content")
      .order("created_at", { ascending: false })
      .limit(20);

    if (fetchError) {
      console.error("Knowledge fetch error:", fetchError);
    }

    const contextText = entries && entries.length > 0
      ? entries.map((e: { content: string }) => e.content).join("\n\n---\n\n")
      : "No knowledge base entries found.";

    // 2. Build messages for AI
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "system",
        content: `CONTEXT FROM KNOWLEDGE BASE:\n\n${contextText}\n\nUse ONLY this context to answer. If it doesn't contain the answer, say you're not sure and offer to connect with a professional.`,
      },
    ];

    // Add conversation history (last 6 messages)
    if (history && Array.isArray(history)) {
      const recentHistory = history.slice(-6);
      for (const h of recentHistory) {
        messages.push({ role: h.role, content: h.content });
      }
    }

    messages.push({ role: "user", content: message });

    // 3. Call AI for response (streaming)
    const aiResponse = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages,
          stream: true,
        }),
      }
    );

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI error [${aiResponse.status}]: ${errText}`);
    }

    // 4. Log user message
    const sid = sessionId || crypto.randomUUID();
    await supabase.from("chat_logs").insert({
      session_id: sid,
      role: "user",
      content: message,
      context_used: [],
    });

    // Stream back with session info header
    const headers = new Headers(corsHeaders);
    headers.set("Content-Type", "text/event-stream");
    headers.set("X-Session-Id", sid);
    headers.set("X-Has-Context", entries && entries.length > 0 ? "true" : "false");

    return new Response(aiResponse.body, { headers });
  } catch (e) {
    console.error("kb-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

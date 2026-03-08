import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") || "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

/* ─── Built-in pricing & regional data so the bot can always answer cost questions ─── */
const PRICING_CONTEXT = `
## 2026 Florida Deck & Patio Cost Data by Region

### Tampa Bay (Hillsborough / Pasco)
- Pressure-Treated Wood: $45–$75/sq ft installed
- Composite: $65–$95/sq ft installed
- Premium Composite/PVC: $90–$110+/sq ft installed
- Labor rate: $18–$28/sq ft
- Basic permit: $150–$400 | Complex permit: $500–$1,200
- Average project total: $18,000–$40,000
- Median home price: $385,000 | Deck ROI: 78–92%
- Climate: Subtropical, 74% humidity, UV 9–11, no salt air, hurricane zone 130–150 mph

### Orlando (Orange County)
- Pressure-Treated Wood: $42–$70/sq ft installed
- Composite: $60–$90/sq ft installed
- Premium Composite/PVC: $85–$105+/sq ft installed
- Labor rate: $16–$26/sq ft
- Basic permit: $150–$350 | Complex permit: $400–$1,000
- Average project total: $15,000–$35,000
- Median home price: $395,000 | Deck ROI: 80–95%
- Climate: Inland subtropical, 73% humidity, UV 9–11, no salt air, hurricane zone 120–140 mph

### Sarasota (Sarasota / Manatee County)
- Pressure-Treated Wood: $48–$80/sq ft installed
- Composite: $68–$98/sq ft installed
- Premium Composite/PVC: $95–$115+/sq ft installed
- Labor rate: $20–$30/sq ft
- Basic permit: $200–$500 | Complex permit: $600–$1,500
- Average project total: $20,000–$45,000
- Median home price: $450,000 | Deck ROI: 80–95%
- Climate: Coastal subtropical, 75% humidity, UV 9–12, salt air within 3 mi, hurricane zone 140–160 mph

### Jacksonville (St. Johns / Duval County)
- Pressure-Treated Wood: $40–$68/sq ft installed
- Composite: $58–$85/sq ft installed
- Premium Composite/PVC: $82–$100+/sq ft installed
- Labor rate: $15–$24/sq ft
- Basic permit: $100–$300 | Complex permit: $400–$900
- Average project total: $14,000–$32,000
- Median home price: $340,000 | Deck ROI: 82–96%
- Climate: Transitional subtropical, 75% humidity, UV 8–10, partial salt air, hurricane zone 130–150 mph

### Ocala (Marion County)
- Pressure-Treated Wood: $38–$62/sq ft installed
- Composite: $55–$82/sq ft installed
- Premium Composite/PVC: $78–$95+/sq ft installed
- Labor rate: $14–$22/sq ft
- Basic permit: $75–$250 | Complex permit: $300–$700
- Average project total: $12,000–$28,000
- Median home price: $280,000 | Deck ROI: 85–100%
- Climate: Inland, 72% humidity, UV 8–10, no salt air, moderate hurricane zone

### Miami / Fort Lauderdale (Miami-Dade / Broward)
- Pressure-Treated Wood: $50–$85/sq ft installed
- Composite: $70–$100/sq ft installed
- Premium Composite/PVC: $100–$125+/sq ft installed
- Labor rate: $22–$35/sq ft
- Basic permit: $400–$800 | Complex permit: $1,000–$2,500
- Average project total: $25,000–$55,000
- Median home price: $580,000 | Deck ROI: 72–85%
- HVHZ (High-Velocity Hurricane Zone): ALL materials must have Miami-Dade NOA (Notice of Acceptance)
- Engineering: Mandatory digitally signed and sealed engineered drawings for decks over 30" or 200 sq ft
- Climate: Tropical maritime, 78% humidity, UV 10–12, heavy salt air, 175+ mph design wind speed
- Hardware: 316-grade stainless steel required within 3,000 ft of coast
- IMPORTANT: Standard materials approved elsewhere in Florida are NOT automatically approved in Miami-Dade/Broward HVHZ zones

### Melbourne / Cocoa Beach (Brevard County)
- Pressure-Treated Wood: $44–$72/sq ft installed
- Composite: $62–$92/sq ft installed
- Premium Composite/PVC: $88–$108+/sq ft installed
- Labor rate: $17–$27/sq ft
- Basic permit: $150–$400 | Complex permit: $500–$1,200
- Average project total: $16,000–$38,000
- Median home price: $350,000 | Deck ROI: 80–93%
- Climate: Coastal subtropical, 76% humidity, UV 9–11, salt air near coast, hurricane zone 140–160 mph

### West Palm Beach / Port St. Lucie (Palm Beach / Martin County)
- Pressure-Treated Wood: $47–$78/sq ft installed
- Composite: $67–$97/sq ft installed
- Premium Composite/PVC: $92–$115+/sq ft installed
- Labor rate: $20–$32/sq ft
- Basic permit: $250–$600 | Complex permit: $700–$1,800
- Average project total: $22,000–$50,000
- Median home price: $480,000 | Deck ROI: 75–88%
- Climate: Tropical transition, 77% humidity, UV 10–12, salt air, hurricane zone 150–170 mph

### St. Augustine (St. Johns County)
- Pressure-Treated Wood: $42–$70/sq ft installed
- Composite: $60–$90/sq ft installed
- Premium Composite/PVC: $85–$105+/sq ft installed
- Labor rate: $16–$26/sq ft
- Basic permit: $125–$350 | Complex permit: $400–$1,000
- Average project total: $15,000–$35,000
- Median home price: $420,000 | Deck ROI: 82–95%
- Climate: Coastal historic, 76% humidity, UV 8–10, moderate salt air, hurricane zone 130–150 mph

## General Florida Deck Cost Factors
- A typical 300 sq ft deck costs $15,000–$40,000 depending on materials and region
- Composite decking costs 30–50% more upfront but saves $4,500+ in maintenance over 10 years
- Permit fees are 2–4x normal for after-the-fact (unpermitted) work
- HVHZ zones (Miami-Dade, Broward) add 15–25% to total project cost due to NOA materials and engineering
- Hot tub installation requires engineering review ($800–$3,000 additional)
- Stainless steel (316-grade) hardware adds $500–$1,500 for coastal projects
- Engineering/sealed plans: $800–$3,000 when required

## Material Lifespan in Florida Climate
- Pressure-Treated Wood: 10–15 years (7–10 in Miami/coastal), 30–40 hrs/yr maintenance
- Composite: 25–50 years, 2–5 hrs/yr maintenance
- PVC: 30–50 years, 1–3 hrs/yr maintenance
- Ipe Hardwood: 30–50 years, 10–15 hrs/yr maintenance

## Common Inspection Failure Costs
- Ledger board repair: $800–$2,500
- Missing hurricane straps: $600–$2,000
- Railing height correction: $400–$1,500
- Footing repair: $1,200–$4,000
- HVHZ NOA material replacement: $1,000–$5,000
- After-the-fact permit: 2–4x normal permit fee plus potential engineering
`;

const SYSTEM_PROMPT = `You are the "Suncoast Expert" — a knowledgeable Florida deck and outdoor living assistant for Florida Decks and Patios.

RULES:
1. Use the provided context AND the built-in pricing data to answer questions. You have real 2026 Florida cost data — USE IT.
2. When asked about costs, prices, or estimates, ALWAYS give specific price ranges from the data. Include the per-square-foot range AND a typical project total.
3. When a user mentions a specific city or region, use that region's data. If they say "Miami" or "Fort Lauderdale", use Miami/Fort Lauderdale data and mention HVHZ requirements.
4. Always mention that prices are estimates and recommend getting a personalized quote for exact pricing.
5. Be friendly, professional, and concise — aim for 2-3 paragraphs max.
6. Reference Florida building codes, permit requirements, and regional differences when relevant.
7. For HVHZ areas (Miami-Dade, Broward), always mention NOA requirements and the cost premium.
8. If the question is completely outside decks/patios/outdoor living, politely redirect.
9. End cost-related answers with a suggestion to get a personalized quote.
10. Never fabricate specific code section numbers — only reference codes mentioned in context.`;

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

    // 1. Fetch knowledge entries as additional context
    const { data: entries, error: fetchError } = await supabase
      .from("knowledge_entries")
      .select("content")
      .order("created_at", { ascending: false })
      .limit(20);

    if (fetchError) {
      console.error("Knowledge fetch error:", fetchError);
    }

    const kbText = entries && entries.length > 0
      ? entries.map((e: { content: string }) => e.content).join("\n\n---\n\n")
      : "";

    // 2. Build messages — always include pricing data, plus KB entries
    const contextParts = [PRICING_CONTEXT];
    if (kbText) contextParts.push(kbText);

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "system",
        content: `REFERENCE DATA:\n\n${contextParts.join("\n\n---\n\n")}\n\nUse this data to answer questions. For cost questions, always provide specific numbers from the data above.`,
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

    // 3. Call AI (streaming)
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

    // Stream back
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

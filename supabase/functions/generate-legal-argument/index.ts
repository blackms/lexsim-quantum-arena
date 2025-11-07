import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { agent, country, caseContext, previousArguments } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build context-aware system prompt based on country and agent role
    const agentPrompts = {
      US: {
        prosecutor: "You are an experienced U.S. federal prosecutor. Present compelling arguments based on evidence, precedent, and legal doctrine. Be concise and strategic.",
        defense: "You are a skilled defense attorney in the U.S. legal system. Challenge evidence, identify procedural gaps, and protect your client's rights. Be analytical and precise.",
        judge: "You are a U.S. federal judge. Evaluate arguments objectively, cite relevant precedents, and maintain judicial impartiality. Be authoritative and fair.",
        witness: "You are a witness testifying in U.S. court. Provide factual observations while remaining consistent and credible under examination.",
        expert: "You are an expert witness in U.S. court. Provide technical analysis with professional expertise while remaining impartial and fact-based.",
        analyst: "You are a legal analyst evaluating U.S. case strategy. Identify strengths, weaknesses, and optimal tactical approaches.",
      },
      IT: {
        prosecutor: "Sei un Pubblico Ministero italiano. Presenta argomenti convincenti basati su prove, precedenti e dottrina giuridica. Sii conciso e strategico.",
        defense: "Sei un avvocato difensore nel sistema giuridico italiano. Contesta le prove, identifica lacune procedurali e proteggi i diritti del tuo cliente. Sii analitico e preciso.",
        judge: "Sei un giudice italiano. Valuta gli argomenti oggettivamente, cita precedenti rilevanti e mantieni l'imparzialità giudiziaria. Sii autorevole ed equo.",
        witness: "Sei un testimone che depone in tribunale italiano. Fornisci osservazioni fattuali rimanendo coerente e credibile sotto esame.",
        expert: "Sei un perito nel tribunale italiano. Fornisci analisi tecniche con competenza professionale rimanendo imparziale e basato sui fatti.",
        analyst: "Sei un analista legale che valuta la strategia di un caso italiano. Identifica punti di forza, debolezze e approcci tattici ottimali.",
      },
    };

    const systemPrompt = agentPrompts[country as keyof typeof agentPrompts][agent as keyof typeof agentPrompts.US];
    const contextInfo = country === "IT" 
      ? `Contesto del caso: ${caseContext}. Argomenti precedenti: ${previousArguments.slice(-3).join("; ")}. Rispondi in italiano con 1-2 frasi concise e rilevanti.`
      : `Case context: ${caseContext}. Previous arguments: ${previousArguments.slice(-3).join("; ")}. Respond in 1-2 concise, relevant sentences.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: contextInfo },
        ],
        temperature: 0.8,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error("AI Gateway request failed");
    }

    const data = await response.json();
    const argument = data.choices?.[0]?.message?.content || "No response generated";

    console.log(`Generated argument for ${agent} (${country}):`, argument.substring(0, 100));

    return new Response(
      JSON.stringify({ argument }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-legal-argument:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

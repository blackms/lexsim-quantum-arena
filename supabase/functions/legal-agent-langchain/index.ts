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
    const { agent, caseContext, previousArguments, model } = await req.json();
    const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY");

    if (!OPENROUTER_API_KEY) {
      throw new Error("OPENROUTER_API_KEY is not configured");
    }

    console.log(`Generating argument for ${agent} using model: ${model}`);

    // Agent-specific system prompts in Italian
    const systemPrompts: Record<string, string> = {
      pm: "Sei un Pubblico Ministero italiano esperto. Presenta argomenti convincenti basati su prove, precedenti giurisprudenziali e dottrina. Sii conciso, strategico e rigoroso. Rispondi in 2-3 frasi.",
      difesa: "Sei un avvocato difensore nel sistema giuridico italiano. Contesta le prove con precisione, identifica lacune procedurali e proteggi i diritti del tuo assistito. Sii analitico e incisivo. Rispondi in 2-3 frasi.",
      giudice: "Sei un giudice italiano. Valuta gli argomenti con obiettività, cita precedenti rilevanti e mantieni l'imparzialità giudiziaria. Sii autorevole ed equo. Rispondi in 2-3 frasi.",
      testimone: "Sei un testimone che depone in un tribunale italiano. Fornisci osservazioni fattuali rimanendo coerente e credibile. Rispondi in 1-2 frasi.",
      perito: "Sei un perito tecnico nel sistema giudiziario italiano. Fornisci analisi tecniche con competenza professionale, rimanendo imparziale e basato sui fatti. Rispondi in 2-3 frasi.",
    };

    const systemPrompt = systemPrompts[agent] || systemPrompts.difesa;
    const userPrompt = `Contesto del caso: ${caseContext}.\n\nArgomenti precedenti nel dibattimento:\n${previousArguments.slice(-3).join("\n\n")}`;

    // Call OpenRouter API directly
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://lexsim.app",
        "X-Title": "LexSim Legal Simulator",
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.8,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter API error:", response.status, errorText);
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const argument = data.choices?.[0]?.message?.content || "No response generated";

    console.log(`Generated argument (${model}):`, argument.substring(0, 100));

    return new Response(
      JSON.stringify({ argument }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in legal-agent-langchain:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        details: error instanceof Error ? error.stack : undefined
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ScenarioCountry, getAgentLabels } from "@/types/scenario";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: number;
  agent: string;
  role: "prosecution" | "defense" | "judge" | "witness" | "expert";
  content: string;
  timestamp: Date;
}

const agentColors = {
  prosecution: "bg-destructive/20 border-destructive text-destructive",
  defense: "bg-primary/20 border-primary text-primary",
  judge: "bg-accent/20 border-accent text-accent",
  witness: "bg-muted border-muted-foreground text-muted-foreground",
  expert: "bg-secondary border-secondary-foreground text-secondary-foreground",
};

const sampleMessages: Omit<Message, "id" | "timestamp">[] = [
  {
    agent: "Prosecution",
    role: "prosecution",
    content: "The forensic evidence clearly demonstrates a direct causal link. DNA analysis confirms presence at the scene with 99.7% certainty.",
  },
  {
    agent: "Defense",
    role: "defense",
    content: "Objection. The chain of custody documentation shows a 4-hour gap. This evidence may be inadmissible under Federal Rule 901.",
  },
  {
    agent: "Judge",
    role: "judge",
    content: "Sustained. Prosecution, please address the chain of custody issue before proceeding.",
  },
  {
    agent: "Expert Witness",
    role: "expert",
    content: "Based on my analysis, the probability of contamination during that window is approximately 23%, which exceeds acceptable forensic standards.",
  },
  {
    agent: "Prosecution",
    role: "prosecution",
    content: "We have supplementary testimony from the lab technician confirming proper storage protocols throughout the entire period.",
  },
  {
    agent: "Defense",
    role: "defense",
    content: "The technician's testimony contradicts the timestamped logs from the digital evidence management system. This raises credibility concerns.",
  },
];

interface AgentDebateProps {
  isSimulating: boolean;
  country: ScenarioCountry;
  caseType?: string;
  evidenceStrength?: number;
}

const AgentDebate = ({ isSimulating, country, caseType = "criminal", evidenceStrength = 75 }: AgentDebateProps) => {
  const agentLabels = getAgentLabels(country);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const agents: Array<{ role: "prosecutor" | "defense" | "judge" | "witness" | "expert", key: "prosecution" | "defense" | "judge" | "witness" | "expert" }> = [
    { role: "prosecutor", key: "prosecution" },
    { role: "defense", key: "defense" },
    { role: "judge", key: "judge" },
    { role: "expert", key: "expert" },
    { role: "witness", key: "witness" },
  ];

  const generateArgument = async (agentRole: string, agentKey: string) => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    try {
      const caseContext = country === "IT"
        ? `Caso ${caseType}, forza prove ${evidenceStrength}%`
        : `${caseType} case, evidence strength ${evidenceStrength}%`;
      
      const previousArguments = messages.slice(-5).map(m => m.content);

      const { data, error } = await supabase.functions.invoke("generate-legal-argument", {
        body: {
          agent: agentRole,
          country,
          caseContext,
          previousArguments,
        },
      });

      if (error) {
        console.error("Error generating argument:", error);
        return;
      }

      const newMessage: Message = {
        id: Date.now(),
        agent: agentLabels[agentRole as keyof typeof agentLabels] || agentRole,
        role: agentKey as Message["role"],
        content: data.argument,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, newMessage].slice(-20));
    } catch (error) {
      console.error("Error in generateArgument:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (isSimulating) {
      // Initial delay before first argument
      const startDelay = setTimeout(() => {
        generateArgument(agents[0].role, agents[0].key);
      }, 1000);

      return () => clearTimeout(startDelay);
    }
  }, [isSimulating]);

  useEffect(() => {
    if (isSimulating && messages.length > 0 && !isGenerating) {
      // Generate next argument after a delay
      const nextAgent = agents[messages.length % agents.length];
      const delay = setTimeout(() => {
        generateArgument(nextAgent.role, nextAgent.key);
      }, 3000 + Math.random() * 2000); // 3-5 seconds between arguments

      return () => clearTimeout(delay);
    }
  }, [isSimulating, messages.length, isGenerating]);

  return (
    <ScrollArea className="h-[500px] pr-4">
      <div className="space-y-4">
        {messages.length === 0 && !isSimulating && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">
              {country === "IT" ? "Premi Inizia per avviare la simulazione" : "Press Start to begin agent simulation"}
            </p>
            <p className="text-sm mt-2">
              {country === "IT" ? "Gli agenti AI si impegneranno in dibattimento legale" : "AI agents will engage in adversarial legal debate"}
            </p>
          </div>
        )}
        
        {messages.length === 0 && isSimulating && isGenerating && (
          <div className="text-center py-20 text-muted-foreground">
            <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-lg">
              {country === "IT" ? "Generazione argomenti AI..." : "Generating AI arguments..."}
            </p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className="animate-fade-in-up"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2 animate-pulse-glow" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className={agentColors[message.role]}>
                    {agentLabels[message.role as keyof typeof agentLabels] || message.agent}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-foreground leading-relaxed">{message.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default AgentDebate;

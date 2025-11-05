import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

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
}

const AgentDebate = ({ isSimulating }: AgentDebateProps) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (isSimulating) {
      const interval = setInterval(() => {
        const randomMessage = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
        const newMessage: Message = {
          id: Date.now(),
          timestamp: new Date(),
          ...randomMessage,
        };
        
        setMessages(prev => [...prev, newMessage].slice(-20)); // Keep last 20 messages
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isSimulating]);

  return (
    <ScrollArea className="h-[500px] pr-4">
      <div className="space-y-4">
        {messages.length === 0 && !isSimulating && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">Press Start to begin agent simulation</p>
            <p className="text-sm mt-2">AI agents will engage in adversarial legal debate</p>
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
                    {message.agent}
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

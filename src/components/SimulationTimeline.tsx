import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { ScenarioCountry } from "@/types/scenario";

interface SimulationTimelineProps {
  country: ScenarioCountry;
}

interface TimelineEvent {
  id: number;
  time: string;
  type: "milestone" | "alert" | "success";
  title: string;
  description: string;
}

const SimulationTimeline = ({ country }: SimulationTimelineProps) => {
  const events: TimelineEvent[] = country === "IT" ? [
    {
      id: 1,
      time: "00:00:12",
      type: "milestone",
      title: "Discussione Iniziale Completata",
      description: "Tutti gli agenti hanno presentato posizioni iniziali",
    },
    {
      id: 2,
      time: "00:02:45",
      type: "alert",
      title: "Contraddizione Prove Rilevata",
      description: "Testimonianza in conflitto con cronologia forense",
    },
    {
      id: 3,
      time: "00:05:18",
      type: "success",
      title: "Vantaggio Strategico Identificato",
      description: "Difesa ha sfruttato lacuna catena di custodia",
    },
    {
      id: 4,
      time: "00:07:32",
      type: "milestone",
      title: "Fase Controesame",
      description: "Credibilità perito contestata",
    },
  ] : [
    {
      id: 1,
      time: "00:00:12",
      type: "milestone",
      title: "Opening Arguments Complete",
      description: "All agents presented initial positions",
    },
    {
      id: 2,
      time: "00:02:45",
      type: "alert",
      title: "Evidence Contradiction Detected",
      description: "Witness testimony conflicts with forensic timeline",
    },
    {
      id: 3,
      time: "00:05:18",
      type: "success",
      title: "Strategic Advantage Identified",
      description: "Defense exploited chain of custody gap",
    },
    {
      id: 4,
      time: "00:07:32",
      type: "milestone",
      title: "Cross-Examination Phase",
      description: "Expert witness credibility challenged",
    },
  ];

  const getIcon = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "milestone":
        return <Clock className="h-4 w-4 text-primary" />;
      case "alert":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-accent" />;
    }
  };

  const getBadgeVariant = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "milestone":
        return "default";
      case "alert":
        return "destructive";
      case "success":
        return "outline";
    }
  };

  return (
    <Card className="bg-card border-border p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-accent" />
        <h2 className="text-2xl font-bold">
          {country === "IT" ? "Cronologia Simulazione" : "Simulation Timeline"}
        </h2>
      </div>

      <div className="space-y-4">
        {events.map((event, index) => (
          <div
            key={event.id}
            className="relative pl-8 pb-4 last:pb-0"
          >
            {/* Timeline line */}
            {index !== events.length - 1 && (
              <div className="absolute left-[11px] top-6 bottom-0 w-[2px] bg-border" />
            )}

            {/* Timeline dot */}
            <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-background border-2 border-border flex items-center justify-center">
              {getIcon(event.type)}
            </div>

            {/* Event content */}
            <div className="bg-background border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-muted-foreground">
                      {event.time}
                    </span>
                    <Badge variant={getBadgeVariant(event.type)} className="text-xs">
                      {event.type}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-sm">{event.title}</h3>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {country === "IT" ? "Durata Totale" : "Total Duration"}
          </span>
          <span className="font-mono font-semibold text-primary">00:07:32</span>
        </div>
      </div>
    </Card>
  );
};

export default SimulationTimeline;

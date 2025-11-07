import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, CheckCircle2, AlertCircle } from "lucide-react";
import { ScenarioCountry } from "@/types/scenario";

interface StrategyPanelProps {
  country: ScenarioCountry;
}

const StrategyPanel = ({ country }: StrategyPanelProps) => {
  const strategies = country === "IT" ? [
    {
      id: 1,
      title: "Contestazione Catena di Custodia",
      probability: 78,
      status: "recommended",
      description: "Sfruttare lacuna di 4 ore nella documentazione delle prove",
      impact: "Alto",
    },
    {
      id: 2,
      title: "Contraddizione Perito",
      probability: 71,
      status: "recommended",
      description: "Evidenziare rischio contaminazione nella perizia forense",
      impact: "Alto",
    },
    {
      id: 3,
      title: "Discrepanza Prove Digitali",
      probability: 64,
      status: "viable",
      description: "Sottolineare conflitti tra testimonianze e log temporali",
      impact: "Medio",
    },
  ] : [
    {
      id: 1,
      title: "Challenge Chain of Custody",
      probability: 78,
      status: "recommended",
      description: "Exploit 4-hour documentation gap in evidence handling",
      impact: "High",
    },
    {
      id: 2,
      title: "Expert Witness Contradiction",
      probability: 71,
      status: "recommended",
      description: "Leverage forensic expert testimony on contamination risk",
      impact: "High",
    },
    {
      id: 3,
      title: "Digital Evidence Discrepancy",
      probability: 64,
      status: "viable",
      description: "Highlight conflicts between testimony and timestamped logs",
      impact: "Medium",
    },
  ];

  return (
    <Card className="bg-card border-border p-6">
      <div className="flex items-center gap-2 mb-6">
        <Target className="h-5 w-5 text-accent" />
        <h2 className="text-2xl font-bold">
          {country === "IT" ? "Strategie Consigliate" : "Recommended Strategies"}
        </h2>
      </div>

      <div className="space-y-4">
        {strategies.map((strategy) => (
          <div
            key={strategy.id}
            className="bg-background border border-border rounded-lg p-5 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-lg">{strategy.title}</h3>
                  {strategy.status === "recommended" ? (
                    <Badge variant="default" className="bg-primary/20 text-primary border-primary">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      {country === "IT" ? "Consigliata" : "Recommended"}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-accent text-accent">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {country === "IT" ? "Valida" : "Viable"}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {strategy.description}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">
                      {country === "IT" ? "Tasso Successo: " : "Success Rate: "}
                    </span>
                    <span className="font-mono font-semibold text-primary">
                      {strategy.probability}%
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      {country === "IT" ? "Impatto: " : "Impact: "}
                    </span>
                    <span className={`font-semibold ${
                      (strategy.impact === "High" || strategy.impact === "Alto") ? "text-accent" : "text-muted-foreground"
                    }`}>
                      {strategy.impact}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            {country === "IT" ? "Nota Strategica:" : "Strategic Note:"}
          </span>{" "}
          {country === "IT" 
            ? "Combinare le strategie #1 e #2 in sequenza aumenta la probabilità di vittoria del 12-15% secondo i dati storici di simulazione."
            : "Combining strategies #1 and #2 in sequence increases overall win probability by 12-15 percentage points based on historical simulation data."}
        </p>
      </div>
    </Card>
  );
};

export default StrategyPanel;

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle } from "lucide-react";
import { ScenarioCountry, formatCurrency } from "@/types/scenario";

interface SimulationStatsProps {
  winProbability: number;
  isSimulating: boolean;
  country: ScenarioCountry;
}

const SimulationStats = ({ winProbability, isSimulating, country }: SimulationStatsProps) => {
  const settlementValue = Math.round((winProbability / 100) * 2500000);
  const riskLevel = winProbability > 70 ? "low" : winProbability > 50 ? "medium" : "high";

  return (
    <div className="space-y-6">
      {/* Win Probability */}
      <Card className="bg-card border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {country === "IT" ? "Probabilità di Vittoria" : "Win Probability"}
          </h3>
          {isSimulating && <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />}
        </div>
        
        <div className="text-center mb-6">
          <div className="text-6xl font-bold font-mono bg-gradient-neural bg-clip-text text-transparent">
            {winProbability.toFixed(1)}%
          </div>
          <div className="flex items-center justify-center gap-2 mt-2 text-sm text-muted-foreground">
            {winProbability > 65 ? (
              <>
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>{country === "IT" ? "Probabilità favorevoli" : "Favorable odds"}</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-4 w-4 text-destructive" />
                <span>{country === "IT" ? "Considerare accordo" : "Consider settlement"}</span>
              </>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">
                {country === "IT" ? "Forza Accusa" : "Prosecution Strength"}
              </span>
              <span className="font-mono">{(100 - winProbability).toFixed(1)}%</span>
            </div>
            <Progress value={100 - winProbability} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">
                {country === "IT" ? "Forza Difesa" : "Defense Strength"}
              </span>
              <span className="font-mono">{winProbability.toFixed(1)}%</span>
            </div>
            <Progress value={winProbability} className="h-2 bg-primary/20" />
          </div>
        </div>
      </Card>

      {/* Settlement Value */}
      <Card className="bg-card border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="h-5 w-5 text-accent" />
          <h3 className="text-lg font-semibold">
            {country === "IT" ? "Accordo Stimato" : "Estimated Settlement"}
          </h3>
        </div>
        
        <div className="text-4xl font-bold font-mono text-accent mb-2">
          {formatCurrency(settlementValue, country)}
        </div>
        <p className="text-sm text-muted-foreground">
          {country === "IT" 
            ? "Basato su probabilità vittoria e analisi valore causa"
            : "Based on current win probability and case value analysis"}
        </p>
      </Card>

      {/* Risk Assessment */}
      <Card className="bg-card border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <h3 className="text-lg font-semibold">
            {country === "IT" ? "Livello di Rischio" : "Risk Level"}
          </h3>
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <div className={`px-4 py-2 rounded-full font-semibold ${
            riskLevel === "low" 
              ? "bg-primary/20 text-primary" 
              : riskLevel === "medium"
              ? "bg-accent/20 text-accent"
              : "bg-destructive/20 text-destructive"
          }`}>
            {country === "IT" 
              ? riskLevel === "low" ? "BASSO" : riskLevel === "medium" ? "MEDIO" : "ALTO"
              : riskLevel.toUpperCase()}
          </div>
          <span className="text-sm text-muted-foreground">
            {country === "IT" ? (
              riskLevel === "low" 
                ? "Procedere a processo" 
                : riskLevel === "medium"
                ? "Valutare opzioni"
                : "Accordo consigliato"
            ) : (
              riskLevel === "low" 
                ? "Proceed to trial" 
                : riskLevel === "medium"
                ? "Evaluate options"
                : "Settlement advised"
            )}
          </span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {country === "IT" ? "Forza Prove" : "Evidence Strength"}
            </span>
            <span className="font-mono">8.2/10</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {country === "IT" ? "Rischio Procedurale" : "Procedural Risk"}
            </span>
            <span className="font-mono">3.1/10</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {country === "IT" ? "Favore Giuria" : "Jury Favorability"}
            </span>
            <span className="font-mono">7.4/10</span>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold mb-4">
          {country === "IT" ? "Metriche Simulazione" : "Simulation Metrics"}
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {country === "IT" ? "Agenti Attivi" : "Active Agents"}
            </span>
            <span className="font-mono text-primary">6</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {country === "IT" ? "Argomenti Analizzati" : "Arguments Analyzed"}
            </span>
            <span className="font-mono">1,247</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {country === "IT" ? "Prove" : "Evidence Items"}
            </span>
            <span className="font-mono">34</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {country === "IT" ? "Precedenti Legali" : "Legal Precedents"}
            </span>
            <span className="font-mono">89</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SimulationStats;

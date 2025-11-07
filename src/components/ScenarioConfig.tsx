import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { FileText, User, Building2, Scale, Globe } from "lucide-react";
import { ScenarioCountry, ScenarioConfig as ScenarioConfigType, getCaseTypes, getJurisdictions, getCurrency } from "@/types/scenario";
import ModelSelector from "@/components/ModelSelector";

interface ScenarioConfigProps {
  onStart: (config: ScenarioConfigType) => void;
  agentModels: Record<string, string>;
  onModelChange: (agent: string, model: string) => void;
}

const ScenarioConfig = ({ onStart, agentModels, onModelChange }: ScenarioConfigProps) => {
  const [country, setCountry] = useState<ScenarioCountry>("US");
  const [caseType, setCaseType] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [caseValue, setCaseValue] = useState(2500000);
  const [evidenceStrength, setEvidenceStrength] = useState(75);
  const [witnessCount, setWitnessCount] = useState(8);
  const [intensity, setIntensity] = useState(3);

  const caseTypes = getCaseTypes(country);
  const jurisdictions = getJurisdictions(country);
  const currency = getCurrency(country);

  const handleStart = () => {
    onStart({
      country,
      caseType: caseType || caseTypes[0].value,
      jurisdiction: jurisdiction || jurisdictions[0].value,
      caseValue,
      evidenceStrength,
      witnessCount,
      intensity,
    });
  };

  return (
    <Card className="bg-card border-border p-6">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold">Configure Scenario</h2>
      </div>

      <div className="space-y-6">
        {/* Country Selection */}
        <div className="space-y-2">
          <Label htmlFor="country" className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            {country === "IT" ? "Paese" : "Country"}
          </Label>
          <Select value={country} onValueChange={(v) => setCountry(v as ScenarioCountry)}>
            <SelectTrigger id="country">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US">🇺🇸 United States</SelectItem>
              <SelectItem value="IT">🇮🇹 Italia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Case Type */}
        <div className="space-y-2">
          <Label htmlFor="case-type" className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-muted-foreground" />
            {country === "IT" ? "Tipo di Causa" : "Case Type"}
          </Label>
          <Select value={caseType} onValueChange={setCaseType}>
            <SelectTrigger id="case-type">
              <SelectValue placeholder={country === "IT" ? "Seleziona tipo" : "Select type"} />
            </SelectTrigger>
            <SelectContent>
              {caseTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Jurisdiction */}
        <div className="space-y-2">
          <Label htmlFor="jurisdiction" className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            {country === "IT" ? "Giurisdizione" : "Jurisdiction"}
          </Label>
          <Select value={jurisdiction} onValueChange={setJurisdiction}>
            <SelectTrigger id="jurisdiction">
              <SelectValue placeholder={country === "IT" ? "Seleziona tribunale" : "Select court"} />
            </SelectTrigger>
            <SelectContent>
              {jurisdictions.map(jur => (
                <SelectItem key={jur.value} value={jur.value}>{jur.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Case Value */}
        <div className="space-y-2">
          <Label htmlFor="case-value">
            {country === "IT" ? "Valore della Causa (EUR)" : "Case Value (USD)"}
          </Label>
          <Input
            id="case-value"
            type="text"
            value={`${currency}${caseValue.toLocaleString(country === "IT" ? "it-IT" : "en-US")}`}
            onChange={(e) => {
              const num = parseInt(e.target.value.replace(/[^0-9]/g, ""));
              if (!isNaN(num)) setCaseValue(num);
            }}
            className="font-mono"
          />
        </div>

        {/* Evidence Strength */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              {country === "IT" ? "Forza delle Prove" : "Evidence Strength"}
            </Label>
            <span className="text-sm font-mono text-primary">{evidenceStrength}%</span>
          </div>
          <Slider value={[evidenceStrength]} onValueChange={(v) => setEvidenceStrength(v[0])} max={100} step={1} className="w-full" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{country === "IT" ? "Debole" : "Weak"}</span>
            <span>{country === "IT" ? "Forte" : "Strong"}</span>
          </div>
        </div>

        {/* Witness Count */}
        <div className="space-y-2">
          <Label htmlFor="witnesses" className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            {country === "IT" ? "Numero di Testimoni" : "Number of Witnesses"}
          </Label>
          <Input
            id="witnesses"
            type="number"
            value={witnessCount}
            onChange={(e) => setWitnessCount(parseInt(e.target.value) || 0)}
            min="1"
            max="20"
          />
        </div>

        {/* Simulation Intensity */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>{country === "IT" ? "Intensità Simulazione" : "Simulation Intensity"}</Label>
            <span className="text-sm font-mono text-accent">
              {intensity === 1 ? (country === "IT" ? "Bassa" : "Low") : 
               intensity === 2 ? (country === "IT" ? "Media" : "Medium") :
               intensity === 3 ? (country === "IT" ? "Alta" : "High") :
               (country === "IT" ? "Massima" : "Maximum")}
            </span>
          </div>
          <Slider value={[intensity]} onValueChange={(v) => setIntensity(v[0])} max={3} step={1} className="w-full" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{country === "IT" ? "Bassa" : "Low"}</span>
            <span>{country === "IT" ? "Media" : "Medium"}</span>
            <span>{country === "IT" ? "Alta" : "High"}</span>
            <span>{country === "IT" ? "Max" : "Maximum"}</span>
          </div>
        </div>
      </div>

      {/* AI Model Configuration for Italian scenarios */}
      {country === "IT" && (
        <div className="mt-6">
          <ModelSelector 
            agentModels={agentModels}
            onModelChange={onModelChange}
          />
        </div>
      )}

      <div className="space-y-6 mt-6">
        {/* Start Button */}
        <Button 
          className="w-full bg-primary hover:bg-primary/90 shadow-glow mt-8" 
          size="lg"
          onClick={handleStart}
        >
          {country === "IT" ? "Inizializza Simulazione" : "Initialize Simulation"}
        </Button>

        {/* Quick Presets */}
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">
            {country === "IT" ? "Preset Rapidi:" : "Quick Presets:"}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              {country === "IT" ? "Standard" : "Standard"}
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              {country === "IT" ? "Complesso" : "Complex"}
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              {country === "IT" ? "Alto Rischio" : "High Stakes"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ScenarioConfig;

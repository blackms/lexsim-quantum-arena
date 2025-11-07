import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { FileText, User, Building2, Scale } from "lucide-react";

interface ScenarioConfigProps {
  onStart: () => void;
}

const ScenarioConfig = ({ onStart }: ScenarioConfigProps) => {
  return (
    <Card className="bg-card border-border p-6">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold">Configure Scenario</h2>
      </div>

      <div className="space-y-6">
        {/* Case Type */}
        <div className="space-y-2">
          <Label htmlFor="case-type" className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-muted-foreground" />
            Case Type
          </Label>
          <Select defaultValue="criminal">
            <SelectTrigger id="case-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="criminal">Criminal Case</SelectItem>
              <SelectItem value="civil">Civil Litigation</SelectItem>
              <SelectItem value="corporate">Corporate Dispute</SelectItem>
              <SelectItem value="ip">Intellectual Property</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Jurisdiction */}
        <div className="space-y-2">
          <Label htmlFor="jurisdiction" className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            Jurisdiction
          </Label>
          <Select defaultValue="federal">
            <SelectTrigger id="jurisdiction">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="federal">Federal Court</SelectItem>
              <SelectItem value="state">State Court</SelectItem>
              <SelectItem value="appellate">Appellate Court</SelectItem>
              <SelectItem value="supreme">Supreme Court</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Case Value */}
        <div className="space-y-2">
          <Label htmlFor="case-value">Case Value (USD)</Label>
          <Input
            id="case-value"
            type="text"
            defaultValue="$2,500,000"
            className="font-mono"
          />
        </div>

        {/* Evidence Strength */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              Evidence Strength
            </Label>
            <span className="text-sm font-mono text-primary">75%</span>
          </div>
          <Slider defaultValue={[75]} max={100} step={1} className="w-full" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Weak</span>
            <span>Strong</span>
          </div>
        </div>

        {/* Witness Count */}
        <div className="space-y-2">
          <Label htmlFor="witnesses" className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            Number of Witnesses
          </Label>
          <Input
            id="witnesses"
            type="number"
            defaultValue="8"
            min="1"
            max="20"
          />
        </div>

        {/* Simulation Intensity */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Simulation Intensity</Label>
            <span className="text-sm font-mono text-accent">High</span>
          </div>
          <Slider defaultValue={[3]} max={3} step={1} className="w-full" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
            <span>Maximum</span>
          </div>
        </div>

        {/* Start Button */}
        <Button 
          className="w-full bg-primary hover:bg-primary/90 shadow-glow mt-8" 
          size="lg"
          onClick={onStart}
        >
          Initialize Simulation
        </Button>

        {/* Quick Presets */}
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">Quick Presets:</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              Standard
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Complex
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              High Stakes
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ScenarioConfig;

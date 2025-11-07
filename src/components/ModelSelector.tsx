import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain } from "lucide-react";
import { availableModels, defaultAgentModels } from "@/types/aiModels";

interface ModelSelectorProps {
  agentModels: Record<string, string>;
  onModelChange: (agent: string, model: string) => void;
}

const ModelSelector = ({ agentModels, onModelChange }: ModelSelectorProps) => {
  const agents = [
    { key: "pm", label: "Pubblico Ministero" },
    { key: "difesa", label: "Difesa" },
    { key: "giudice", label: "Giudice" },
    { key: "perito", label: "Perito" },
    { key: "testimone", label: "Testimone" },
  ];

  return (
    <Card className="bg-card border-border p-6">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold">Configurazione Modelli AI</h2>
      </div>

      <div className="space-y-4">
        {agents.map((agent) => (
          <div key={agent.key} className="space-y-2">
            <Label htmlFor={`model-${agent.key}`} className="text-sm font-medium">
              {agent.label}
            </Label>
            <Select
              value={agentModels[agent.key] || defaultAgentModels[agent.key]}
              onValueChange={(value) => onModelChange(agent.key, value)}
            >
              <SelectTrigger id={`model-${agent.key}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map((model) => (
                  <SelectItem key={model.value} value={model.value}>
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Nota:</span> I modelli vengono eseguiti tramite OpenRouter.
          Ogni modello ha caratteristiche diverse in termini di velocità, costo e qualità.
        </p>
      </div>
    </Card>
  );
};

export default ModelSelector;

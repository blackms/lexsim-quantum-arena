import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ModelSelector from "@/components/ModelSelector";
import { ScenarioCountry } from "@/types/scenario";

interface ModelSelectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentModels: Record<string, string>;
  onModelChange: (agent: string, model: string) => void;
  country?: ScenarioCountry;
}

const ModelSelectorDialog = ({ open, onOpenChange, agentModels, onModelChange, country = "IT" }: ModelSelectorDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {country === "IT" ? "Configurazione Modelli AI" : "AI Models Configuration"}
          </DialogTitle>
        </DialogHeader>
        <ModelSelector 
          agentModels={agentModels}
          onModelChange={onModelChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ModelSelectorDialog;

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ModelSelector from "@/components/ModelSelector";

interface ModelSelectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentModels: Record<string, string>;
  onModelChange: (agent: string, model: string) => void;
}

const ModelSelectorDialog = ({ open, onOpenChange, agentModels, onModelChange }: ModelSelectorDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Configurazione Modelli AI</DialogTitle>
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

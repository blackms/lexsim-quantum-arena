import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/lexsim-logo.png";
import AgentDebate from "@/components/AgentDebate";
import SimulationStats from "@/components/SimulationStats";
import StrategyPanel from "@/components/StrategyPanel";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSimulating, setIsSimulating] = useState(false);
  const [scenariosRun, setScenariosRun] = useState(0);
  const [winProbability, setWinProbability] = useState(67);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating) {
      interval = setInterval(() => {
        setScenariosRun(prev => prev + Math.floor(Math.random() * 5 + 8));
        setWinProbability(prev => {
          const change = (Math.random() - 0.5) * 4;
          return Math.max(45, Math.min(85, prev + change));
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  const handleReset = () => {
    setIsSimulating(false);
    setScenariosRun(0);
    setWinProbability(67);
  };

  return (
    <div className="min-h-screen bg-background font-['Inter']">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <img src={logoImage} alt="LexSim" className="h-8 w-8" />
            <span className="text-xl font-bold bg-gradient-neural bg-clip-text text-transparent">
              LexSim
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right mr-4">
              <div className="text-sm text-muted-foreground">Scenarios Run</div>
              <div className="text-2xl font-mono font-bold text-primary">{scenariosRun}</div>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={handleReset}
              className="border-muted-foreground/30"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            
            <Button
              size="lg"
              onClick={() => setIsSimulating(!isSimulating)}
              className={
                isSimulating
                  ? "bg-destructive hover:bg-destructive/90"
                  : "bg-primary hover:bg-primary/90 shadow-glow"
              }
            >
              {isSimulating ? (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Start
                </>
              )}
            </Button>
            
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Agent Debate */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card border-border p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                Live Agent Debate
              </h2>
              <AgentDebate isSimulating={isSimulating} />
            </Card>

            <StrategyPanel />
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-6">
            <SimulationStats 
              winProbability={winProbability} 
              isSimulating={isSimulating}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

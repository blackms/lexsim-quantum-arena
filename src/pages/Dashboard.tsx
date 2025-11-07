import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Settings, FileText, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/lexsim-logo.png";
import AgentDebate from "@/components/AgentDebate";
import SimulationStats from "@/components/SimulationStats";
import StrategyPanel from "@/components/StrategyPanel";
import ScenarioConfig from "@/components/ScenarioConfig";
import SimulationTimeline from "@/components/SimulationTimeline";
import ModelSelector from "@/components/ModelSelector";
import { ScenarioCountry, ScenarioConfig as ScenarioConfigType } from "@/types/scenario";
import { defaultAgentModels } from "@/types/aiModels";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSimulating, setIsSimulating] = useState(false);
  const [scenariosRun, setScenariosRun] = useState(0);
  const [winProbability, setWinProbability] = useState(67);
  const [hasStarted, setHasStarted] = useState(false);
  const [simulationTime, setSimulationTime] = useState(0);
  const [scenario, setScenario] = useState<ScenarioConfigType | null>(null);
  const [agentModels, setAgentModels] = useState<Record<string, string>>(defaultAgentModels);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating) {
      interval = setInterval(() => {
        setScenariosRun(prev => prev + Math.floor(Math.random() * 5 + 8));
        setWinProbability(prev => {
          const change = (Math.random() - 0.5) * 4;
          return Math.max(45, Math.min(85, prev + change));
        });
        setSimulationTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  const handleReset = () => {
    setIsSimulating(false);
    setScenariosRun(0);
    setWinProbability(67);
    setHasStarted(false);
    setSimulationTime(0);
    setScenario(null);
  };

  const handleStart = (config: ScenarioConfigType) => {
    setScenario(config);
    setHasStarted(true);
    setIsSimulating(true);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background font-['Inter']">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
              <img src={logoImage} alt="LexSim" className="h-8 w-8" />
              <span className="text-xl font-bold bg-gradient-neural bg-clip-text text-transparent">
                LexSim
              </span>
            </div>
            
            {hasStarted && (
              <div className="flex items-center gap-6">
                {/* Simulation Time */}
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">Duration</div>
                  <div className="text-lg font-mono font-bold text-accent">{formatTime(simulationTime)}</div>
                </div>

                {/* Scenarios Count */}
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">Scenarios</div>
                  <div className="text-lg font-mono font-bold text-primary">{scenariosRun.toLocaleString()}</div>
                </div>

                {/* Win Rate */}
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">Win Rate</div>
                  <div className="text-lg font-mono font-bold text-foreground">{winProbability.toFixed(1)}%</div>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-3">
              {hasStarted && (
                <>
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
                        Resume
                      </>
                    )}
                  </Button>
                </>
              )}
              
              <Button variant="ghost" size="icon" onClick={() => setShowSettings(!showSettings)}>
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {!hasStarted ? (
          // Configuration View
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 animate-fade-in-up">
              <h1 className="text-4xl font-bold mb-3">
                Configure Your{" "}
                <span className="bg-gradient-neural bg-clip-text text-transparent">
                  Simulation
                </span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Set case parameters and initialize multi-agent analysis
              </p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <ScenarioConfig onStart={handleStart} />
            </div>
          </div>
        ) : (
          // Simulation View
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Debate & Strategies */}
            <div className={`${showSettings ? 'lg:col-span-2' : 'lg:col-span-2'} space-y-6`}>
              {/* Model Settings Panel (only for IT scenarios) */}
              {showSettings && scenario?.country === "IT" && (
                <ModelSelector 
                  agentModels={agentModels}
                  onModelChange={(agent, model) => {
                    setAgentModels(prev => ({ ...prev, [agent]: model }));
                  }}
                />
              )}

              <Card className="bg-card border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-primary animate-pulse-glow' : 'bg-muted'}`} />
                    {scenario?.country === "IT" ? "Dibattimento Agenti AI" : "Live AI Agent Debate"}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Activity className="h-4 w-4" />
                    <span>{isSimulating ? (scenario?.country === "IT" ? "Attivo" : "Active") : (scenario?.country === "IT" ? "In Pausa" : "Paused")}</span>
                  </div>
                </div>
                <AgentDebate 
                  isSimulating={isSimulating} 
                  country={scenario?.country || "US"}
                  caseType={scenario?.caseType}
                  evidenceStrength={scenario?.evidenceStrength}
                  agentModels={agentModels}
                />
              </Card>

              <StrategyPanel country={scenario?.country || "US"} />
            </div>

            {/* Right Column - Stats & Timeline */}
            <div className="space-y-6">
              <SimulationStats 
                winProbability={winProbability} 
                isSimulating={isSimulating}
                country={scenario?.country || "US"}
              />
              <SimulationTimeline country={scenario?.country || "US"} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

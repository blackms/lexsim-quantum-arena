import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Scale, Zap, Network } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-neural-justice.jpg";
import logoImage from "@/assets/lexsim-logo.png";

const Index = () => {
  const navigate = useNavigate();
  const [isSimulating] = useState(false);

  return (
    <div className="min-h-screen bg-background font-['Inter']">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="LexSim" className="h-10 w-10" />
            <span className="text-2xl font-bold bg-gradient-neural bg-clip-text text-transparent">
              LexSim
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <Button
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => navigate("/dashboard")}
            >
              Launch Simulator
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/30 mb-4">
              <span className="text-primary font-mono text-sm">Multi-Agent Legal Intelligence</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              The Law,{" "}
              <span className="bg-gradient-neural bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
                Simulated
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Harness intelligent agents powered by advanced AI to simulate thousands of trial scenarios per hour. 
              Predict outcomes, optimize strategies, and master legal complexity.
            </p>
            
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow group"
                onClick={() => navigate("/dashboard")}
              >
                Start Simulation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary font-mono">1000+</div>
                <div className="text-sm text-muted-foreground mt-1">Scenarios/Hour</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent font-mono">94%</div>
                <div className="text-sm text-muted-foreground mt-1">Prediction Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary font-mono">6</div>
                <div className="text-sm text-muted-foreground mt-1">AI Agents</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 bg-gradient-subtle">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Intelligence at Scale</h2>
            <p className="text-muted-foreground text-lg">
              Advanced AI agents working in concert to predict legal outcomes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Brain className="h-8 w-8" />}
              title="Multi-Agent System"
              description="Prosecution, defense, judge, witnesses, and experts debate strategies in real-time"
            />
            <FeatureCard
              icon={<Network className="h-8 w-8" />}
              title="HRL Optimization"
              description="Hierarchical reinforcement learning adapts strategies based on evidence patterns"
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Rapid Simulation"
              description="Generate thousands of trial scenarios per hour with variable parameters"
            />
            <FeatureCard
              icon={<Scale className="h-8 w-8" />}
              title="Predictive Analytics"
              description="Probability heatmaps, risk curves, and cost-benefit analysis for strategic decisions"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          
          <div className="space-y-12">
            <ProcessStep
              number="01"
              title="Define Case Parameters"
              description="Input evidence, witnesses, legal precedents, and strategic objectives"
            />
            <ProcessStep
              number="02"
              title="Deploy AI Agents"
              description="Six specialized agents assume roles: prosecution, defense, judge, witnesses, and expert witnesses"
            />
            <ProcessStep
              number="03"
              title="Adversarial Simulation"
              description="Agents engage in structured debate, applying legal reasoning and procedural strategy"
            />
            <ProcessStep
              number="04"
              title="Outcome Analysis"
              description="Review probability distributions, strategic recommendations, and settlement values"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-card border-t border-b border-border">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Simulate?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join legal strategists worldwide using AI to predict outcomes and optimize case strategy
          </p>
          <Button 
            size="lg"
            className="bg-gradient-neural hover:opacity-90 text-white shadow-gold"
            onClick={() => navigate("/dashboard")}
          >
            Access Simulator
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src={logoImage} alt="LexSim" className="h-6 w-6" />
            <span className="font-semibold text-foreground">LexSim</span>
          </div>
          <p className="text-sm">© 2025 LexSim. Multi-Agent Legal Intelligence System.</p>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="bg-card border border-border rounded-lg p-6 hover:shadow-glow transition-all duration-300 group">
    <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
}

const ProcessStep = ({ number, title, description }: ProcessStepProps) => (
  <div className="flex gap-6 items-start">
    <div className="flex-shrink-0">
      <div className="w-16 h-16 rounded-full bg-gradient-neural flex items-center justify-center text-white font-mono font-bold text-xl shadow-glow">
        {number}
      </div>
    </div>
    <div className="flex-1 pt-2">
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default Index;

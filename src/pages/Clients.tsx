import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/lexsim-logo.png";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Globe, Award } from "lucide-react";

// Import client logos
import bakerMckenzie from "@/assets/clients/baker-mckenzie.png";
import cliffordChance from "@/assets/clients/clifford-chance.png";
import linklaters from "@/assets/clients/linklaters.png";
import lathamWatkins from "@/assets/clients/latham-watkins.png";
import dlaPiper from "@/assets/clients/dla-piper.png";
import bongiorno from "@/assets/clients/bongiorno.png";
import allenOvery from "@/assets/clients/allen-overy.png";
import freshfields from "@/assets/clients/freshfields.png";

const Clients = () => {
  const navigate = useNavigate();

  const clients = [
    { name: "Baker McKenzie", logo: bakerMckenzie, region: "Global" },
    { name: "Clifford Chance", logo: cliffordChance, region: "Magic Circle" },
    { name: "Linklaters", logo: linklaters, region: "Magic Circle" },
    { name: "Allen & Overy", logo: allenOvery, region: "Magic Circle" },
    { name: "Freshfields", logo: freshfields, region: "Magic Circle" },
    { name: "Latham & Watkins", logo: lathamWatkins, region: "White Shoe" },
    { name: "DLA Piper", logo: dlaPiper, region: "Global" },
    { name: "Studio Bongiorno", logo: bongiorno, region: "Italy" },
  ];

  const testimonials = [
    {
      quote: "LexSim has transformed our strategic approach to complex litigation. The multi-agent simulation provides insights that would take our team months to develop.",
      author: "Sarah Mitchell",
      position: "Head of Litigation Strategy",
      firm: "Baker McKenzie",
    },
    {
      quote: "The predictive accuracy is remarkable. We've increased our settlement success rate by 34% since implementing LexSim in our pre-trial analysis workflow.",
      author: "James Chen",
      position: "Partner, Dispute Resolution",
      firm: "Clifford Chance",
    },
    {
      quote: "As a boutique firm competing with larger practices, LexSim gives us enterprise-level strategic intelligence. It's leveled the playing field.",
      author: "Marco Bongiorno",
      position: "Managing Partner",
      firm: "Studio Bongiorno",
    },
  ];

  const stats = [
    { icon: <Building2 className="h-8 w-8" />, value: "200+", label: "Law Firms" },
    { icon: <Globe className="h-8 w-8" />, value: "45", label: "Countries" },
    { icon: <Award className="h-8 w-8" />, value: "94%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="min-h-screen bg-background font-['Inter']">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <img src={logoImage} alt="LexSim" className="h-10 w-10" />
            <span className="text-2xl font-bold bg-gradient-neural bg-clip-text text-transparent">
              LexSim
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="/#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <button 
              onClick={() => navigate("/clients")}
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Clients
            </button>
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
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/30 mb-6">
            <span className="text-primary font-mono text-sm">Trusted by Leading Legal Minds</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Powering Strategic Decisions at{" "}
            <span className="bg-gradient-neural bg-clip-text text-transparent">
              Elite Law Firms
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            From Magic Circle firms in London to White Shoe practices in New York, 
            leading legal strategists worldwide rely on LexSim for outcome prediction and case analysis.
          </p>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold font-mono mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos Grid */}
      <section className="py-16 px-6 bg-gradient-subtle">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Trusted by Global Legal Leaders
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {clients.map((client, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg flex items-center justify-center hover:shadow-glow transition-all duration-300 group"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Legal Leaders Say</h2>
            <p className="text-muted-foreground text-lg">
              Real results from firms using LexSim for strategic advantage
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-8 hover:shadow-glow transition-all duration-300"
              >
                <div className="mb-6">
                  <div className="text-6xl text-primary/20 font-serif leading-none mb-4">"</div>
                  <p className="text-foreground leading-relaxed">{testimonial.quote}</p>
                </div>
                
                <div className="border-t border-border pt-4">
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.position}</div>
                  <div className="text-sm text-primary font-medium mt-1">{testimonial.firm}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 bg-card border-t border-b border-border">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-center mb-12">How Firms Use LexSim</h2>
          
          <div className="space-y-8">
            <UseCase
              title="Pre-Trial Strategy Development"
              description="Simulate thousands of trial scenarios to identify optimal arguments, witness orders, and evidence presentation strategies before entering the courtroom."
              firms={["Clifford Chance", "Latham & Watkins"]}
            />
            <UseCase
              title="Settlement Value Optimization"
              description="Generate probabilistic outcome distributions and expected value calculations to inform settlement negotiations with data-driven confidence."
              firms={["Baker McKenzie", "DLA Piper"]}
            />
            <UseCase
              title="Risk Assessment for Complex Litigation"
              description="Evaluate procedural risks, evidence strength, and jury favorability across multiple jurisdictions for international disputes."
              firms={["Allen & Overy", "Linklaters"]}
            />
            <UseCase
              title="Competitive Intelligence"
              description="Analyze opposing counsel's historical strategies and predict likely approaches based on pattern recognition across thousands of cases."
              firms={["Freshfields", "Studio Bongiorno"]}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Join Leading Legal Strategists</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Experience the multi-agent simulation technology that's transforming how elite firms approach complex litigation
          </p>
          <Button 
            size="lg"
            className="bg-gradient-neural hover:opacity-90 text-white shadow-gold"
            onClick={() => navigate("/dashboard")}
          >
            Request Demo
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

interface UseCaseProps {
  title: string;
  description: string;
  firms: string[];
}

const UseCase = ({ title, description, firms }: UseCaseProps) => (
  <div className="bg-background border border-border rounded-lg p-8">
    <h3 className="text-2xl font-semibold mb-3">{title}</h3>
    <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">Used by:</span>
      {firms.map((firm, index) => (
        <span key={index}>
          <span className="text-primary font-medium">{firm}</span>
          {index < firms.length - 1 && <span className="text-muted-foreground">, </span>}
        </span>
      ))}
    </div>
  </div>
);

export default Clients;

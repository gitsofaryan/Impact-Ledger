import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Leaf,
  FileSpreadsheet,
  AlertTriangle,
  Clock,
  Lock,
  Cpu,
  ShieldCheck,
  ArrowRight,
  Wallet,
  Upload,
  CheckCircle2,
  Github,
  ExternalLink,
  ChevronRight,
  Linkedin,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

// Animated Section wrapper
function AnimatedSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 3D Visual Component
function HeroVisual() {
  return (
    <div className="relative w-full h-[400px] lg:h-[500px]">
      {/* Glowing orb background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-emerald/20 to-emerald/5 blur-3xl animate-pulse" />
      </div>

      {/* Floating chain/leaf visualization */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Chain links transforming */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-20 lg:-inset-32"
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 border-emerald/40"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${i * 60}deg) translateY(-80px) lg:translateY(-120px)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>

          {/* Central leaf/shield icon */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotateY: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10"
          >
            <div className="w-32 h-32 lg:w-44 lg:h-44 rounded-3xl bg-gradient-to-br from-navy-medium to-navy-deep shadow-2xl flex items-center justify-center border border-emerald/20">
              <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-2xl emerald-gradient flex items-center justify-center shadow-lg glow-emerald">
                <Leaf className="w-10 h-10 lg:w-14 lg:h-14 text-accent-foreground" />
              </div>
            </div>
          </motion.div>

          {/* Floating data points */}
          {[
            { icon: ShieldCheck, label: "Verified", pos: "top-0 -right-16 lg:-right-24" },
            { icon: Lock, label: "Immutable", pos: "bottom-4 -left-20 lg:-left-28" },
            { icon: Cpu, label: "AI Audit", pos: "-bottom-8 right-0 lg:-right-8" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
              className={cn(
                "absolute px-3 py-2 rounded-xl bg-card/90 backdrop-blur-sm border border-border shadow-lg flex items-center gap-2",
                item.pos
              )}
            >
              <item.icon className="w-4 h-4 text-emerald" />
              <span className="text-xs font-medium">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Problem Card Component
function ProblemCard({ icon: Icon, title, description, delay }: { icon: any; title: string; description: string; delay: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      transition={{ delay }}
      className="flex flex-col items-center text-center p-6"
    >
      <div className="w-14 h-14 rounded-2xl bg-navy-medium/80 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-amber-400" />
      </div>
      <h3 className="font-semibold text-lg text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
  );
}

// Solution Feature Card
function FeatureCard({ icon: Icon, title, description, index }: { icon: any; title: string; description: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={scaleIn}
      transition={{ delay: index * 0.15 }}
    >
      <Card className="h-full bg-card hover:shadow-xl transition-all duration-300 border-border/50 hover:border-emerald/30 group overflow-hidden">
        <CardContent className="p-8">
          <div className="w-14 h-14 rounded-2xl emerald-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <Icon className="w-7 h-7 text-accent-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-foreground">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Step Component
function Step({ number, title, description, icon: Icon, isLast }: { number: number; title: string; description: string; icon: any; isLast?: boolean }) {
  return (
    <div className="flex flex-col items-center text-center relative">
      {/* Connector line */}
      {!isLast && (
        <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5 bg-gradient-to-r from-emerald/50 to-emerald/20" />
      )}

      {/* Step circle */}
      <div className="w-20 h-20 rounded-full navy-gradient flex items-center justify-center mb-6 shadow-xl relative z-10 border-2 border-emerald/30">
        <Icon className="w-8 h-8 text-emerald" />
      </div>

      {/* Step number badge */}
      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full emerald-gradient flex items-center justify-center text-sm font-bold text-accent-foreground shadow-lg">
        {number}
      </div>

      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm max-w-[200px]">{description}</p>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl emerald-gradient flex items-center justify-center shadow-lg">
                <Leaf className="w-6 h-6 text-accent-foreground" />
              </div>
              <span className="font-bold text-xl">Impact Ledger</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#problem" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">Problem</a>
              <a href="#solution" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">Solution</a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">How It Works</a>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <a href="https://docs.google.com/document/d/1y3NTvdnjoWpt7JFDY1fNT-WMFGcrIAWCRn57IBbzWms/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
                  Docs
                </a>
              </Button>
              <Button size="sm" className="emerald-gradient" asChild>
                <Link to="/dashboard">
                  Launch App
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald/10 border border-emerald/20 text-emerald text-sm font-medium">
                <ShieldCheck className="w-4 h-4" />
                Blockchain-Verified ESG Lending
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                The Trust Layer for{" "}
                <span className="bg-gradient-to-r from-emerald to-emerald-soft bg-clip-text text-transparent">
                  Sustainable Finance
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-muted-foreground max-w-lg leading-relaxed">
                Eliminate greenwashing with blockchain-verified ESG lending. We track every dollar from bank transfer to carbon reduction.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="emerald-gradient text-base h-14 px-8 shadow-xl hover:shadow-emerald/25 transition-shadow" asChild>
                  <Link to="/dashboard">
                    Launch App
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base h-14 px-8 border-2" asChild>
                  <a href="https://docs.google.com/document/d/1y3NTvdnjoWpt7JFDY1fNT-WMFGcrIAWCRn57IBbzWms/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
                    View Documentation
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                  Built on Polygon
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                  AI-Powered
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                  Enterprise Ready
                </div>
              </div>
            </motion.div>

            {/* Right visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <HeroVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Strip */}
      <section id="problem" className="py-20 bg-secondary/70 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Trillions in Green Loans.{" "}
              <span className="text-muted-foreground">Zero Transparency.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The sustainable finance industry is plagued by trust issues that cost billions annually.
            </p>
          </AnimatedSection>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            <ProblemCard
              icon={FileSpreadsheet}
              title="Fragmented Data"
              description="Spreadsheets and PDFs scattered across systems. Impossible to audit, easy to manipulate."
              delay={0}
            />
            <ProblemCard
              icon={AlertTriangle}
              title="Greenwashing Risk"
              description="40% of green claims are unverified. Investors can't distinguish real impact from marketing."
              delay={0.15}
            />
            <ProblemCard
              icon={Clock}
              title="Manual Audits"
              description="Verification takes months, not seconds. By the time you know, the damage is done."
              delay={0.3}
            />
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald/10 border border-emerald/20 text-emerald text-sm font-medium mb-6">
              <Cpu className="w-4 h-4" />
              The Impact Ledger Solution
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Trust, Built Into Every Transaction
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our platform combines smart contracts, AI verification, and immutable records to create unprecedented transparency.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <FeatureCard
              icon={Lock}
              title="Smart Escrow"
              description="Funds are released strictly upon milestone verification. No impact? No payout. Smart contracts ensure accountability at every step."
              index={0}
            />
            <FeatureCard
              icon={Cpu}
              title="AI-Powered Audit"
              description="Computer vision validates site photos and invoices instantly. Our AI catches discrepancies humans would miss in seconds."
              index={1}
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Immutable Record"
              description="Built on Polygon. An unchangeable audit trail for regulators and investors. Every transaction, every proof, forever verified."
              index={2}
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 lg:py-32 bg-gradient-to-b from-background to-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From capital deployment to verified impact in three simple steps.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
              <Step
                number={1}
                icon={Wallet}
                title="Deploy Capital"
                description="Lender deploys capital to Smart Contract. Funds are locked until milestones are met."
              />
              <Step
                number={2}
                icon={Upload}
                title="Upload Proof"
                description="Borrower uploads proof—drone shots, invoices, site photos—directly to the platform."
              />
              <Step
                number={3}
                icon={CheckCircle2}
                title="Verify & Release"
                description="AI verifies proof instantly. Blockchain releases funds automatically upon approval."
                isLast
              />
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection delay={0.4} className="text-center mt-20">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 rounded-2xl bg-card border border-border shadow-xl">
              <div className="text-left">
                <h3 className="font-bold text-xl mb-1">Ready to eliminate greenwashing?</h3>
                <p className="text-muted-foreground">Join the future of transparent sustainable finance.</p>
              </div>
              <Button size="lg" className="emerald-gradient h-12 px-8 shrink-0" asChild>
                <Link to="/dashboard">
                  Get Started
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-navy-deep text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl emerald-gradient flex items-center justify-center">
                <Leaf className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <span className="font-bold text-lg">Impact Ledger</span>
                <p className="text-sm text-primary-foreground/60">Built for the LMA Edge Hackathon</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/gitsofaryan/Impact-Ledger"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
              <a
                href="https://lmaedgehackathon.devpost.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                <span className="text-sm font-medium">Devpost</span>
              </a>
              <a
                href="https://www.linkedin.com/in/aryan-jain07/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span className="text-sm font-medium">Developer</span>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/50">
            © 2025 Impact Ledger. Blockchain-verified sustainable finance.
          </div>
        </div>
      </footer>
    </div>
  );
}

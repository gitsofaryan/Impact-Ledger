import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MilestoneTracker } from "@/components/loans/MilestoneTracker";
import { EvidenceVault } from "@/components/loans/EvidenceVault";
import { BlockchainTable } from "@/components/loans/BlockchainTable";
import { VerifyProofButton } from "@/components/loans/VerifyProofButton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Leaf,
  ShieldCheck,
  Upload,
  Scan,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const loanData = {
  id: "LN-2024-0042",
  borrowerName: "SolarTech Industries",
  projectName: "Project Sunrise - Solar Farm Expansion",
  location: "Nevada, USA",
  amount: "$2,500,000",
  greenStatus: "Verified",
  startDate: "October 15, 2024",
  expectedCompletion: "March 30, 2025",
  co2Impact: "850 tons/year",
};

// --- Verification Simulator Component ---
function VerificationSimulator({ onClose, phase }: { onClose: () => void; phase: string }) {
  const [step, setStep] = useState<"upload" | "scanning" | "verifying" | "success">("upload");
  const [scanProgress, setScanProgress] = useState(0);
  const [visionLogs, setVisionLogs] = useState<string[]>([]);

  // Custom logs based on phase
  const getLogs = (phase: string) => {
    if (phase.includes("Construction")) {
      return [
        "Analyzing construction site structure...",
        "Verifying beam placement safety...",
        "Checking materials against invoice #892...",
        "Progress match: 94% with blueprint...",
        "Construction Milestone Verified."
      ];
    }
    return [
      "Detecting solar panel arrays...",
      "Verifying thermal efficiency...",
      "Reading energy output from meter...",
      "Cross-ref with local grid data...",
      "Energy Generation Milestone Verified."
    ];
  };

  useEffect(() => {
    if (step === "scanning") {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStep("verifying");
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      const logs = getLogs(phase).map((text, i) => ({
        progress: 10 + (i * 20),
        text
      }));

      logs.forEach((log) => {
        setTimeout(() => {
          setVisionLogs((prev) => [...prev, log.text]);
        }, (log.progress / 100) * 2500);
      });

      return () => clearInterval(interval);
    }

    if (step === "verifying") {
      const timeout = setTimeout(() => {
        setStep("success");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [step, phase]);

  return (
    <div className="w-full max-w-lg mx-auto p-6 space-y-8 bg-card">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Verifying {phase}</h2>
        <p className="text-muted-foreground text-sm">Upload evidence to trigger Smart Contract release.</p>
      </div>

      <div className="relative min-h-[300px] flex items-center justify-center rounded-2xl border-2 border-dashed border-border bg-secondary/20 overflow-hidden">
        {step === "upload" && (
          <div className="text-center p-8 space-y-4 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald/10 flex items-center justify-center mx-auto mb-4">
              <Upload className="w-10 h-10 text-emerald" />
            </div>
            <div>
              <p className="font-semibold text-lg">Drop site photos using drone</p>
              <p className="text-sm text-muted-foreground mt-1">supports .jpg, .png, .pdf</p>
            </div>
            <Button size="lg" className="mt-4 emerald-gradient" onClick={() => setStep("scanning")}>
              Select Files
            </Button>
          </div>
        )}

        {step === "scanning" && (
          <div className="w-full h-full absolute inset-0 bg-black/90 text-white p-6 flex flex-col items-center justify-center font-mono">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[linear-gradient(0deg,transparent_24%,rgba(16,185,129,0.3)_25%,rgba(16,185,129,0.3)_26%,transparent_27%,transparent_74%,rgba(16,185,129,0.3)_75%,rgba(16,185,129,0.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(16,185,129,0.3)_25%,rgba(16,185,129,0.3)_26%,transparent_27%,transparent_74%,rgba(16,185,129,0.3)_75%,rgba(16,185,129,0.3)_76%,transparent_77%,transparent)] bg-[length:50px_50px]" />
            <div className="absolute inset-0 z-10 animate-scan bg-gradient-to-t from-emerald/50 to-transparent h-1/4 w-full border-b-2 border-emerald shadow-[0_0_15px_rgba(16,185,129,0.7)]" />

            <div className="relative z-20 w-full space-y-6">
              <div className="flex items-center justify-center gap-3">
                <Scan className="w-8 h-8 text-emerald animate-pulse" />
                <span className="text-xl font-bold text-emerald tracking-widest">ANALYZING</span>
              </div>

              <div className="space-y-1 text-xs md:text-sm text-emerald/80 h-[100px] overflow-hidden border-l-2 border-emerald/30 pl-3">
                {visionLogs.map((log, i) => (
                  <p key={i} className="animate-in slide-in-from-left-2 fade-in">
                    <span className="opacity-50">[{new Date().toLocaleTimeString()}]</span> {log}
                  </p>
                ))}
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-emerald/60">
                  <span>Processing Visual Data</span>
                  <span>{scanProgress}%</span>
                </div>
                <Progress value={scanProgress} className="h-1 bg-emerald/20" />
              </div>
            </div>
          </div>
        )}

        {step === "verifying" && (
          <div className="text-center p-8 space-y-6 animate-in fade-in duration-500">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-emerald/20" />
              <div className="absolute inset-0 rounded-full border-4 border-emerald border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <ShieldCheck className="w-10 h-10 text-emerald" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-xl">Updates Smart Contract</h3>
              <p className="text-muted-foreground text-sm">Minting verification proof to Polygon Network...</p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-mono">
              <Loader2 className="w-3 h-3 animate-spin" />
              0x71C...93F2
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="text-center p-8 space-y-6 animate-in zoom-in-50 duration-500">
            <div className="w-24 h-24 rounded-full bg-emerald flex items-center justify-center mx-auto shadow-xl shadow-emerald/40 animate-check">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-2xl text-emerald-700 dark:text-emerald-400">Verified!</h3>
              <p className="text-muted-foreground">{phase} marked as Completed.</p>
            </div>

            <Button className="w-full mt-4" variant="outline" onClick={onClose}>
              Close & Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

const LoanDetail = () => {
  const { loanId } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // State for sequential phase progress
  const [activePhaseIndex, setActivePhaseIndex] = useState(1); // Start at Phase 2 (index 1)
  const phases = [
    { id: "1", label: "Phase 1: Funded", date: "Oct 15, 2024" },
    { id: "2", label: "Phase 2: Construction", date: "Dec 10, 2024" },
    { id: "3", label: "Phase 3: Energy Gen", date: "Mar 2025" },
  ];

  const currentPhase = phases[activePhaseIndex];
  const isAllComplete = activePhaseIndex >= phases.length;

  const handleClose = () => {
    setIsDialogOpen(false);
    // Move to next phase
    setActivePhaseIndex(prev => Math.min(prev + 1, phases.length));
  };

  // --- Verification Simulator Component ---
  function VerificationSimulator({ onClose, phase }: { onClose: () => void; phase: string }) {
    const [step, setStep] = useState<"upload" | "scanning" | "verifying" | "success">("upload");

    useEffect(() => {
      if (step === "scanning") {
        const timer = setTimeout(() => setStep("verifying"), 2000);
        return () => clearTimeout(timer);
      } else if (step === "verifying") {
        const timer = setTimeout(() => setStep("success"), 3000);
        return () => clearTimeout(timer);
      }
    }, [step]);

    const renderContent = () => {
      switch (step) {
        case "upload":
          return (
            <>
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Evidence for {phase}</h3>
              <p className="text-muted-foreground text-center mb-6 max-w-sm">
                Please upload relevant documents or media (e.g., drone footage, invoices) to verify this phase.
              </p>
              <Button size="lg" onClick={() => setStep("scanning")} className="w-full sm:w-auto">
                Upload Files
              </Button>
            </>
          );
        case "scanning":
          return (
            <>
              <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-6 animate-pulse">
                <Scan className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scanning Evidence...</h3>
              <p className="text-muted-foreground text-center mb-6 max-w-sm">
                Our AI is analyzing the uploaded data for authenticity and compliance.
              </p>
              <Progress value={50} className="w-full max-w-sm" />
            </>
          );
        case "verifying":
          return (
            <>
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-6 animate-spin">
                <Loader2 className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verifying Phase {phase}...</h3>
              <p className="text-muted-foreground text-center mb-6 max-w-sm">
                Cross-referencing data with blockchain records and project specifications.
              </p>
              <Progress value={75} className="w-full max-w-sm" />
            </>
          );
        case "success":
          return (
            <>
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-emerald-600">Verification Successful!</h3>
              <p className="text-muted-foreground text-center mb-6 max-w-sm">
                Phase {phase} has been successfully verified. The next tranche will be released shortly.
              </p>
              <Button size="lg" onClick={onClose} className="emerald-gradient w-full sm:w-auto">
                Continue to Next Phase
              </Button>
            </>
          );
      }
    };

    return (
      <div className="p-8 flex flex-col items-center justify-center text-center">
        {renderContent()}
      </div>
    );
  }

  const getMilestones = () => {
    return phases.map((p, index) => {
      let status: "completed" | "current" | "upcoming" = "upcoming";
      if (index < activePhaseIndex) status = "completed";
      else if (index === activePhaseIndex) status = "current";

      let date = p.date;
      if (status === "current") date = "Ready for Verification";
      if (status === "upcoming") date = "Locked";
      if (index < activePhaseIndex && index > 0) date = "Just now"; // Mark recently completed

      return { ...p, status, date };
    });
  };

  return (
    <DashboardLayout>
      {/* Back Button */}
      <Link
        to="/loans"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Header Card */}
      <Card className="mb-8 overflow-hidden">
        <div className="navy-gradient p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 font-mono">
                  {loanData.id}
                </Badge>
                <Badge className="emerald-gradient border-none text-accent-foreground font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Green Status: {activePhaseIndex > 0 ? "Verified" : "Pending"}
                </Badge>
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-primary-foreground">
                  {loanData.borrowerName}
                </h1>
                <p className="text-primary-foreground/70 mt-1">{loanData.projectName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <InfoItem icon={<MapPin />} label="Location" value={loanData.location} />
              <InfoItem icon={<DollarSign />} label="Loan Amount" value={loanData.amount} />
              <InfoItem icon={<Calendar />} label="Start Date" value={loanData.startDate} />
              <InfoItem icon={<Leaf />} label="CO₂ Impact" value={loanData.co2Impact} />
            </div>
          </div>
        </div>
      </Card>

      {/* Milestone Tracker */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Milestone Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <MilestoneTracker milestones={getMilestones()} />
        </CardContent>
      </Card>

      {/* Evidence & Verification Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <EvidenceVault />
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">AI Verification</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-emerald/10 flex items-center justify-center mb-6 animate-pulse">
              <ShieldCheck className="w-8 h-8 text-emerald" />
            </div>

            {!isAllComplete ? (
              <>
                <h3 className="text-lg font-semibold mb-2">Ready to Verify {currentPhase.label.split(":")[0]}</h3>
                <p className="text-muted-foreground text-center mb-6 max-w-sm">
                  Upload drone footage or construction invoices to unlock the next tranche.
                </p>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="emerald-gradient shadow-lg w-full sm:w-auto">
                      Verify {currentPhase.label.split(":")[0]}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-xl p-0 overflow-hidden bg-card border-none">
                    <VerificationSimulator onClose={handleClose} phase={currentPhase.label} />
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-2 text-emerald">All Phases Verified</h3>
                <p className="text-muted-foreground text-center mb-6 max-w-sm">
                  Project is fully funded and operational. Verification complete.
                </p>
                <Button size="lg" variant="outline" className="w-full sm:w-auto" disabled>
                  Verification Complete
                  <CheckCircle2 className="w-4 h-4 ml-2" />
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Blockchain Transactions */}
      <BlockchainTable />
    </DashboardLayout>
  );
};

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5 text-primary-foreground/60">
        <span className="w-4 h-4">{icon}</span>
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="text-sm font-semibold text-primary-foreground">{value}</p>
    </div>
  );
}

export default LoanDetail;

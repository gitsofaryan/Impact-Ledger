import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MilestoneTracker } from "@/components/loans/MilestoneTracker";
import { EvidenceVault } from "@/components/loans/EvidenceVault";
import { BlockchainTable } from "@/components/loans/BlockchainTable";
import { VerifyProofButton } from "@/components/loans/VerifyProofButton";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Leaf,
  ShieldCheck,
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

const milestones = [
  { id: "1", label: "Phase 1: Funded", status: "completed" as const, date: "Oct 15, 2024" },
  { id: "2", label: "Phase 2: Construction", status: "current" as const, date: "In Progress" },
  { id: "3", label: "Phase 3: Energy Gen", status: "upcoming" as const, date: "Mar 2025" },
];

const LoanDetail = () => {
  const { loanId } = useParams();

  return (
    <DashboardLayout>
      {/* Back Button */}
      <Link
        to="/"
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
                  Green Status: {loanData.greenStatus}
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
          <MilestoneTracker milestones={milestones} />
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
            <p className="text-muted-foreground text-center mb-6 max-w-sm">
              Use AI-powered verification to validate uploaded invoices and documentation for authenticity and compliance.
            </p>
            <VerifyProofButton />
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

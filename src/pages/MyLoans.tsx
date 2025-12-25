import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRight, FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const loans = [
  {
    id: "LN-2024-0042",
    borrower: "SolarTech Industries",
    project: "Project Sunrise",
    amount: "$2,500,000",
    status: "active",
    greenStatus: "verified",
    progress: 65,
  },
  {
    id: "LN-2024-0041",
    borrower: "Green Valley Wind Farm",
    project: "Wind Expansion Phase 2",
    amount: "$4,200,000",
    status: "active",
    greenStatus: "verified",
    progress: 45,
  },
  {
    id: "LN-2024-0040",
    borrower: "EcoHarvest Inc",
    project: "Sustainable Agriculture",
    amount: "$1,800,000",
    status: "pending",
    greenStatus: "pending",
    progress: 20,
  },
  {
    id: "LN-2024-0039",
    borrower: "Coastal Solar Initiative",
    project: "Beachfront Solar Array",
    amount: "$3,100,000",
    status: "active",
    greenStatus: "verified",
    progress: 80,
  },
];

const statusColors = {
  active: "bg-emerald/10 text-emerald border-emerald/20",
  pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  completed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
};

const MyLoans = () => {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Loans</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your green finance loans
          </p>
        </div>
        <Button className="emerald-gradient">
          <FileText className="w-4 h-4 mr-2" />
          Apply for New Loan
        </Button>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search loans by ID, borrower, or project..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Loans Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Active Loans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                  <TableHead className="font-semibold">Loan ID</TableHead>
                  <TableHead className="font-semibold">Borrower</TableHead>
                  <TableHead className="font-semibold">Project</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Progress</TableHead>
                  <TableHead className="font-semibold text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loans.map((loan, index) => (
                  <TableRow
                    key={loan.id}
                    className={cn(
                      "animate-fade-in cursor-pointer transition-colors hover:bg-secondary/30"
                    )}
                    style={{ animationDelay: `${index * 75}ms` }}
                  >
                    <TableCell className="font-mono text-sm">{loan.id}</TableCell>
                    <TableCell className="font-medium">{loan.borrower}</TableCell>
                    <TableCell className="text-muted-foreground">{loan.project}</TableCell>
                    <TableCell className="font-medium">{loan.amount}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn("capitalize", statusColors[loan.status as keyof typeof statusColors])}
                      >
                        {loan.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full emerald-gradient transition-all duration-500"
                            style={{ width: `${loan.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{loan.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/loans/${loan.id}`}>
                          View
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default MyLoans;

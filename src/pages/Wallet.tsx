import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Wallet as WalletIcon,
  ArrowUpRight,
  ArrowDownLeft,
  Send,
  Plus,
  TrendingUp,
  CreditCard,
  Building2,
  History,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const balances = [
  { currency: "USD", amount: "2,450,000.00", symbol: "$", change: "+5.2%" },
  { currency: "USDC", amount: "850,000.00", symbol: "◎", change: "+2.1%" },
  { currency: "Green Credits", amount: "15,200", symbol: "🌱", change: "+12.4%" },
];

const transactions = [
  {
    id: "TXN-001",
    type: "deposit",
    description: "Loan Disbursement - Project Sunrise",
    amount: "+$250,000.00",
    date: "Dec 20, 2024",
    status: "completed",
  },
  {
    id: "TXN-002",
    type: "withdrawal",
    description: "Milestone Payment - Green Valley",
    amount: "-$125,000.00",
    date: "Dec 18, 2024",
    status: "completed",
  },
  {
    id: "TXN-003",
    type: "deposit",
    description: "Interest Payment Received",
    amount: "+$8,450.00",
    date: "Dec 15, 2024",
    status: "completed",
  },
  {
    id: "TXN-004",
    type: "withdrawal",
    description: "Platform Fee",
    amount: "-$2,500.00",
    date: "Dec 14, 2024",
    status: "completed",
  },
  {
    id: "TXN-005",
    type: "deposit",
    description: "Carbon Credit Sale",
    amount: "+$45,000.00",
    date: "Dec 10, 2024",
    status: "completed",
  },
];

const Wallet = () => {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Wallet</h1>
          <p className="text-muted-foreground mt-1">
            Manage your funds and track transactions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <History className="w-4 h-4 mr-2" />
            History
          </Button>
          <Button className="emerald-gradient">
            <Plus className="w-4 h-4 mr-2" />
            Add Funds
          </Button>
        </div>
      </div>

      {/* Balances */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {balances.map((balance, index) => (
          <Card
            key={balance.currency}
            className={cn(
              "animate-fade-in",
              index === 0 && "navy-gradient text-primary-foreground border-none"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  index === 0 ? "bg-primary-foreground/10" : "bg-secondary"
                )}>
                  {index === 0 ? (
                    <WalletIcon className="w-6 h-6" />
                  ) : index === 1 ? (
                    <CreditCard className="w-6 h-6 text-muted-foreground" />
                  ) : (
                    <span className="text-2xl">🌱</span>
                  )}
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-sm font-medium px-2 py-0.5 rounded-full",
                  index === 0 ? "bg-emerald/20 text-emerald" : "bg-emerald/10 text-emerald"
                )}>
                  <TrendingUp className="w-3 h-3" />
                  {balance.change}
                </div>
              </div>
              <p className={cn(
                "text-sm font-medium mb-1",
                index === 0 ? "text-primary-foreground/70" : "text-muted-foreground"
              )}>
                {balance.currency}
              </p>
              <p className="text-3xl font-bold">
                {balance.symbol}{balance.amount}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Transfer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>From Account</Label>
              <Select defaultValue="main">
                <SelectTrigger>
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Wallet (USD)</SelectItem>
                  <SelectItem value="usdc">USDC Wallet</SelectItem>
                  <SelectItem value="credits">Green Credits</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Recipient</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select recipient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solar">SolarTech Industries</SelectItem>
                  <SelectItem value="green">Green Valley Wind Farm</SelectItem>
                  <SelectItem value="eco">EcoHarvest Inc</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input placeholder="0.00" className="pl-7" />
              </div>
            </div>
            <Button className="w-full emerald-gradient">
              <Send className="w-4 h-4 mr-2" />
              Send Transfer
            </Button>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
            <Button variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                    <TableHead className="font-semibold">Transaction</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx, index) => (
                    <TableRow
                      key={tx.id}
                      className={cn("animate-fade-in")}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center",
                            tx.type === "deposit" 
                              ? "bg-emerald/10 text-emerald" 
                              : "bg-red-500/10 text-red-500"
                          )}>
                            {tx.type === "deposit" ? (
                              <ArrowDownLeft className="w-4 h-4" />
                            ) : (
                              <ArrowUpRight className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{tx.description}</p>
                            <p className="text-xs text-muted-foreground">{tx.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {tx.date}
                      </TableCell>
                      <TableCell className={cn(
                        "text-right font-semibold",
                        tx.type === "deposit" ? "text-emerald" : "text-foreground"
                      )}>
                        {tx.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Wallet;

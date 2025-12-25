import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  hash: string;
  date: string;
  amount: string;
  type: "funding" | "verification" | "milestone";
  status: "confirmed" | "pending";
}

const transactions: Transaction[] = [
  {
    hash: "0x8f2e...7b4d",
    date: "Dec 20, 2024",
    amount: "$250,000",
    type: "funding",
    status: "confirmed",
  },
  {
    hash: "0x3c9a...e8f1",
    date: "Dec 18, 2024",
    amount: "-",
    type: "verification",
    status: "confirmed",
  },
  {
    hash: "0x7d4b...2a9c",
    date: "Dec 15, 2024",
    amount: "$500,000",
    type: "milestone",
    status: "confirmed",
  },
  {
    hash: "0x1e6f...9d3b",
    date: "Dec 10, 2024",
    amount: "$750,000",
    type: "funding",
    status: "confirmed",
  },
  {
    hash: "0x5a2c...4f7e",
    date: "Dec 5, 2024",
    amount: "-",
    type: "verification",
    status: "confirmed",
  },
];

const typeColors = {
  funding: "bg-emerald/10 text-emerald border-emerald/20",
  verification: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  milestone: "bg-amber-500/10 text-amber-500 border-amber-500/20",
};

export function BlockchainTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Link2 className="w-5 h-5 text-emerald" />
          Blockchain Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                <TableHead className="font-semibold">Transaction Hash</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold text-right">Amount</TableHead>
                <TableHead className="font-semibold text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx, index) => (
                <TableRow
                  key={tx.hash}
                  className={cn(
                    "animate-fade-in cursor-pointer transition-colors hover:bg-secondary/30"
                  )}
                  style={{ animationDelay: `${index * 75}ms` }}
                >
                  <TableCell>
                    <a
                      href="#"
                      className="font-mono text-sm flex items-center gap-1.5 text-foreground hover:text-emerald transition-colors group"
                    >
                      {tx.hash}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{tx.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("capitalize font-medium", typeColors[tx.type])}
                    >
                      {tx.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {tx.amount !== "-" ? tx.amount : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          tx.status === "confirmed"
                            ? "bg-emerald animate-pulse"
                            : "bg-amber-500"
                        )}
                      />
                      <span className="text-xs text-muted-foreground capitalize">
                        {tx.status}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

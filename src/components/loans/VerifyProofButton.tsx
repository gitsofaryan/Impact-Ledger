import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Loader2, Check, FileSearch } from "lucide-react";
import { cn } from "@/lib/utils";

type VerifyState = "idle" | "scanning" | "verified";

export function VerifyProofButton() {
  const [state, setState] = useState<VerifyState>("idle");

  const handleVerify = async () => {
    setState("scanning");
    
    // Simulate AI scanning process
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    setState("verified");
    
    // Reset after 4 seconds
    setTimeout(() => {
      setState("idle");
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        onClick={handleVerify}
        disabled={state !== "idle"}
        className={cn(
          "relative h-14 px-8 text-base font-semibold transition-all duration-500 overflow-hidden",
          state === "idle" && "navy-gradient hover:opacity-90",
          state === "scanning" && "bg-amber-500 hover:bg-amber-500",
          state === "verified" && "emerald-gradient hover:bg-emerald glow-emerald"
        )}
      >
        {/* Background scan animation */}
        {state === "scanning" && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-white/30 to-transparent animate-scan" />
          </div>
        )}

        {/* Button content */}
        <span className="relative flex items-center gap-2">
          {state === "idle" && (
            <>
              <ShieldCheck className="w-5 h-5" />
              Verify Proof
            </>
          )}
          {state === "scanning" && (
            <>
              <FileSearch className="w-5 h-5 animate-pulse" />
              AI Scanning Document...
            </>
          )}
          {state === "verified" && (
            <>
              <div className="animate-check">
                <Check className="w-5 h-5" />
              </div>
              Verified by AI
            </>
          )}
        </span>
      </Button>

      {/* Status text */}
      <div
        className={cn(
          "text-sm transition-all duration-300",
          state === "idle" && "text-muted-foreground",
          state === "scanning" && "text-amber-500",
          state === "verified" && "text-emerald font-medium"
        )}
      >
        {state === "idle" && "Click to verify uploaded documents"}
        {state === "scanning" && "Analyzing document authenticity..."}
        {state === "verified" && "Document authenticity confirmed ✓"}
      </div>

      {/* Progress dots */}
      {state === "scanning" && (
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

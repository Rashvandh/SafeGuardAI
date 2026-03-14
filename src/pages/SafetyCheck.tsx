import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShieldCheck, AlertTriangle, ShieldAlert } from "lucide-react";

const dangerWords = ["help", "danger", "attack", "follow", "kill", "threat", "kidnap", "assault", "rape", "murder"];
const warningWords = ["unsafe", "scared", "worry", "nervous", "suspicious", "alone", "dark", "stranger"];

type Status = "idle" | "safe" | "warning" | "danger";

const analyzeMessage = (msg: string): Status => {
  const lower = msg.toLowerCase();
  if (dangerWords.some((w) => lower.includes(w))) return "danger";
  if (warningWords.some((w) => lower.includes(w))) return "warning";
  return "safe";
};

const statusConfig = {
  safe: {
    icon: ShieldCheck,
    label: "SAFE",
    bg: "bg-safe",
    text: "text-safe-foreground",
    desc: "No threats detected in this message.",
  },
  warning: {
    icon: AlertTriangle,
    label: "WARNING",
    bg: "bg-warning",
    text: "text-warning-foreground",
    desc: "Potential safety concern detected. Stay alert.",
  },
  danger: {
    icon: ShieldAlert,
    label: "DANGER",
    bg: "bg-destructive",
    text: "text-destructive-foreground",
    desc: "Threat keywords detected! Seek help immediately.",
  },
};

const SafetyCheck = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleAnalyze = async () => {
    if (!message.trim()) return;
    try {
      const res = await fetch("http://localhost:5000/api/safety-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) throw new Error("Analysis failed");
      const data = await res.json();
      setStatus(data.status);
    } catch (error) {
      alert("Failed to analyze message");
    }
  };

  const config = status !== "idle" ? statusConfig[status] : null;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-lg space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Safety Message Check</h1>
          <p className="text-muted-foreground font-medium">
            Enter a message to analyze for potential safety threats.
          </p>
        </div>

        {/* Result Banner */}
        {config && (
          <div className={`${config.bg} ${config.text} rounded-lg p-5 flex items-center gap-3`}>
            <config.icon className="h-8 w-8 shrink-0" />
            <div>
              <p className="text-xl font-extrabold">{config.label}</p>
              <p className="text-sm font-medium opacity-90">{config.desc}</p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message to analyze..."
            rows={5}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
          <Button onClick={handleAnalyze} className="w-full" size="lg">
            Analyze Message
          </Button>
        </div>

        <div className="rounded-lg border bg-card p-4 space-y-2">
          <p className="text-sm font-bold">How it works:</p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
            <li><span className="font-semibold text-destructive">Danger:</span> "help", "danger", "attack", "follow"</li>
            <li><span className="font-semibold text-warning">Warning:</span> "unsafe", "scared", "nervous"</li>
            <li><span className="font-semibold text-safe">Safe:</span> No threat keywords found</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SafetyCheck;

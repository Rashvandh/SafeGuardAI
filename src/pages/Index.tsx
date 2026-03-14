import { Shield, MapPin, Siren, Users, Phone, BookOpen, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import SOSButton from "@/components/SOSButton";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "1 Tap", label: "SOS Alert", icon: Siren, color: "text-destructive", bg: "bg-destructive/10" },
  { value: "Instant", label: "Location Share", icon: MapPin, color: "text-primary", bg: "bg-primary/10" },
  { value: "24/7", label: "Always Ready", icon: ShieldCheck, color: "text-safe", bg: "bg-safe/10" },
  { value: "Auto", label: "Emergency Call", icon: Phone, color: "text-warning", bg: "bg-warning/10" },
];

const navCards = [
  {
    to: "/dashboard",
    icon: Siren,
    title: "Dashboard",
    desc: "Open SOS, share location and access all emergency tools.",
    color: "text-destructive",
    bg: "bg-destructive/5",
    border: "border-destructive/20",
  },
  {
    to: "/contacts",
    icon: Users,
    title: "Emergency Contacts",
    desc: "Manage trusted contacts who will be called and notified.",
    color: "text-primary",
    bg: "bg-primary/5",
    border: "border-primary/20",
  },
  {
    to: "/safety-tips",
    icon: BookOpen,
    title: "Safety Tips",
    desc: "Browse essential personal safety guidelines.",
    color: "text-safe",
    bg: "bg-safe/5",
    border: "border-safe/20",
  },
];

const quickTips = [
  "Save emergency numbers on speed dial: Police (100), Women Helpline (1091).",
  "Always share your location with a trusted person when going out alone.",
  "Trust your instincts — leave any situation that feels unsafe.",
];

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50/30">

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-foreground/10 via-transparent to-transparent" />
        <div className="container mx-auto max-w-3xl text-center space-y-6 relative">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary-foreground/20 p-5 ring-4 ring-primary-foreground/10">
              <Shield className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
            AI-Based Women Security<br />Management System
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto font-medium leading-relaxed">
            Your safety is our priority. Instant emergency alerts, live location sharing, and intelligent threat detection — all in one tap.
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <Button size="lg" variant="secondary" asChild className="font-bold shadow-lg">
              <Link to="/dashboard">Open Dashboard <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 font-bold">
              <Link to="/contacts">Manage Contacts</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b shadow-sm">
        <div className="container mx-auto max-w-4xl py-6 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center gap-2 py-2">
                <div className={`rounded-full p-2.5 ${s.bg}`}>
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOS Section */}
      <section className="py-14 px-4">
        <div className="container mx-auto max-w-md text-center space-y-4">
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Emergency Panic Button</p>
          <SOSButton />
          <p className="text-xs text-muted-foreground max-w-xs mx-auto">
            Tap once to alert contacts, share your location and call for help automatically.
          </p>
        </div>
      </section>

      {/* Nav Cards */}
      <section className="py-10 px-4 bg-white border-y">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-8">Explore Features</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {navCards.map((card) => (
              <Link
                key={card.to}
                to={card.to}
                className={`group rounded-xl border-2 ${card.border} ${card.bg} p-6 space-y-3 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5`}
              >
                <div className={`inline-flex rounded-xl p-3 bg-white shadow-sm`}>
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
                <h3 className="font-bold text-lg">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                <div className={`flex items-center gap-1 text-sm font-bold ${card.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Open <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Safety Tips */}
      <section className="py-12 px-4 bg-primary/5">
        <div className="container mx-auto max-w-2xl text-center space-y-6">
          <h2 className="text-2xl font-bold">Quick Safety Reminders</h2>
          <ul className="space-y-3 text-left">
            {quickTips.map((tip, i) => (
              <li key={i} className="flex gap-3 rounded-lg bg-white border p-4 shadow-sm">
                <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground font-medium">{tip}</span>
              </li>
            ))}
          </ul>
          <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary/5 font-bold">
            <Link to="/safety-tips">View All Safety Tips <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* Footer Banner */}
      <section className="bg-primary text-primary-foreground py-10 px-4 text-center">
        <div className="container mx-auto max-w-xl space-y-3">
          <ShieldCheck className="h-10 w-10 mx-auto opacity-80" />
          <h2 className="text-2xl font-extrabold">You Are Not Alone</h2>
          <p className="text-primary-foreground/80 font-medium text-sm">
            Safe Haven is always by your side. Stay alert, stay safe, and never hesitate to activate your SOS.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;

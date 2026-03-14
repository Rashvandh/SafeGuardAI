import { ShieldCheck, MapPin, Phone, Eye, Lock, AlertTriangle, Users, Smartphone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const tips = [
  {
    icon: Eye,
    title: "Stay Aware of Your Surroundings",
    content: "Always be conscious of who and what is around you, especially in unfamiliar areas. Avoid using headphones or looking at your phone while walking alone. Trust your instincts — if something feels off, move to a crowded or well-lit area immediately.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: MapPin,
    title: "Share Your Live Location",
    content: "Always share your live location with a trusted friend or family member when traveling alone, especially at night. Use apps like Google Maps or WhatsApp live location sharing. Let someone know your expected arrival time.",
    color: "text-safe",
    bg: "bg-safe/10",
  },
  {
    icon: Phone,
    title: "Keep Emergency Numbers Ready",
    content: "Save emergency numbers on speed dial: Police (100), Women Helpline (1091/181), Ambulance (108). Add your emergency contacts in this app so they can be alerted with one tap via the SOS button.",
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  {
    icon: Lock,
    title: "Secure Your Digital Presence",
    content: "Keep your social media profiles private. Avoid sharing real-time location posts publicly. Use strong passwords and enable two-factor authentication. Be cautious of strangers reaching out online.",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    icon: Users,
    title: "Travel in Groups When Possible",
    content: "Avoid isolated areas, especially after dark. If you must travel alone, choose well-lit, populated routes. Inform someone about your travel plans and expected time of return.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: AlertTriangle,
    title: "Trust Your Instincts",
    content: "If a situation or person makes you uncomfortable, leave immediately. Don't worry about being polite — your safety comes first. Seek help from nearby shops, security guards, or bystanders.",
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  {
    icon: Smartphone,
    title: "Use Safety Apps & Features",
    content: "Install safety apps that can send SOS alerts. Enable features like emergency SOS on your phone (hold power + volume on most smartphones). Keep your phone charged when going out.",
    color: "text-safe",
    bg: "bg-safe/10",
  },
  {
    icon: ShieldCheck,
    title: "Learn Basic Self-Defense",
    content: "Take a self-defense class to learn basic techniques. Key vulnerable areas to target: eyes, nose, throat, groin, and knees. Carry legal self-defense tools like a personal alarm or pepper spray where permitted.",
    color: "text-warning",
    bg: "bg-warning/10",
  },
];

const SafetyTips = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="rounded-full bg-safe/10 p-3">
              <ShieldCheck className="h-8 w-8 text-safe" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Safety Tips</h1>
          <p className="text-muted-foreground font-medium">
            Essential personal safety guidelines every woman should know.
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {tips.slice(0, 4).map((tip) => (
            <div key={tip.title} className="rounded-lg border bg-card p-5 space-y-3 shadow-sm">
              <div className={`inline-flex rounded-lg p-2.5 ${tip.bg}`}>
                <tip.icon className={`h-5 w-5 ${tip.color}`} />
              </div>
              <h3 className="font-bold text-sm">{tip.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{tip.content}</p>
            </div>
          ))}
        </div>

        {/* Accordion for remaining tips */}
        <div>
          <h2 className="font-bold text-lg mb-4">More Safety Guidelines</h2>
          <Accordion type="multiple" className="rounded-lg border bg-card shadow-sm">
            {tips.slice(4).map((tip, i) => (
              <AccordionItem key={tip.title} value={`tip-${i}`}>
                <AccordionTrigger className="px-5 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg p-1.5 ${tip.bg}`}>
                      <tip.icon className={`h-4 w-4 ${tip.color}`} />
                    </div>
                    <span className="font-semibold text-sm text-left">{tip.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5">
                  <p className="text-muted-foreground text-sm leading-relaxed pl-10">{tip.content}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default SafetyTips;

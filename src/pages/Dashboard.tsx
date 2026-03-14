import { Link } from "react-router-dom";
import { MapPin, Phone, ShieldCheck, Info, AlertCircle } from "lucide-react";
import SOSButton from "@/components/SOSButton";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const shareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setCoords({ lat, lng });
          toast.success("Location updated!");
          
          if (navigator.share) {
            navigator.share({
              title: "My Live Location",
              text: "Here is my current location for safety.",
              url: `https://www.google.com/maps?q=${lat},${lng}`,
            });
          }
        },
        () => toast.error("Could not get location")
      );
    }
  };

  const emergencyNumbers = [
    { label: "Police", number: "100", desc: "Emergency assistance" },
    { label: "Women Helpline", number: "1091", desc: "National helpline" },
    { label: "Ambulance", number: "108", desc: "Medical emergency" },
    { label: "Domestic Abuse", number: "181", desc: "Support & help" },
  ];

  const quickTips = [
    "Stay in well-lit areas at night.",
    "Keep your emergency contacts updated.",
    "Trust your gut feeling — leave if uneasy.",
    "Keep your phone charged and handy.",
  ];

  return (
    <div className="min-h-screen py-8 px-4 bg-slate-50/50">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Safety Dashboard</h1>
          <p className="text-muted-foreground font-medium">One-tap emergency tools and safety resources.</p>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Main Controls */}
          <div className="md:col-span-7 space-y-8">
            {/* SOS Section */}
            <Card className="border-2 border-destructive/20 shadow-md overflow-hidden">
              <div className="bg-destructive/5 p-2 text-center text-xs font-bold text-destructive uppercase tracking-wider border-b border-destructive/10">
                Panic Alert System
              </div>
              <CardContent className="pt-8 pb-10 flex flex-col items-center">
                <SOSButton size="sos-sm" />
                <p className="mt-6 text-sm text-muted-foreground text-center max-w-xs">
                  Pressing the SOS button will instantly notify your emergency contacts and share your live location.
                </p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div 
              onClick={shareLocation}
              className="group cursor-pointer rounded-xl border-2 border-primary/10 bg-white p-6 flex items-center gap-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
            >
              <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Share Live Location</h3>
                <p className="text-sm text-muted-foreground">Instantly send your GPS coordinates to any app.</p>
              </div>
            </div>

            {/* Location Result */}
            {coords && (
              <Card className="bg-safe/5 border-safe/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-safe mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-bold">Location Active</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
                      </p>
                      <a 
                        href={`https://www.google.com/maps?q=${coords.lat},${coords.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary font-semibold hover:underline flex items-center gap-1 mt-2"
                      >
                        <Info className="h-3 w-3" /> View on Google Maps
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="md:col-span-5 space-y-6">
            {/* Emergency Numbers */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Phone className="h-5 w-5 text-destructive" />
                  Hotline Numbers
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-3">
                {emergencyNumbers.map((item) => (
                  <a 
                    key={item.number}
                    href={`tel:${item.number}`}
                    className="flex items-center justify-between p-3 rounded-lg border bg-slate-50 hover:bg-slate-100 transition-colors group"
                  >
                    <div>
                      <p className="font-bold text-sm tracking-tight">{item.label}</p>
                      <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                    </div>
                    <span className="text-lg font-black text-primary group-hover:scale-110 transition-transform">
                      {item.number}
                    </span>
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Quick Safety Tips */}
            <Card className="shadow-sm bg-primary/5 border-primary/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Safety Reminders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {quickTips.map((tip, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground font-medium">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MapPin, AlertTriangle, Phone, Volume2, VolumeX } from "lucide-react";
import { API_BASE } from "@/lib/api";

interface SOSButtonProps {
  size?: "sos" | "sos-sm";
}

const SOSButton = ({ size = "sos" }: SOSButtonProps) => {
  const [activated, setActivated] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notifiedContacts, setNotifiedContacts] = useState<any[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create alarm sound using Web Audio API
  const playAlarmSound = () => {
    if (!soundEnabled) return;

    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;

      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Siren-like alternating frequency
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.linearRampToValueAtTime(600, audioContext.currentTime + 0.3);
      oscillator.frequency.linearRampToValueAtTime(800, audioContext.currentTime + 0.6);

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.6);

      // Repeat for siren effect
      setTimeout(() => {
        if (soundEnabled) {
          const osc2 = audioContext.createOscillator();
          const gain2 = audioContext.createGain();
          osc2.connect(gain2);
          gain2.connect(audioContext.destination);
          osc2.type = 'square';
          osc2.frequency.setValueAtTime(800, audioContext.currentTime);
          osc2.frequency.linearRampToValueAtTime(600, audioContext.currentTime + 0.3);
          osc2.frequency.linearRampToValueAtTime(800, audioContext.currentTime + 0.6);
          gain2.gain.setValueAtTime(0.3, audioContext.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
          osc2.start(audioContext.currentTime);
          osc2.stop(audioContext.currentTime + 0.6);
        }
      }, 700);
    } catch (e) {
      console.error('Audio playback failed:', e);
    }
  };

  // Vibration pattern for emergency
  const triggerVibration = () => {
    if (navigator.vibrate) {
      // Pattern: vibrate 500ms, pause 200ms, vibrate 500ms, pause 200ms, vibrate 1000ms
      navigator.vibrate([500, 200, 500, 200, 1000]);
    }
  };

  const handleSOS = async () => {
    setActivated(true);
    setError(null);

    // Trigger sound and vibration
    playAlarmSound();
    triggerVibration();

    // Kick off geolocation immediately in background
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setCoords({ lat, lng });

          // Send SOS alert to backend
          try {
            await fetch(`${API_BASE}/sos`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ lat, lng }),
            });
          } catch (e) {
            console.error("Failed to send SOS to backend", e);
          }
        },
        () => {
          setError("Location access denied. Please enable location services.");
          setCoords({ lat: 28.6139, lng: 77.209 });
        }
      );
    } else {
      setError("Geolocation not supported.");
      setCoords({ lat: 28.6139, lng: 77.209 });
    }

    // Fetch contacts and immediately initiate call (no delay)
    try {
      const res = await fetch(`${API_BASE}/contacts`);
      if (res.ok) {
        const data = await res.json();
        setNotifiedContacts(data);

        // Immediately initiate call to first contact
        if (data.length > 0) {
          window.location.href = `tel:${data[0].phone}`;
        }
      }
    } catch (e) {
      console.error("Failed to fetch contacts for SOS", e);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <Button variant="sos" size={size} onClick={handleSOS}>
          SOS
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="rounded-full"
          title={soundEnabled ? "Sound on" : "Sound off"}
        >
          {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </Button>
      </div>
      <p className="text-muted-foreground text-sm font-medium">Tap for Emergency Alert</p>

      {activated && (
        <div className="w-full max-w-sm rounded-lg border border-destructive/30 bg-destructive/5 p-4 space-y-3">
          <div className="flex items-center gap-2 text-destructive font-bold">
            <AlertTriangle className="h-5 w-5" />
            Emergency Alert Activated
          </div>

          {coords && (
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-foreground">
                <MapPin className="h-4 w-4 text-destructive" />
                <span className="font-semibold">Lat:</span> {coords.lat.toFixed(4)},
                <span className="font-semibold">Lng:</span> {coords.lng.toFixed(4)}
              </div>
              <a
                href={`https://www.google.com/maps?q=${coords.lat},${coords.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary font-semibold underline"
              >
                <MapPin className="h-4 w-4" />
                View on Google Maps
              </a>
            </div>
          )}

          {notifiedContacts.length > 0 && (
            <div className="rounded-md bg-safe/10 border border-safe/30 p-3 space-y-2">
              <div className="flex items-center gap-2 text-safe font-semibold text-sm">
                <Phone className="h-4 w-4" />
                Emergency Contacts
              </div>
              <ul className="text-xs text-foreground space-y-2 pl-6">
                {notifiedContacts.map((contact: any) => (
                  <li key={contact.id} className="flex items-center justify-between">
                    <span>✓ {contact.name} ({contact.phone})</span>
                    <a 
                      href={`sms:${contact.phone}?body=EMERGENCY! I need help. My location: https://www.google.com/maps?q=${coords?.lat},${coords?.lng}`}
                      className="bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 transition-colors font-bold"
                    >
                      SMS Location
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {coords && (
            <Button 
              variant="outline" 
              className="w-full gap-2 border-primary text-primary hover:bg-primary/10"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'EMERGENCY: My Location',
                    text: 'I need help! Here is my live location.',
                    url: `https://www.google.com/maps?q=${coords.lat},${coords.lng}`,
                  }).catch(console.error);
                } else {
                  toast.error("Web Share not supported on this browser");
                }
              }}
            >
              <MapPin className="h-4 w-4" /> Share Location (WhatsApp/Link)
            </Button>
          )}

          {notifiedContacts.length === 0 && (
            <p className="text-xs text-muted-foreground">
              No emergency contacts set. <a href="/contacts" className="text-primary underline font-semibold">Add contacts</a> to notify them during emergencies.
            </p>
          )}

          {error && <p className="text-sm text-warning font-medium">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default SOSButton;

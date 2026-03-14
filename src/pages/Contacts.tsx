import { useState, useEffect } from "react";
import { UserPlus, Trash2, Phone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { API_BASE } from "@/lib/api";

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}


const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relationship, setRelationship] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${API_BASE}/contacts`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      toast.error("Could not load contacts");
    }
  };

  const addContact = async () => {
    if (!name.trim() || !phone.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          relationship: relationship.trim() || "Other",
        }),
      });
      if (!res.ok) throw new Error("Failed to add");
      await fetchContacts();
      setName("");
      setPhone("");
      setRelationship("");
      toast.success("Contact added successfully");
    } catch (error) {
      toast.error("Failed to add contact");
    }
  };

  const removeContact = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/contacts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      await fetchContacts();
      toast.success("Contact removed");
    } catch (error) {
      toast.error("Failed to remove contact");
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-3">
              <Users className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Emergency Contacts</h1>
          <p className="text-muted-foreground font-medium">
            These contacts will be notified when SOS is triggered.
          </p>
        </div>

        {/* Add Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary" />
              Add Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 9876543210" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rel">Relationship</Label>
              <Input id="rel" value={relationship} onChange={(e) => setRelationship(e.target.value)} placeholder="e.g. Mother, Friend, Spouse" />
            </div>
            <Button onClick={addContact} disabled={!name.trim() || !phone.trim()} className="w-full">
              <UserPlus className="h-4 w-4" /> Add Emergency Contact
            </Button>
          </CardContent>
        </Card>

        {/* Contacts List */}
        {contacts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No emergency contacts yet.</p>
            <p className="text-sm">Add contacts above to get notified during emergencies.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <h2 className="font-bold text-lg">Your Contacts ({contacts.length})</h2>
            {contacts.map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.phone} · {c.relationship}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeContact(c.id)} className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;

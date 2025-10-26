import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { getStoredAuth, getUsers } from "@/lib/auth";
import { getFollowUps, addFollowUp } from "@/lib/prakriti";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Users, FileText, TrendingUp } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const { user } = getStoredAuth();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [followUpData, setFollowUpData] = useState({
    notes: "",
    improvements: "",
    concerns: "",
    nextFollowUp: "",
  });

  if (!user || user.role !== "admin") {
    navigate("/login");
    return null;
  }

  const allUsers = getUsers().filter(u => u.role === "user");
  const totalFollowUps = allUsers.reduce((acc, u) => acc + getFollowUps(u.id).length, 0);

  const handleAddFollowUp = () => {
    if (!selectedUser) return;

    const followUp = {
      id: `followup-${Date.now()}`,
      userId: selectedUser,
      date: new Date().toISOString(),
      notes: followUpData.notes,
      improvements: followUpData.improvements.split(",").map(s => s.trim()).filter(Boolean),
      concerns: followUpData.concerns.split(",").map(s => s.trim()).filter(Boolean),
      nextFollowUp: followUpData.nextFollowUp,
    };

    addFollowUp(followUp);
    toast.success("Follow-up added successfully");
    setFollowUpData({ notes: "", improvements: "", concerns: "", nextFollowUp: "" });
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage users and track their progress</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{allUsers.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Follow-ups</p>
                  <p className="text-2xl font-bold">{totalFollowUps}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-vata flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Assessments Done</p>
                  <p className="text-2xl font-bold">
                    {allUsers.filter(u => u.prakriti).length}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            <div className="space-y-4">
              {allUsers.map((u) => {
                const userFollowUps = getFollowUps(u.id);
                return (
                  <Card key={u.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{u.name}</h3>
                        <p className="text-sm text-muted-foreground">{u.email}</p>
                        <div className="flex gap-4 mt-2 text-sm">
                          <span className="text-muted-foreground">
                            Age: <span className="text-foreground">{u.age}</span>
                          </span>
                          <span className="text-muted-foreground">
                            Phone: <span className="text-foreground">{u.phone}</span>
                          </span>
                          {u.prakriti && (
                            <span className="text-muted-foreground">
                              Prakriti: <span className="text-foreground capitalize">{u.prakriti}</span>
                            </span>
                          )}
                          <span className="text-muted-foreground">
                            Follow-ups: <span className="text-foreground">{userFollowUps.length}</span>
                          </span>
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button onClick={() => setSelectedUser(u.id)}>Add Follow-up</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Follow-up for {u.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Notes</Label>
                              <Textarea
                                value={followUpData.notes}
                                onChange={(e) => setFollowUpData({ ...followUpData, notes: e.target.value })}
                                placeholder="General notes about the session..."
                              />
                            </div>
                            <div>
                              <Label>Improvements (comma-separated)</Label>
                              <Input
                                value={followUpData.improvements}
                                onChange={(e) => setFollowUpData({ ...followUpData, improvements: e.target.value })}
                                placeholder="Better sleep, increased energy..."
                              />
                            </div>
                            <div>
                              <Label>Concerns (comma-separated)</Label>
                              <Input
                                value={followUpData.concerns}
                                onChange={(e) => setFollowUpData({ ...followUpData, concerns: e.target.value })}
                                placeholder="Digestive issues, stress..."
                              />
                            </div>
                            <div>
                              <Label>Next Follow-up Date</Label>
                              <Input
                                type="date"
                                value={followUpData.nextFollowUp}
                                onChange={(e) => setFollowUpData({ ...followUpData, nextFollowUp: e.target.value })}
                              />
                            </div>
                            <Button onClick={handleAddFollowUp} className="w-full">
                              Save Follow-up
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    {userFollowUps.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm font-semibold mb-2">Recent Follow-ups:</p>
                        <div className="space-y-2">
                          {userFollowUps.slice(-2).reverse().map((f) => (
                            <div key={f.id} className="text-sm bg-secondary/30 p-2 rounded">
                              <p className="font-medium">{new Date(f.date).toLocaleDateString()}</p>
                              <p className="text-muted-foreground">{f.notes}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;

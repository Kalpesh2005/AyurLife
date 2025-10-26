import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { getStoredAuth } from "@/lib/auth";
import { getFollowUps } from "@/lib/prakriti";
import { Calendar, Heart, TrendingUp, FileText } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = getStoredAuth();

  if (!user) {
    navigate("/login");
    return null;
  }

  if (!user.prakriti) {
    navigate("/questionnaire");
    return null;
  }

  const followUps = getFollowUps(user.id);
  const primaryDosha = user.prakriti.split("-")[0];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome, {user.name}!</h1>
            <p className="text-muted-foreground">Your personalized wellness dashboard</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-${primaryDosha} flex items-center justify-center`}>
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Your Prakriti</p>
                  <p className="text-2xl font-bold capitalize">{user.prakriti}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Follow-ups</p>
                  <p className="text-2xl font-bold">{followUps.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Days Active</p>
                  <p className="text-2xl font-bold">
                    {Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24))}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/results")}
                >
                  View My Diet Chart
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/results")}
                >
                  View Daily Schedule
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/questionnaire")}
                >
                  Retake Assessment
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Recent Follow-ups</h2>
              {followUps.length > 0 ? (
                <div className="space-y-3">
                  {followUps.slice(-3).reverse().map((followUp) => (
                    <div key={followUp.id} className="p-3 bg-secondary/50 rounded-lg">
                      <p className="font-semibold text-sm">
                        {new Date(followUp.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{followUp.notes}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No follow-ups yet. Keep tracking your progress!</p>
              )}
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Age</p>
                <p className="font-medium">{user.age} years</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{user.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

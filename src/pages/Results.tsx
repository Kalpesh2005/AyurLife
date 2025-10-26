import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { getStoredAuth } from "@/lib/auth";
import { getDietRecommendations, getDailySchedule } from "@/lib/prakriti";
import { Check } from "lucide-react";

const Results = () => {
  const navigate = useNavigate();
  const { user } = getStoredAuth();

  if (!user || !user.prakriti) {
    navigate("/questionnaire");
    return null;
  }

  const primaryDosha = user.prakriti.split("-")[0] as "vata" | "pitta" | "kapha";
  const diet = getDietRecommendations(primaryDosha);
  const schedule = getDailySchedule(primaryDosha);

  const doshaInfo = {
    vata: {
      title: "Vata Prakriti",
      description: "You are creative, energetic, and quick-thinking. Your constitution is dominated by air and space elements.",
      color: "vata",
      gradient: "gradient-vata",
    },
    pitta: {
      title: "Pitta Prakriti",
      description: "You are focused, intense, and determined. Your constitution is dominated by fire and water elements.",
      color: "pitta",
      gradient: "gradient-pitta",
    },
    kapha: {
      title: "Kapha Prakriti",
      description: "You are stable, calm, and nurturing. Your constitution is dominated by earth and water elements.",
      color: "kapha",
      gradient: "gradient-kapha",
    },
  };

  const info = doshaInfo[primaryDosha];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className={`p-8 mb-8 bg-${info.gradient} text-white`}>
            <h1 className="text-4xl font-bold mb-4">{info.title}</h1>
            <p className="text-lg opacity-90">{info.description}</p>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className={`text-${info.color}`}>🍽️</span> Diet Recommendations
              </h2>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-2 text-lg">Foods to Favor:</h3>
                <ul className="space-y-2">
                  {diet.favor.map((food, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{food}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2 text-lg">Foods to Avoid:</h3>
                <ul className="space-y-2">
                  {diet.avoid.map((food, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-destructive mt-0.5">✕</span>
                      <span>{food}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-lg">Tips:</h3>
                <ul className="space-y-2">
                  {diet.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">💡</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className={`text-${info.color}`}>📅</span> Daily Schedule
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Morning</h3>
                  <p className="mt-1">{schedule.morning}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Breakfast</h3>
                  <p className="mt-1">{schedule.breakfast}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Midday</h3>
                  <p className="mt-1">{schedule.midday}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Afternoon</h3>
                  <p className="mt-1">{schedule.afternoon}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Evening</h3>
                  <p className="mt-1">{schedule.evening}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Night</h3>
                  <p className="mt-1">{schedule.night}</p>
                </div>
                <div className="pt-4 border-t">
                  <h3 className="font-semibold text-sm text-muted-foreground">Exercise</h3>
                  <p className="mt-1">{schedule.exercise}</p>
                </div>
                <div className="p-3 bg-accent/10 rounded-lg">
                  <p className="text-sm">💡 {schedule.notes}</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;

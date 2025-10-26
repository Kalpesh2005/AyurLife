import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { prakritiQuestions, calculatePrakriti } from "@/lib/prakriti";
import { getStoredAuth, updateUser, setStoredAuth } from "@/lib/auth";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const Questionnaire = () => {
  const navigate = useNavigate();
  const { user } = getStoredAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, "vata" | "pitta" | "kapha">>({});

  if (!user) {
    navigate("/login");
    return null;
  }

  const question = prakritiQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / prakritiQuestions.length) * 100;

  const handleAnswer = (dosha: "vata" | "pitta" | "kapha") => {
    const newAnswers = { ...answers, [question.id]: dosha };
    setAnswers(newAnswers);

    if (currentQuestion < prakritiQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const result = calculatePrakriti(newAnswers);
      const prakritiType = result.secondary 
        ? `${result.primary}-${result.secondary}` 
        : result.primary;
      
      const updatedUser = updateUser(user.id, { 
        prakriti: prakritiType as any 
      });
      
      if (updatedUser) {
        setStoredAuth({ user: updatedUser, isAuthenticated: true });
        toast.success("Prakriti analysis complete!");
        navigate("/results");
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 shadow-medium">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-medium text-muted-foreground">
                  Question {currentQuestion + 1} of {prakritiQuestions.length}
                </h2>
                <span className="text-sm font-medium text-primary">
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <h1 className="text-2xl font-bold mb-6">{question.text}</h1>

            <RadioGroup
              value={answers[question.id]}
              onValueChange={(value) => handleAnswer(value as "vata" | "pitta" | "kapha")}
              className="space-y-4"
            >
              {question.options.map((option, index) => (
                <Card
                  key={index}
                  className={`p-4 cursor-pointer transition-all hover:shadow-soft ${
                    answers[question.id] === option.dosha
                      ? "ring-2 ring-primary shadow-soft"
                      : ""
                  }`}
                  onClick={() => handleAnswer(option.dosha)}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value={option.dosha} id={`option-${index}`} />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer"
                    >
                      {option.text}
                    </Label>
                  </div>
                </Card>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <Button
                onClick={() => answers[question.id] && handleAnswer(answers[question.id])}
                disabled={!answers[question.id]}
              >
                {currentQuestion === prakritiQuestions.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;

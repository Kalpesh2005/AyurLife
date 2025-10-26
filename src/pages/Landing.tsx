import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Leaf, Heart, Calendar, TrendingUp } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Discover Your Ayurvedic Constitution
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Personalized wellness guidance based on ancient Ayurvedic wisdom. 
              Find your Prakriti and transform your health journey.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="text-lg px-8">
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-hero flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Take Assessment</h3>
              <p className="text-sm text-muted-foreground">
                Answer questions about your body, mind, and lifestyle
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-vata flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Discover Prakriti</h3>
              <p className="text-sm text-muted-foreground">
                Learn your unique Ayurvedic constitution
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-pitta flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Get Personalized Plan</h3>
              <p className="text-sm text-muted-foreground">
                Receive customized diet and lifestyle recommendations
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-kapha flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Track Progress</h3>
              <p className="text-sm text-muted-foreground">
                Monitor your wellness journey with regular follow-ups
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">The Three Doshas</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 border-2 border-vata/30 hover:border-vata transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-vata flex items-center justify-center">
                  <span className="text-2xl text-white">💨</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Vata</h3>
                <p className="text-sm text-muted-foreground">Air & Space - Creative, energetic, quick-thinking</p>
              </Card>

              <Card className="p-6 border-2 border-pitta/30 hover:border-pitta transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-pitta flex items-center justify-center">
                  <span className="text-2xl text-white">🔥</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Pitta</h3>
                <p className="text-sm text-muted-foreground">Fire & Water - Intense, focused, determined</p>
              </Card>

              <Card className="p-6 border-2 border-kapha/30 hover:border-kapha transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-kapha flex items-center justify-center">
                  <span className="text-2xl text-white">🌍</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Kapha</h3>
                <p className="text-sm text-muted-foreground">Earth & Water - Stable, calm, nurturing</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-secondary/20 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 AyurLife. Ancient wisdom for modern wellness.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

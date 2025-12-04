import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wallet, ShoppingBag, PiggyBank, TrendingUp, AlertTriangle, 
  CheckCircle, XCircle, RotateCcw, ArrowRight
} from "lucide-react";

interface Scenario {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  situation: string;
  choices: { id: string; text: string; outcome: "good" | "okay" | "bad"; feedback: string; impact: number }[];
}

const scenarios: Scenario[] = [
  {
    id: "pocket-money",
    title: "Managing Pocket Money",
    icon: Wallet,
    description: "You receive ₹500 pocket money this month",
    situation: "Your parents give you ₹500 for the month. Your friend invites you to go to a movie (₹300), you need stationery for school (₹150), and you wanted to save for a book (₹200). What do you do?",
    choices: [
      { id: "a", text: "Go to movie first, worry about rest later", outcome: "bad", feedback: "Spending on wants first left you short for needs and savings!", impact: -50 },
      { id: "b", text: "Buy stationery, save ₹200, skip movie", outcome: "good", feedback: "Great choice! You covered needs, saved money, and can plan entertainment for next month.", impact: 100 },
      { id: "c", text: "Buy stationery, save ₹100, watch movie at home", outcome: "okay", feedback: "Good balance! You found a cheaper entertainment option while meeting other goals.", impact: 50 },
    ],
  },
  {
    id: "surprise-expense",
    title: "Handling Surprise Expenses",
    icon: AlertTriangle,
    description: "Your phone screen cracks unexpectedly",
    situation: "Your phone screen cracks and repair costs ₹1,500. You have ₹2,000 saved. Your friend's birthday is next week and you planned to spend ₹500 on a gift. What do you do?",
    choices: [
      { id: "a", text: "Fix phone, make a handmade gift", outcome: "good", feedback: "Smart! You handled the emergency and showed creativity with the gift.", impact: 100 },
      { id: "b", text: "Skip the repair, buy expensive gift", outcome: "bad", feedback: "Your phone might get worse! Emergencies should come before wants.", impact: -50 },
      { id: "c", text: "Fix phone, skip the party", outcome: "okay", feedback: "Emergency handled, but there might be cheaper gift options to stay connected with friends.", impact: 30 },
    ],
  },
  {
    id: "save-vs-spend",
    title: "Save or Spend Decision",
    icon: PiggyBank,
    description: "You have saved ₹3,000 over 6 months",
    situation: "After 6 months of saving, you have ₹3,000. Your friend suggests buying the latest headphones (₹2,500). Your goal was to save ₹5,000 for a tablet. What do you do?",
    choices: [
      { id: "a", text: "Buy the headphones - you deserve it!", outcome: "bad", feedback: "Impulse spending derailed your bigger goal. You'd need to start over.", impact: -75 },
      { id: "b", text: "Keep saving for the tablet", outcome: "good", feedback: "Excellent discipline! You're 60% to your goal and staying focused.", impact: 100 },
      { id: "c", text: "Buy cheaper ₹800 earphones, keep saving", outcome: "okay", feedback: "Compromise can work, but make sure small purchases don't add up.", impact: 40 },
    ],
  },
  {
    id: "invest-early",
    title: "Starting Early vs Later",
    icon: TrendingUp,
    description: "Understanding the power of starting early",
    situation: "You can start saving ₹100/month now (at age 15) or wait until you're 25 to start saving ₹200/month. Both grow at 10% per year. By age 45, who has more?",
    choices: [
      { id: "a", text: "Starting later with ₹200/month is better", outcome: "bad", feedback: "Actually, starting early beats higher amounts later! Time is your biggest advantage.", impact: -25 },
      { id: "b", text: "Starting at 15 with ₹100/month wins", outcome: "good", feedback: "Correct! Starting 10 years earlier means way more compound growth. Time beats amount!", impact: 100 },
      { id: "c", text: "They'll have about the same", outcome: "okay", feedback: "Close, but not quite. The early starter actually ends up with significantly more due to compounding.", impact: 20 },
    ],
  },
  {
    id: "shopping-trap",
    title: "The Shopping Trap",
    icon: ShoppingBag,
    description: "A big sale is happening online",
    situation: "There's a 50% off sale! A jacket you like is ₹1,000 (originally ₹2,000). You don't really need it, but it's such a good deal. You have ₹1,500 saved. What do you do?",
    choices: [
      { id: "a", text: "Buy it! 50% off is amazing!", outcome: "bad", feedback: "A discount on something you don't need is still spending money unnecessarily.", impact: -50 },
      { id: "b", text: "Skip it - saving ₹1,000 is better than saving ₹1,000 on a jacket", outcome: "good", feedback: "Wise! The best deal is not buying what you don't need. Your ₹1,500 stays intact.", impact: 100 },
      { id: "c", text: "Wait and see if you still want it in a week", outcome: "okay", feedback: "Good strategy! The 24-48 hour rule helps avoid impulse purchases.", impact: 60 },
    ],
  },
];

const Simulations = () => {
  const { user } = useAuth();
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);
  const [totalScore, setTotalScore] = useState(0);

  const startScenario = (scenario: Scenario) => {
    setCurrentScenario(scenario);
    setSelectedChoice(null);
    setShowFeedback(false);
  };

  const makeChoice = async (choiceId: string) => {
    if (!currentScenario) return;
    setSelectedChoice(choiceId);
    setShowFeedback(true);

    const choice = currentScenario.choices.find((c) => c.id === choiceId);
    if (choice) {
      setTotalScore((prev) => prev + choice.impact);
    }

    if (!completedScenarios.includes(currentScenario.id)) {
      setCompletedScenarios((prev) => [...prev, currentScenario.id]);
    }

    // Save to database if user is logged in
    if (user && choice) {
      await supabase.from("simulator_history").insert({
        user_id: user.id,
        simulation_type: currentScenario.id,
        choices: { choice_id: choiceId, choice_text: choice.text },
        outcome: { outcome: choice.outcome, impact: choice.impact, feedback: choice.feedback },
      });
    }
  };

  const resetSimulations = () => {
    setCurrentScenario(null);
    setSelectedChoice(null);
    setShowFeedback(false);
    setCompletedScenarios([]);
    setTotalScore(0);
    toast.success("Simulations reset!");
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">Financial Simulations</h1>
          <p className="text-muted-foreground text-lg mb-4">
            Make real-world financial decisions and see the consequences instantly
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <Badge variant="outline" className="text-lg py-2 px-4">
              Score: {totalScore}
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              {completedScenarios.length}/{scenarios.length} completed
            </Badge>
            {completedScenarios.length > 0 && (
              <Button variant="ghost" size="sm" onClick={resetSimulations}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            )}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!currentScenario ? (
            <motion.div
              key="scenarios-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 gap-4"
            >
              {scenarios.map((scenario, index) => {
                const isCompleted = completedScenarios.includes(scenario.id);
                return (
                  <motion.div
                    key={scenario.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        isCompleted ? "border-green-500/50 bg-green-500/5" : ""
                      }`}
                      onClick={() => startScenario(scenario)}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isCompleted ? "bg-green-500/20" : "bg-primary/20"
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <scenario.icon className="w-5 h-5 text-primary" />
                            )}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{scenario.title}</CardTitle>
                            <CardDescription>{scenario.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="scenario-active"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <currentScenario.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{currentScenario.title}</CardTitle>
                      <CardDescription>{currentScenario.description}</CardDescription>
                    </div>
                  </div>
                  <p className="text-foreground bg-muted/50 p-4 rounded-lg">
                    {currentScenario.situation}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentScenario.choices.map((choice) => {
                    const isSelected = selectedChoice === choice.id;
                    const showOutcome = showFeedback && isSelected;
                    
                    return (
                      <motion.div
                        key={choice.id}
                        whileHover={!showFeedback ? { scale: 1.02 } : {}}
                      >
                        <Button
                          variant={isSelected ? "default" : "outline"}
                          className={`w-full justify-start text-left h-auto py-4 px-4 ${
                            showFeedback && !isSelected ? "opacity-50" : ""
                          } ${
                            showOutcome && choice.outcome === "good" ? "bg-green-500 hover:bg-green-600" :
                            showOutcome && choice.outcome === "bad" ? "bg-red-500 hover:bg-red-600" :
                            showOutcome && choice.outcome === "okay" ? "bg-yellow-500 hover:bg-yellow-600" : ""
                          }`}
                          onClick={() => !showFeedback && makeChoice(choice.id)}
                          disabled={showFeedback}
                        >
                          <span className="flex items-start gap-3">
                            {showOutcome ? (
                              choice.outcome === "good" ? <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" /> :
                              choice.outcome === "bad" ? <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" /> :
                              <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                            ) : (
                              <ArrowRight className="w-5 h-5 mt-0.5 flex-shrink-0" />
                            )}
                            <span>{choice.text}</span>
                          </span>
                        </Button>
                        
                        {showOutcome && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-2 p-4 rounded-lg bg-muted/50"
                          >
                            <p className="text-sm">{choice.feedback}</p>
                            <p className={`text-sm font-bold mt-2 ${
                              choice.impact > 0 ? "text-green-500" : 
                              choice.impact < 0 ? "text-red-500" : "text-yellow-500"
                            }`}>
                              Score: {choice.impact > 0 ? "+" : ""}{choice.impact}
                            </p>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}

                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 pt-4"
                    >
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentScenario(null)}
                        className="flex-1"
                      >
                        Back to Scenarios
                      </Button>
                      <Button 
                        onClick={() => {
                          const currentIndex = scenarios.findIndex((s) => s.id === currentScenario.id);
                          const nextScenario = scenarios[currentIndex + 1];
                          if (nextScenario) {
                            startScenario(nextScenario);
                          } else {
                            setCurrentScenario(null);
                            toast.success("All scenarios completed! 🎉");
                          }
                        }}
                        className="flex-1"
                      >
                        Next Scenario
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-sm text-muted-foreground mt-12">
          For Education Only - No real money involved. Learn from virtual decisions!
        </p>
      </div>
    </div>
  );
};

export default Simulations;

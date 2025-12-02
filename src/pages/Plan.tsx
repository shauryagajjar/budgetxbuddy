import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Target, PiggyBank, TrendingUp, Shield } from "lucide-react";
import { motion } from "framer-motion";

const Plan = () => {
  const [money, setMoney] = useState("");
  const [goal, setGoal] = useState("");
  const [risk, setRisk] = useState("");
  const [plan, setPlan] = useState<any>(null);

  const generatePlan = () => {
    const amount = Number(money);
    const targetGoal = Number(goal);
    const monthsNeeded = Math.ceil((targetGoal - amount) / (amount * 0.01));

    let allocation: any = {};
    let explanation = "";
    let tips: string[] = [];

    if (risk === "low") {
      allocation = {
        fd: 60,
        gold: 30,
        indexFund: 10
      };
      explanation = "Your plan focuses on safety. Most money goes into Fixed Deposits (guaranteed returns) and Gold (protects against inflation). A small part in Index Funds for some growth.";
      tips = [
        "Fixed Deposits are the safest option",
        "Gold is good for long-term security",
        "This plan grows slowly but safely",
        "Perfect if you need money soon"
      ];
    } else if (risk === "medium") {
      allocation = {
        indexFund: 50,
        gold: 30,
        fd: 20
      };
      explanation = "Your plan balances safety and growth. Half goes into Index Funds (good long-term growth), rest in Gold and FDs for stability.";
      tips = [
        "Index Funds are great for 3-5 years",
        "This mix protects you from big losses",
        "You'll see steady growth over time",
        "Good balance of safety and returns"
      ];
    } else {
      allocation = {
        indexFund: 60,
        stocks: 20,
        gold: 15,
        fd: 5
      };
      explanation = "Your plan focuses on growth. Most money in Index Funds and Stocks for higher returns. Small safety net in Gold and FDs.";
      tips = [
        "Best for 5+ year goals",
        "Expect ups and downs",
        "Higher risk = higher potential returns",
        "Don't panic if market falls short-term"
      ];
    }

    const savingPerMonth = Math.ceil((targetGoal - amount) / 12);
    
    setPlan({
      allocation,
      explanation,
      tips,
      monthsNeeded,
      savingPerMonth,
      currentAmount: amount,
      goalAmount: targetGoal
    });
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Your Money Plan
          </h1>
          <p className="text-xl text-muted-foreground">
            Get a personalized plan based on your goals
          </p>
        </motion.div>

        <Card className="p-8 mb-8 border-2">
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium">How much money do you have now? (₹)</Label>
              <Input
                type="number"
                placeholder="Enter your current savings"
                value={money}
                onChange={(e) => setMoney(e.target.value)}
                className="mt-2 text-lg"
              />
            </div>

            <div>
              <Label className="text-lg font-medium">What's your savings goal? (₹)</Label>
              <Input
                type="number"
                placeholder="What do you want to save for?"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="mt-2 text-lg"
              />
            </div>

            <div>
              <Label className="text-lg font-medium mb-4 block">What's your risk level?</Label>
              <RadioGroup value={risk} onValueChange={setRisk}>
                <div className="space-y-3">
                  <Card className="p-4 cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setRisk("low")}>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="low" id="low" />
                      <Label htmlFor="low" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-bold">Low Risk (Safe & Slow)</p>
                            <p className="text-sm text-muted-foreground">I want my money to be super safe</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </Card>

                  <Card className="p-4 cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setRisk("medium")}>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <PiggyBank className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-bold">Medium Risk (Balanced)</p>
                            <p className="text-sm text-muted-foreground">I want safety and some growth</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </Card>

                  <Card className="p-4 cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setRisk("high")}>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="high" id="high" />
                      <Label htmlFor="high" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <TrendingUp className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="font-bold">High Risk (Growth Focus)</p>
                            <p className="text-sm text-muted-foreground">I want maximum growth over time</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </Card>
                </div>
              </RadioGroup>
            </div>

            <Button
              onClick={generatePlan}
              disabled={!money || !goal || !risk}
              size="lg"
              className="w-full text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              <Target className="w-5 h-5 mr-2" />
              Generate My Plan
            </Button>
          </div>
        </Card>

        {plan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Your Personalized Plan</h2>
              <p className="text-lg text-muted-foreground mb-6">{plan.explanation}</p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-card rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Current Amount</p>
                  <p className="text-2xl font-bold text-primary">₹{plan.currentAmount.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-card rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Goal Amount</p>
                  <p className="text-2xl font-bold text-accent">₹{plan.goalAmount.toLocaleString()}</p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-foreground">Recommended Allocation:</h3>
              <div className="space-y-3 mb-6">
                {Object.entries(plan.allocation).map(([key, value]: [string, any]) => (
                  <div key={key} className="p-4 bg-card rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="text-2xl font-bold text-primary">{value}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-card rounded-lg mb-6">
                <p className="text-sm text-muted-foreground mb-1">Save per month to reach goal</p>
                <p className="text-3xl font-bold text-green-600">₹{plan.savingPerMonth.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-1">Estimated time: {plan.monthsNeeded} months</p>
              </div>

              <h3 className="text-xl font-bold mb-3 text-foreground">Tips for Success:</h3>
              <ul className="space-y-2">
                {plan.tips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 bg-yellow-50 border-yellow-200">
              <p className="text-sm text-yellow-800">
                ⚠️ <strong>Important:</strong> This is a beginner-friendly guide based on your inputs. Real investing should always involve research, parental guidance, and understanding your actual financial situation.
              </p>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Plan;

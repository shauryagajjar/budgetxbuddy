import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Simulator = () => {
  const [virtualMoney, setVirtualMoney] = useState(10000);
  const [investments, setInvestments] = useState({
    indexFund: 0,
    gold: 0,
    fd: 0,
    stocks: 0
  });
  const [inputValues, setInputValues] = useState({
    indexFund: "",
    gold: "",
    fd: "",
    stocks: ""
  });

  const investmentOptions = [
    { 
      key: "indexFund" as const, 
      name: "Index Fund", 
      risk: "Medium", 
      expectedReturn: "10-12%",
      description: "Tracks market, good for long-term",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      key: "gold" as const, 
      name: "Gold", 
      risk: "Low", 
      expectedReturn: "6-8%",
      description: "Safe, protects against inflation",
      color: "from-yellow-500 to-orange-500"
    },
    { 
      key: "fd" as const, 
      name: "Fixed Deposit", 
      risk: "Very Low", 
      expectedReturn: "5-7%",
      description: "Guaranteed returns, very safe",
      color: "from-green-500 to-emerald-500"
    },
    { 
      key: "stocks" as const, 
      name: "Stocks", 
      risk: "High", 
      expectedReturn: "15-20%",
      description: "High risk, high reward potential",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const totalInvested = Object.values(investments).reduce((sum, val) => sum + val, 0);
  const remainingMoney = virtualMoney - totalInvested;

  const handleInvest = (key: keyof typeof investments) => {
    const amount = Number(inputValues[key]);
    if (amount > remainingMoney) {
      toast.error("Not enough money!");
      return;
    }
    if (amount <= 0) {
      toast.error("Enter a valid amount!");
      return;
    }

    setInvestments(prev => ({
      ...prev,
      [key]: prev[key] + amount
    }));
    setInputValues(prev => ({
      ...prev,
      [key]: ""
    }));
    toast.success(`Invested ₹${amount} in ${investmentOptions.find(o => o.key === key)?.name}!`);
  };

  const calculateReturns = () => {
    const returns = {
      indexFund: investments.indexFund * 1.11,
      gold: investments.gold * 1.07,
      fd: investments.fd * 1.06,
      stocks: investments.stocks * (0.85 + Math.random() * 0.4) // Random between -15% to +25%
    };

    const totalReturns = Object.values(returns).reduce((sum, val) => sum + val, 0);
    const profit = totalReturns - totalInvested;
    const percentChange = ((profit / totalInvested) * 100).toFixed(2);

    toast.success(
      `After 1 year: ₹${Math.round(totalReturns)} (${percentChange > "0" ? "+" : ""}${percentChange}%)`,
      { duration: 5000 }
    );

    setVirtualMoney(prev => prev - totalInvested + totalReturns);
    setInvestments({ indexFund: 0, gold: 0, fd: 0, stocks: 0 });
  };

  const handleReset = () => {
    setVirtualMoney(10000);
    setInvestments({ indexFund: 0, gold: 0, fd: 0, stocks: 0 });
    setInputValues({ indexFund: "", gold: "", fd: "", stocks: "" });
    toast.info("Reset to ₹10,000!");
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Investment Simulator
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Practice investing with virtual money (100% fake, 100% educational)
          </p>
          <Card className="p-6 inline-block bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20">
            <p className="text-sm text-muted-foreground mb-2">Your Virtual Money</p>
            <p className="text-5xl font-bold text-primary">₹{virtualMoney.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-2">Available: ₹{remainingMoney.toLocaleString()}</p>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {investmentOptions.map((option, index) => (
            <motion.div
              key={option.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 border-2 hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-3`}>
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{option.name}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      option.risk === "Very Low" ? "bg-green-100 text-green-700" :
                      option.risk === "Low" ? "bg-blue-100 text-blue-700" :
                      option.risk === "Medium" ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {option.risk} Risk
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Expected Return</span>
                    <span className="font-bold text-green-600">{option.expectedReturn}</span>
                  </div>

                  {investments[option.key] > 0 && (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Currently Invested</p>
                      <p className="text-2xl font-bold text-primary">₹{investments[option.key].toLocaleString()}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="Amount"
                        value={inputValues[option.key]}
                        onChange={(e) => setInputValues(prev => ({
                          ...prev,
                          [option.key]: e.target.value
                        }))}
                      />
                    </div>
                    <Button 
                      onClick={() => handleInvest(option.key)}
                      className="bg-gradient-to-r from-primary to-accent"
                    >
                      Invest
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {totalInvested > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-8 mb-6 border-2 border-primary/20">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Your Portfolio</h3>
              
              <div className="space-y-4 mb-6">
                {investmentOptions.map(option => investments[option.key] > 0 && (
                  <div key={option.key}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{option.name}</span>
                      <span className="font-bold">₹{investments[option.key].toLocaleString()} ({((investments[option.key] / totalInvested) * 100).toFixed(1)}%)</span>
                    </div>
                    <Progress 
                      value={(investments[option.key] / totalInvested) * 100}
                      className="h-3"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={calculateReturns}
                  size="lg"
                  className="flex-1 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  See Returns After 1 Year
                </Button>
                <Button 
                  onClick={handleReset}
                  size="lg"
                  variant="outline"
                  className="flex-1 text-lg"
                >
                  Reset Simulator
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        <Card className="p-6 bg-muted/30 border-2">
          <h3 className="font-bold text-lg mb-3 text-foreground">🎓 What You'll Learn:</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>✓ <strong>Risk vs Reward:</strong> Higher risk can mean higher returns, but also higher losses</li>
            <li>✓ <strong>Diversification:</strong> Don't put all money in one place</li>
            <li>✓ <strong>Long-term Thinking:</strong> Real investing works best over years, not days</li>
            <li>✓ <strong>Market Volatility:</strong> Stocks can go up or down randomly</li>
            <li>✓ <strong>Safe Options:</strong> FDs and Gold are stable but grow slower</li>
          </ul>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ <strong>Remember:</strong> This is virtual money only! Real investing requires research, patience, and often adult supervision.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Simulator;

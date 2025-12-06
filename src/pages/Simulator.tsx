import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  TrendingUp, PiggyBank, Coins, 
  BarChart3, Shield, Sparkles, RotateCcw,
  ArrowRight, AlertTriangle, CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";

interface Investment {
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  returnRate: number;
  risk: "Low" | "Medium" | "High";
  description: string;
}

const investments: Investment[] = [
  {
    name: "Fixed Deposit (FD)",
    icon: <Shield className="w-6 h-6" />,
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
    returnRate: 0.06,
    risk: "Low",
    description: "Safe and guaranteed returns from banks"
  },
  {
    name: "Gold",
    icon: <Coins className="w-6 h-6" />,
    color: "text-yellow-600",
    bgColor: "bg-yellow-500/10",
    returnRate: 0.08,
    risk: "Low",
    description: "Traditional safe investment, grows slowly"
  },
  {
    name: "Index Funds",
    icon: <BarChart3 className="w-6 h-6" />,
    color: "text-green-600",
    bgColor: "bg-green-500/10",
    returnRate: 0.12,
    risk: "Medium",
    description: "Follows market average, good for beginners"
  },
  {
    name: "Stock Market",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "text-purple-600",
    bgColor: "bg-purple-500/10",
    returnRate: 0.15,
    risk: "High",
    description: "Higher potential returns, but risky"
  }
];

const STARTING_MONEY = 10000;

const Simulator = () => {
  const [allocations, setAllocations] = useState<number[]>([2500, 2500, 2500, 2500]);
  const [showResults, setShowResults] = useState(false);

  const totalAllocated = allocations.reduce((sum, val) => sum + val, 0);
  const remaining = STARTING_MONEY - totalAllocated;

  const handleSliderChange = (index: number, value: number) => {
    const newAllocations = [...allocations];
    const diff = value - newAllocations[index];
    
    // Check if we have enough remaining or if we're decreasing
    if (diff <= remaining || diff < 0) {
      newAllocations[index] = value;
      setAllocations(newAllocations);
    } else {
      // Set to max possible
      newAllocations[index] = allocations[index] + remaining;
      setAllocations(newAllocations);
    }
  };

  const calculateResults = () => {
    return investments.map((inv, index) => {
      const invested = allocations[index];
      const returns = invested * inv.returnRate;
      const finalValue = invested + returns;
      return {
        ...inv,
        invested,
        returns,
        finalValue
      };
    });
  };

  const results = calculateResults();
  const totalFinalValue = results.reduce((sum, r) => sum + r.finalValue, 0);
  const totalReturns = totalFinalValue - totalAllocated;
  const returnPercentage = totalAllocated > 0 ? (totalReturns / totalAllocated) * 100 : 0;

  const getDiversificationScore = () => {
    const nonZeroCount = allocations.filter(a => a > 0).length;
    if (nonZeroCount === 4) return { score: "Excellent", color: "text-green-600", message: "Great job! You spread your money across all options." };
    if (nonZeroCount === 3) return { score: "Good", color: "text-blue-600", message: "Nice diversification! Consider spreading a bit more." };
    if (nonZeroCount === 2) return { score: "Okay", color: "text-yellow-600", message: "Try adding more variety to reduce risk." };
    return { score: "Risky", color: "text-red-600", message: "Putting all eggs in one basket is risky!" };
  };

  const resetSimulation = () => {
    setAllocations([2500, 2500, 2500, 2500]);
    setShowResults(false);
  };

  const diversification = getDiversificationScore();

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <PiggyBank className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Investment Simulator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            You have <span className="font-bold text-primary">₹{STARTING_MONEY.toLocaleString('en-IN')}</span> virtual money. 
            Decide how to invest it and see what happens after 1 year!
          </p>
          <p className="text-sm text-muted-foreground mt-4 bg-muted/50 inline-block px-4 py-2 rounded-full">
            📚 For education only — virtual simulation, no real money
          </p>
        </motion.div>

        {!showResults ? (
          <>
            {/* Allocation Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-foreground">Allocate Your Money</h2>
                  <div className={`px-4 py-2 rounded-full ${remaining === 0 ? 'bg-green-500/10 text-green-600' : 'bg-yellow-500/10 text-yellow-600'}`}>
                    {remaining === 0 ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> All allocated!
                      </span>
                    ) : (
                      <span>₹{remaining.toLocaleString('en-IN')} left</span>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {investments.map((inv, index) => (
                    <div key={inv.name} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl ${inv.bgColor} flex items-center justify-center ${inv.color}`}>
                            {inv.icon}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{inv.name}</p>
                            <p className="text-xs text-muted-foreground">{inv.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground">₹{allocations[index].toLocaleString('en-IN')}</p>
                          <p className={`text-xs ${
                            inv.risk === 'Low' ? 'text-green-600' : 
                            inv.risk === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {inv.risk} Risk • ~{(inv.returnRate * 100).toFixed(0)}% return
                          </p>
                        </div>
                      </div>
                      <Slider
                        value={[allocations[index]]}
                        onValueChange={([v]) => handleSliderChange(index, v)}
                        min={0}
                        max={STARTING_MONEY}
                        step={100}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Diversification Tip */}
              <Card className="p-4 mb-6 bg-muted/30">
                <div className="flex items-start gap-3">
                  <Sparkles className={`w-5 h-5 ${diversification.color} flex-shrink-0 mt-0.5`} />
                  <div>
                    <p className="font-semibold text-foreground">
                      Diversification: <span className={diversification.color}>{diversification.score}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{diversification.message}</p>
                  </div>
                </div>
              </Card>

              {/* Action Button */}
              <div className="text-center">
                <Button 
                  size="lg" 
                  onClick={() => setShowResults(true)}
                  disabled={totalAllocated === 0}
                  className="gap-2"
                >
                  See Results After 1 Year <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </>
        ) : (
          <>
            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Summary Card */}
              <Card className="p-6 mb-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <h2 className="text-xl font-bold text-foreground mb-4 text-center">
                  Your Portfolio After 1 Year
                </h2>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Invested</p>
                    <p className="text-2xl font-bold text-foreground">₹{totalAllocated.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Returns</p>
                    <p className="text-2xl font-bold text-green-600">+₹{Math.round(totalReturns).toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Final Value</p>
                    <p className="text-2xl font-bold text-primary">₹{Math.round(totalFinalValue).toLocaleString('en-IN')}</p>
                  </div>
                </div>
                <p className="text-center mt-4 text-muted-foreground">
                  Overall Return: <span className="font-bold text-green-600">+{returnPercentage.toFixed(1)}%</span>
                </p>
              </Card>

              {/* Individual Results */}
              <Card className="p-6 mb-6">
                <h3 className="font-bold text-foreground mb-4">Breakdown by Investment</h3>
                <div className="space-y-4">
                  {results.map((result) => (
                    <div key={result.name} className={`p-4 rounded-xl ${result.bgColor}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={result.color}>{result.icon}</div>
                          <div>
                            <p className="font-semibold text-foreground">{result.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Invested: ₹{result.invested.toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground">₹{Math.round(result.finalValue).toLocaleString('en-IN')}</p>
                          <p className="text-xs text-green-600">
                            +₹{Math.round(result.returns).toLocaleString('en-IN')} ({(result.returnRate * 100).toFixed(0)}%)
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Learning Cards */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <Card className="p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">About Risk</p>
                      <p className="text-sm text-muted-foreground">
                        Higher returns usually mean higher risk. Stock market can give 15%+ but can also lose money. FD is safe but grows slowly.
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Diversification</p>
                      <p className="text-sm text-muted-foreground">
                        Don't put all eggs in one basket! Spreading money across options reduces overall risk while still growing your wealth.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Reset Button */}
              <div className="text-center">
                <Button variant="outline" size="lg" onClick={resetSimulation} className="gap-2">
                  <RotateCcw className="w-4 h-4" /> Try Different Allocation
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Simulator;

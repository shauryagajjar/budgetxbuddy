import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { 
  Rocket, Code, Calculator, Palette, Wrench, 
  Home, Utensils, Bus, Smartphone, 
  ShoppingBag, Coffee, Tv, Plane,
  PiggyBank, Building, TrendingUp, BarChart3, Coins,
  Zap, AlertTriangle, Gift, Trophy, Star,
  ArrowRight, RotateCcw, Play
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

type GameStep = "hero" | "stream" | "setup" | "monthly" | "event" | "final";

interface Stream {
  id: string;
  name: string;
  careers: string[];
  salary: number;
  difficulty: string;
  icon: React.ReactNode;
  color: string;
}

interface Portfolio {
  cash: number;
  fd: number;
  sip: number;
  indexFund: number;
  gold: number;
}

interface MonthData {
  month: number;
  netWorth: number;
  event?: string;
}

interface GameEvent {
  name: string;
  impact: number;
  type: "positive" | "negative";
  icon: React.ReactNode;
}

const streams: Stream[] = [
  {
    id: "science",
    name: "Science",
    careers: ["Software Engineer", "Mechanical Engineer", "Data Analyst", "Doctor (Intern)"],
    salary: 3000,
    difficulty: "Medium",
    icon: <Code className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "commerce",
    name: "Commerce",
    careers: ["Accountant", "Junior Finance Associate", "Marketing Intern", "Business Analyst"],
    salary: 2200,
    difficulty: "Easy",
    icon: <Calculator className="w-8 h-8" />,
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "arts",
    name: "Arts / Humanities",
    careers: ["Graphic Designer", "Content Creator", "Media Assistant", "Social Science Intern"],
    salary: 1800,
    difficulty: "Easy",
    icon: <Palette className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "vocational",
    name: "Vocational / Skill-Based",
    careers: ["Electrician Apprentice", "Technician", "Carpenter Assistant", "Mobile Repair Trainee"],
    salary: 2000,
    difficulty: "Easy",
    icon: <Wrench className="w-8 h-8" />,
    color: "from-orange-500 to-amber-500"
  }
];

const FIXED_EXPENSES = {
  rent: 700,
  food: 400,
  transport: 200,
  phone: 150
};

const TOTAL_FIXED = Object.values(FIXED_EXPENSES).reduce((a, b) => a + b, 0);

const gameEvents: GameEvent[] = [
  { name: "Phone broke", impact: -300, type: "negative", icon: <Smartphone /> },
  { name: "Medical emergency", impact: -400, type: "negative", icon: <AlertTriangle /> },
  { name: "Festival bonus", impact: 500, type: "positive", icon: <Gift /> },
  { name: "Scholarship reward", impact: 300, type: "positive", icon: <Trophy /> },
  { name: "Transport fine", impact: -200, type: "negative", icon: <Bus /> },
  { name: "Freelance gig", impact: 350, type: "positive", icon: <Star /> },
  { name: "Extra rent due", impact: -250, type: "negative", icon: <Home /> },
  { name: "Friend repays loan", impact: 200, type: "positive", icon: <Coins /> },
  { name: "Lost wallet", impact: -150, type: "negative", icon: <AlertTriangle /> },
  { name: "Side project income", impact: 400, type: "positive", icon: <Zap /> }
];

const LifeMoneyGame = () => {
  const [step, setStep] = useState<GameStep>("hero");
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const [currentMonth, setCurrentMonth] = useState(1);
  const [totalMonths] = useState(12);
  
  const [portfolio, setPortfolio] = useState<Portfolio>({
    cash: 0, fd: 0, sip: 0, indexFund: 0, gold: 0
  });
  
  const [wants, setWants] = useState({
    eatingOut: 0,
    shopping: 0,
    subscriptions: 0,
    entertainment: 0
  });
  
  const [investments, setInvestments] = useState({
    cash: 0, fd: 0, sip: 0, indexFund: 0, gold: 0
  });
  
  const [monthHistory, setMonthHistory] = useState<MonthData[]>([]);
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);
  const [totalWantsSpent, setTotalWantsSpent] = useState(0);
  const [negativeMonths, setNegativeMonths] = useState(0);
  const [investedEveryMonth, setInvestedEveryMonth] = useState(true);

  const moneyAfterNeeds = selectedStream ? selectedStream.salary - TOTAL_FIXED : 0;
  const totalWants = Object.values(wants).reduce((a, b) => a + b, 0);
  const totalInvestments = Object.values(investments).reduce((a, b) => a + b, 0);
  const unallocated = moneyAfterNeeds - totalWants - totalInvestments;

  const handleStreamSelect = (stream: Stream) => {
    setSelectedStream(stream);
    setStep("setup");
  };

  const startSimulation = () => {
    setPortfolio({ cash: 0, fd: 0, sip: 0, indexFund: 0, gold: 0 });
    setCurrentMonth(1);
    setMonthHistory([]);
    setStep("monthly");
  };

  const lockMonthChoices = () => {
    if (unallocated < 0) {
      toast.error("You've allocated more than you have!");
      return;
    }

    if (totalInvestments === 0) {
      setInvestedEveryMonth(false);
    }

    const newPortfolio = {
      cash: portfolio.cash + investments.cash + unallocated,
      fd: portfolio.fd + investments.fd,
      sip: portfolio.sip + investments.sip,
      indexFund: portfolio.indexFund + investments.indexFund,
      gold: portfolio.gold + investments.gold
    };

    setTotalWantsSpent(prev => prev + totalWants);

    if (currentMonth % 12 === 0) {
      newPortfolio.fd *= 1.05;
      newPortfolio.sip *= 1.08;
      newPortfolio.indexFund *= 1.10;
      newPortfolio.gold *= 1.06;
    }

    setPortfolio(newPortfolio);
    
    const event = gameEvents[Math.floor(Math.random() * gameEvents.length)];
    setCurrentEvent(event);
    setStep("event");
  };

  const processEvent = () => {
    if (!currentEvent) return;

    const newCash = portfolio.cash + currentEvent.impact;
    if (newCash < 0) {
      setNegativeMonths(prev => prev + 1);
    }
    
    setPortfolio(prev => ({
      ...prev,
      cash: Math.max(0, newCash)
    }));

    const netWorth = portfolio.cash + currentEvent.impact + portfolio.fd + portfolio.sip + portfolio.indexFund + portfolio.gold;
    
    setMonthHistory(prev => [...prev, {
      month: currentMonth,
      netWorth: Math.round(netWorth),
      event: currentEvent.name
    }]);

    setWants({ eatingOut: 0, shopping: 0, subscriptions: 0, entertainment: 0 });
    setInvestments({ cash: 0, fd: 0, sip: 0, indexFund: 0, gold: 0 });

    if (currentMonth >= totalMonths) {
      setStep("final");
    } else {
      setCurrentMonth(prev => prev + 1);
      setStep("monthly");
    }
  };

  const calculateHealthScore = () => {
    let score = 0;
    if (investedEveryMonth) score += 30;
    if (negativeMonths === 0) score += 30;
    
    const totalIncome = selectedStream ? selectedStream.salary * totalMonths : 0;
    const wantsPercentage = (totalWantsSpent / totalIncome) * 100;
    if (wantsPercentage < 40) score += 20;
    
    const finalNetWorth = portfolio.cash + portfolio.fd + portfolio.sip + portfolio.indexFund + portfolio.gold;
    if (finalNetWorth > 0) score += 20;
    
    return Math.min(100, score);
  };

  const getInsights = () => {
    const insights: string[] = [];
    
    if (portfolio.sip > 500) {
      insights.push("Consistent SIP contributions increased your long-term growth potential.");
    }
    
    if (negativeMonths > 0) {
      insights.push(`You faced ${negativeMonths} month(s) with negative cash. Building an emergency fund helps!`);
    }
    
    if (investedEveryMonth) {
      insights.push("Great job investing every month! Consistency is key to wealth building.");
    }
    
    if (portfolio.indexFund > portfolio.fd) {
      insights.push("Index funds grew faster than FDs, showing the power of market returns.");
    }
    
    if (totalWantsSpent > (selectedStream?.salary || 0) * totalMonths * 0.3) {
      insights.push("You spent over 30% on wants. Consider reducing discretionary spending.");
    }
    
    return insights.slice(0, 5);
  };

  const resetGame = () => {
    setStep("hero");
    setSelectedStream(null);
    setCurrentMonth(1);
    setPortfolio({ cash: 0, fd: 0, sip: 0, indexFund: 0, gold: 0 });
    setWants({ eatingOut: 0, shopping: 0, subscriptions: 0, entertainment: 0 });
    setInvestments({ cash: 0, fd: 0, sip: 0, indexFund: 0, gold: 0 });
    setMonthHistory([]);
    setCurrentEvent(null);
    setTotalWantsSpent(0);
    setNegativeMonths(0);
    setInvestedEveryMonth(true);
  };

  const finalNetWorth = portfolio.cash + portfolio.fd + portfolio.sip + portfolio.indexFund + portfolio.gold;
  const pieData = [
    { name: "Needs", value: TOTAL_FIXED * totalMonths, color: "#06b6d4" },
    { name: "Wants", value: totalWantsSpent, color: "#f59e0b" },
    { name: "Savings/Investments", value: finalNetWorth, color: "#10b981" }
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <AnimatePresence mode="wait">
          {/* HERO SECTION */}
          {step === "hero" && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <div className="max-w-3xl mx-auto">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center"
                >
                  <Rocket className="w-12 h-12 text-primary-foreground" />
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
                  Live Your Future Money Life —<br />
                  <span className="text-primary">Before Real Life Starts</span>
                </h1>
                
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                  Choose a stream, earn virtual income, spend, save, invest, and watch your life unfold.
                </p>
                
                <Button 
                  size="lg" 
                  onClick={() => setStep("stream")}
                  className="text-lg px-10 py-6 rounded-2xl bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Simulation
                </Button>
                
                <div className="mt-12 p-6 bg-muted/50 rounded-2xl border border-border">
                  <p className="text-sm text-muted-foreground">
                    🎓 <strong>100% Virtual</strong> — Practice financial decisions with virtual coins, zero real risk!
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* STREAM SELECTION */}
          {step === "stream" && (
            <motion.div
              key="stream"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-3">Choose Your Stream</h2>
                <p className="text-muted-foreground">Pick a career path to start your financial journey</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {streams.map((stream, index) => (
                  <motion.div
                    key={stream.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      className="p-6 cursor-pointer border-2 hover:border-primary/50 transition-all hover:shadow-lg group"
                      onClick={() => handleStreamSelect(stream)}
                    >
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stream.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                        {stream.icon}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-foreground mb-2">{stream.name}</h3>
                      
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">Career paths:</p>
                        <div className="flex flex-wrap gap-2">
                          {stream.careers.map(career => (
                            <span key={career} className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                              {career}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <p className="text-sm text-muted-foreground">Starting Salary</p>
                          <p className="text-2xl font-bold text-primary">{stream.salary} <span className="text-sm font-normal">coins/mo</span></p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          stream.difficulty === "Easy" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {stream.difficulty}
                        </span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SETUP */}
          {step === "setup" && selectedStream && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-3">Your Starting Setup</h2>
                <p className="text-muted-foreground">Here's your monthly financial picture</p>
              </div>

              <Card className="p-8 mb-6 border-2">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedStream.color} flex items-center justify-center text-white`}>
                      {selectedStream.icon}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Stream Selected</p>
                      <p className="text-xl font-bold text-foreground">{selectedStream.name}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-xl">
                      <p className="text-sm text-muted-foreground mb-1">Starting Salary</p>
                      <p className="text-2xl font-bold text-primary">{selectedStream.salary} coins</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-xl">
                      <p className="text-sm text-muted-foreground mb-1">Fixed Expenses</p>
                      <p className="text-2xl font-bold text-destructive">-{TOTAL_FIXED} coins</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/30 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-3">Fixed Monthly Costs (Cannot Change)</p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between"><span><Home className="w-4 h-4 inline mr-2" />Rent/Hostel</span><span className="font-bold">{FIXED_EXPENSES.rent}</span></div>
                      <div className="flex justify-between"><span><Utensils className="w-4 h-4 inline mr-2" />Food</span><span className="font-bold">{FIXED_EXPENSES.food}</span></div>
                      <div className="flex justify-between"><span><Bus className="w-4 h-4 inline mr-2" />Transport</span><span className="font-bold">{FIXED_EXPENSES.transport}</span></div>
                      <div className="flex justify-between"><span><Smartphone className="w-4 h-4 inline mr-2" />Phone/Internet</span><span className="font-bold">{FIXED_EXPENSES.phone}</span></div>
                    </div>
                  </div>

                  <div className="p-4 bg-primary/10 rounded-xl border-2 border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">Money Left to Decide</p>
                    <p className="text-3xl font-bold text-primary">{moneyAfterNeeds} coins</p>
                  </div>
                </div>
              </Card>

              <Button 
                size="lg" 
                onClick={startSimulation}
                className="w-full text-lg py-6 rounded-2xl"
              >
                Start Month 1 <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}

          {/* MONTHLY DECISION BOARD */}
          {step === "monthly" && selectedStream && (
            <motion.div
              key="monthly"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Month {currentMonth}</h2>
                  <p className="text-muted-foreground">Make your financial decisions</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <Progress value={(currentMonth / totalMonths) * 100} className="w-32 h-2" />
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* NEEDS */}
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Home className="w-5 h-5 text-primary" /> Needs (Fixed)
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground">Rent/Hostel</span>
                      <span className="font-bold">{FIXED_EXPENSES.rent}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground">Food</span>
                      <span className="font-bold">{FIXED_EXPENSES.food}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground">Transport</span>
                      <span className="font-bold">{FIXED_EXPENSES.transport}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-muted-foreground">Phone/Internet</span>
                      <span className="font-bold">{FIXED_EXPENSES.phone}</span>
                    </div>
                    <div className="pt-3 border-t border-border">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total Needs</span>
                        <span className="text-destructive">{TOTAL_FIXED}</span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* WANTS */}
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-amber-500" /> Wants (You Decide)
                  </h3>
                  <div className="space-y-5">
                    {[
                      { key: "eatingOut", label: "Eating Out", icon: <Coffee className="w-4 h-4" />, max: 500 },
                      { key: "shopping", label: "Shopping", icon: <ShoppingBag className="w-4 h-4" />, max: 400 },
                      { key: "subscriptions", label: "Subscriptions", icon: <Tv className="w-4 h-4" />, max: 300 },
                      { key: "entertainment", label: "Entertainment", icon: <Plane className="w-4 h-4" />, max: 500 }
                    ].map(item => (
                      <div key={item.key}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-muted-foreground flex items-center gap-2">{item.icon} {item.label}</span>
                          <span className="font-bold">{wants[item.key as keyof typeof wants]}</span>
                        </div>
                        <Slider
                          value={[wants[item.key as keyof typeof wants]]}
                          onValueChange={([v]) => setWants(prev => ({ ...prev, [item.key]: v }))}
                          max={item.max}
                          step={10}
                          className="w-full"
                        />
                      </div>
                    ))}
                    <div className="pt-3 border-t border-border">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total Wants</span>
                        <span className="text-amber-500">{totalWants}</span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* INVESTMENTS */}
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" /> Savings & Investments
                  </h3>
                  <div className="space-y-5">
                    {[
                      { key: "cash", label: "Cash Savings", icon: <PiggyBank className="w-4 h-4" />, max: 800 },
                      { key: "fd", label: "Fixed Deposit (+5%/yr)", icon: <Building className="w-4 h-4" />, max: 600 },
                      { key: "sip", label: "SIP (+8%/yr)", icon: <TrendingUp className="w-4 h-4" />, max: 500 },
                      { key: "indexFund", label: "Index Fund (+10%/yr)", icon: <BarChart3 className="w-4 h-4" />, max: 500 },
                      { key: "gold", label: "Gold (+6%/yr)", icon: <Coins className="w-4 h-4" />, max: 400 }
                    ].map(item => (
                      <div key={item.key}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-muted-foreground flex items-center gap-2">{item.icon} {item.label}</span>
                          <span className="font-bold">{investments[item.key as keyof typeof investments]}</span>
                        </div>
                        <Slider
                          value={[investments[item.key as keyof typeof investments]]}
                          onValueChange={([v]) => setInvestments(prev => ({ ...prev, [item.key]: v }))}
                          max={item.max}
                          step={10}
                          className="w-full"
                        />
                      </div>
                    ))}
                    <div className="pt-3 border-t border-border">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total Investments</span>
                        <span className="text-green-500">{totalInvestments}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Summary Bar */}
              <Card className="mt-6 p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Income</p>
                      <p className="text-xl font-bold text-foreground">{selectedStream.salary}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">After Needs</p>
                      <p className="text-xl font-bold text-primary">{moneyAfterNeeds}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Unallocated</p>
                      <p className={`text-xl font-bold ${unallocated < 0 ? 'text-destructive' : 'text-green-500'}`}>
                        {unallocated}
                      </p>
                    </div>
                  </div>
                  <Button 
                    size="lg" 
                    onClick={lockMonthChoices}
                    disabled={unallocated < 0}
                    className="rounded-xl"
                  >
                    Lock Choices <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* EVENT */}
          {step === "event" && currentEvent && (
            <motion.div
              key="event"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-md mx-auto text-center py-12"
            >
              <Card className={`p-8 border-4 ${currentEvent.type === "positive" ? "border-green-500 bg-green-50 dark:bg-green-950" : "border-red-500 bg-red-50 dark:bg-red-950"}`}>
                <motion.div
                  initial={{ rotate: -10 }}
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-white ${
                    currentEvent.type === "positive" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  <div className="w-10 h-10">{currentEvent.icon}</div>
                </motion.div>

                <h3 className="text-xl font-bold text-foreground mb-2">Life Event!</h3>
                <p className="text-2xl font-bold mb-4">{currentEvent.name}</p>
                
                <p className={`text-4xl font-bold ${currentEvent.type === "positive" ? "text-green-600" : "text-red-600"}`}>
                  {currentEvent.impact > 0 ? "+" : ""}{currentEvent.impact} coins
                </p>

                <Button 
                  size="lg" 
                  onClick={processEvent}
                  className="mt-8 rounded-xl"
                >
                  {currentMonth >= totalMonths ? "See Final Results" : "Continue to Next Month"}
                </Button>
              </Card>
            </motion.div>
          )}

          {/* FINAL DASHBOARD */}
          {step === "final" && selectedStream && (
            <motion.div
              key="final"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-8">
                <Trophy className="w-16 h-16 mx-auto text-amber-500 mb-4" />
                <h2 className="text-3xl font-bold text-foreground mb-2">Simulation Complete!</h2>
                <p className="text-muted-foreground">Here's how you managed your money over {totalMonths} months</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                {/* Net Worth Chart */}
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Net Worth Over Time</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={monthHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="netWorth" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: "hsl(var(--primary))" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>

                {/* Spending Breakdown */}
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Spending Breakdown</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Final Values */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                <Card className="p-4 text-center">
                  <PiggyBank className="w-8 h-8 mx-auto text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Cash</p>
                  <p className="text-2xl font-bold">{Math.round(portfolio.cash)}</p>
                </Card>
                <Card className="p-4 text-center">
                  <Building className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                  <p className="text-sm text-muted-foreground">FD</p>
                  <p className="text-2xl font-bold">{Math.round(portfolio.fd)}</p>
                </Card>
                <Card className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto text-green-500 mb-2" />
                  <p className="text-sm text-muted-foreground">SIP</p>
                  <p className="text-2xl font-bold">{Math.round(portfolio.sip)}</p>
                </Card>
                <Card className="p-4 text-center">
                  <BarChart3 className="w-8 h-8 mx-auto text-purple-500 mb-2" />
                  <p className="text-sm text-muted-foreground">Index Fund</p>
                  <p className="text-2xl font-bold">{Math.round(portfolio.indexFund)}</p>
                </Card>
                <Card className="p-4 text-center">
                  <Coins className="w-8 h-8 mx-auto text-amber-500 mb-2" />
                  <p className="text-sm text-muted-foreground">Gold</p>
                  <p className="text-2xl font-bold">{Math.round(portfolio.gold)}</p>
                </Card>
              </div>

              {/* Health Score */}
              <Card className="p-8 mb-8 text-center bg-gradient-to-r from-primary/10 to-accent/10">
                <h3 className="text-lg font-bold text-foreground mb-4">Money Health Score</h3>
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="hsl(var(--muted))" strokeWidth="12" fill="none" />
                    <circle 
                      cx="64" cy="64" r="56" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth="12" 
                      fill="none"
                      strokeDasharray={`${(calculateHealthScore() / 100) * 352} 352`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-foreground">{calculateHealthScore()}</span>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {calculateHealthScore() >= 80 ? "Excellent! You're a financial pro!" :
                   calculateHealthScore() >= 60 ? "Good job! Keep improving!" :
                   calculateHealthScore() >= 40 ? "Not bad, but there's room to grow." :
                   "Keep learning and try again!"}
                </p>
              </Card>

              {/* Insights */}
              <Card className="p-6 mb-8">
                <h3 className="text-lg font-bold text-foreground mb-4">Reflection Insights</h3>
                <ul className="space-y-3">
                  {getInsights().map((insight, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <Star className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{insight}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" onClick={startSimulation} className="rounded-xl">
                  <RotateCcw className="w-4 h-4 mr-2" /> Play Same Stream
                </Button>
                <Button size="lg" variant="outline" onClick={resetGame} className="rounded-xl">
                  Try Different Stream
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LifeMoneyGame;

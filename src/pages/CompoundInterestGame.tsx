import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Play, RotateCcw, TrendingUp, Wallet, Sparkles, Target, AlertTriangle, Gift, PiggyBank, Lightbulb, Trophy, Star, BookOpen } from "lucide-react";

interface GameState {
  year: number;
  balance: number;
  totalInvested: number;
  totalInterest: number;
  monthlyHistory: { year: number; balance: number; interest: number }[];
  decisions: { year: number; event: string; choice: string; impact: number; isGood: boolean }[];
  currentEvent: GameEvent | null;
  gamePhase: "start" | "playing" | "event" | "result" | "end";
  investmentType: "index" | "fd" | "gold";
}

interface GameEvent {
  id: string;
  type: "save" | "investment" | "discipline" | "risk" | "bonus";
  title: string;
  description: string;
  options: { label: string; impact: number; isGood: boolean; description: string }[];
}

interface GameSettings {
  startingMoney: number;
  monthlySaving: number;
  returnRate: number;
  compoundingFrequency: "daily" | "monthly" | "yearly";
  duration: number;
}

const EVENTS: GameEvent[] = [
  {
    id: "festival",
    type: "save",
    title: "Festival Bonus! 🎉",
    description: "You received ₹1,000 as a festival gift from your family!",
    options: [
      { label: "Save Full Amount", impact: 1000, isGood: true, description: "Add ₹1,000 to your savings" },
      { label: "Save Half", impact: 500, isGood: true, description: "Add ₹500, spend ₹500" },
      { label: "Spend It All", impact: 0, isGood: false, description: "Enjoy now, save nothing" }
    ]
  },
  {
    id: "investment",
    type: "investment",
    title: "Investment Choice 📊",
    description: "It's time to decide where to put your money this year.",
    options: [
      { label: "Index Fund (8%)", impact: 8, isGood: true, description: "Higher returns, compounding yearly" },
      { label: "Fixed Deposit (6%)", impact: 6, isGood: true, description: "Safe but simple interest" },
      { label: "Gold (4%)", impact: 4, isGood: false, description: "Stable but lower growth" }
    ]
  },
  {
    id: "discipline",
    type: "discipline",
    title: "Savings Slip 😅",
    description: "Oops! You skipped saving for 2 months due to expenses.",
    options: [
      { label: "Adjust Budget & Continue", impact: 0, isGood: true, description: "No penalty, learn from it" },
      { label: "Ignore & Move On", impact: -400, isGood: false, description: "Lose 2 months of savings (₹400)" }
    ]
  },
  {
    id: "market_dip",
    type: "risk",
    title: "Market Dip! 📉",
    description: "The market temporarily drops by 5%. What do you do?",
    options: [
      { label: "Stay Invested", impact: 0, isGood: true, description: "Market recovers, no loss" },
      { label: "Panic Sell", impact: -5, isGood: false, description: "Lock in 5% loss permanently" }
    ]
  },
  {
    id: "freelance",
    type: "bonus",
    title: "Side Hustle Success! 💼",
    description: "You earned ₹2,000 from freelance work!",
    options: [
      { label: "Invest All", impact: 2000, isGood: true, description: "Grow your wealth faster" },
      { label: "Save Half", impact: 1000, isGood: true, description: "Balance saving and spending" },
      { label: "Spend It", impact: 0, isGood: false, description: "Treat yourself, save nothing" }
    ]
  },
  {
    id: "birthday",
    type: "save",
    title: "Birthday Money! 🎂",
    description: "You received ₹1,500 for your birthday!",
    options: [
      { label: "Invest It All", impact: 1500, isGood: true, description: "Add ₹1,500 to investments" },
      { label: "Save Some", impact: 750, isGood: true, description: "Save ₹750, spend ₹750" },
      { label: "Party Time", impact: 0, isGood: false, description: "Celebrate now, save later" }
    ]
  },
  {
    id: "expense",
    type: "discipline",
    title: "Unexpected Expense 🔧",
    description: "Your phone screen cracked! Repair costs ₹800.",
    options: [
      { label: "Use Emergency Fund", impact: -800, isGood: true, description: "Pay from savings (smart!)" },
      { label: "Skip This Month's Saving", impact: -200, isGood: false, description: "Delay investing, borrow rest" }
    ]
  },
  {
    id: "opportunity",
    type: "bonus",
    title: "Learning Opportunity 📚",
    description: "A ₹500 online course could boost your skills.",
    options: [
      { label: "Invest in Yourself", impact: -500, isGood: true, description: "Spend on learning (future gains!)" },
      { label: "Skip It", impact: 0, isGood: false, description: "Save money, miss opportunity" }
    ]
  }
];

const SMART_TIPS = [
  "💡 Compounding needs time, not genius. Start early!",
  "💡 Staying invested beats timing the market.",
  "💡 Saving habits matter more than income at your age.",
  "💡 Panic selling destroys returns. Stay calm!",
  "💡 Rule of 72: Divide 72 by interest rate = years to double.",
  "💡 Small monthly savings grow huge with compounding.",
  "💡 Compound interest is interest on interest!",
  "💡 The earlier you start, the less you need to save.",
  "💡 Consistency beats perfection in investing.",
  "💡 Your money works while you sleep!"
];

const CompoundInterestGame = () => {
  const [mode, setMode] = useState<"default" | "custom" | "advanced">("default");
  const [settings, setSettings] = useState<GameSettings>({
    startingMoney: 500,
    monthlySaving: 200,
    returnRate: 8,
    compoundingFrequency: "monthly",
    duration: 10
  });
  
  const [gameState, setGameState] = useState<GameState>({
    year: 0,
    balance: 500,
    totalInvested: 500,
    totalInterest: 0,
    monthlyHistory: [{ year: 0, balance: 500, interest: 0 }],
    decisions: [],
    currentEvent: null,
    gamePhase: "start",
    investmentType: "index"
  });

  const [showTip, setShowTip] = useState(false);
  const [currentTip, setCurrentTip] = useState("");
  const [showNotes, setShowNotes] = useState(false);

  const calculateCompoundInterest = (principal: number, rate: number, frequency: string, years: number): number => {
    const n = frequency === "daily" ? 365 : frequency === "monthly" ? 12 : 1;
    const r = rate / 100;
    return principal * Math.pow(1 + r / n, n * years);
  };

  const startGame = () => {
    const initial = mode === "custom" ? settings.startingMoney : 500;
    setGameState({
      year: 1,
      balance: initial,
      totalInvested: initial,
      totalInterest: 0,
      monthlyHistory: [{ year: 0, balance: initial, interest: 0 }],
      decisions: [],
      currentEvent: null,
      gamePhase: "event",
      investmentType: "index"
    });
    triggerRandomEvent();
  };

  const triggerRandomEvent = () => {
    const randomEvent = EVENTS[Math.floor(Math.random() * EVENTS.length)];
    setGameState(prev => ({
      ...prev,
      currentEvent: randomEvent,
      gamePhase: "event"
    }));
  };

  const handleChoice = (option: { label: string; impact: number; isGood: boolean; description: string }) => {
    const monthlySaving = mode === "custom" ? settings.monthlySaving : 200;
    const returnRate = mode === "custom" ? settings.returnRate : 8;
    
    setGameState(prev => {
      let newBalance = prev.balance;
      let impactType = "add";
      
      // Handle different event types
      if (prev.currentEvent?.type === "investment") {
        // Change investment type based on choice
        const investmentType = option.label.includes("Index") ? "index" : 
                              option.label.includes("Fixed") ? "fd" : "gold";
        return { ...prev, investmentType };
      } else if (prev.currentEvent?.type === "risk" && option.impact < 0) {
        // Percentage loss
        newBalance = prev.balance * (1 + option.impact / 100);
        impactType = "percent";
      } else {
        // Direct amount change
        newBalance = prev.balance + option.impact;
      }

      // Add yearly savings
      const yearlySavings = monthlySaving * 12;
      newBalance += yearlySavings;

      // Calculate interest based on investment type
      let interestRate = returnRate;
      if (prev.investmentType === "fd") interestRate = 6;
      if (prev.investmentType === "gold") interestRate = 4;
      
      const interestEarned = newBalance * (interestRate / 100);
      newBalance += interestEarned;

      const newHistory = [...prev.monthlyHistory, {
        year: prev.year,
        balance: Math.round(newBalance),
        interest: Math.round(interestEarned)
      }];

      const newDecisions = [...prev.decisions, {
        year: prev.year,
        event: prev.currentEvent?.title || "",
        choice: option.label,
        impact: option.impact,
        isGood: option.isGood
      }];

      return {
        ...prev,
        balance: Math.round(newBalance),
        totalInvested: prev.totalInvested + yearlySavings + (option.impact > 0 ? option.impact : 0),
        totalInterest: prev.totalInterest + interestEarned,
        monthlyHistory: newHistory,
        decisions: newDecisions,
        gamePhase: "result"
      };
    });

    // Show smart tip
    setCurrentTip(SMART_TIPS[gameState.year % SMART_TIPS.length]);
    setShowTip(true);
    setTimeout(() => setShowTip(false), 3000);
  };

  const nextYear = () => {
    const maxYears = mode === "advanced" ? settings.duration : 10;
    
    if (gameState.year >= maxYears) {
      setGameState(prev => ({ ...prev, gamePhase: "end" }));
    } else {
      setGameState(prev => ({
        ...prev,
        year: prev.year + 1,
        gamePhase: "event"
      }));
      triggerRandomEvent();
    }
  };

  const resetGame = () => {
    setGameState({
      year: 0,
      balance: settings.startingMoney,
      totalInvested: settings.startingMoney,
      totalInterest: 0,
      monthlyHistory: [{ year: 0, balance: settings.startingMoney, interest: 0 }],
      decisions: [],
      currentEvent: null,
      gamePhase: "start",
      investmentType: "index"
    });
  };

  const goodDecisions = gameState.decisions.filter(d => d.isGood);
  const badDecisions = gameState.decisions.filter(d => !d.isGood);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-background to-emerald-50">
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* START SCREEN */}
          {gameState.gamePhase === "start" && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="mb-8">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block mb-4"
                >
                  <Sparkles className="h-16 w-16 text-teal-500" />
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Compound Interest Adventure
                </h1>
                <p className="text-xl text-muted-foreground">
                  See how small decisions grow into big money over time.
                </p>
              </div>

              <Card className="mb-8">
                <CardContent className="p-6">
                  <Tabs defaultValue="default" onValueChange={(v) => setMode(v as "default" | "custom" | "advanced")}>
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                      <TabsTrigger value="default">Default Mode</TabsTrigger>
                      <TabsTrigger value="custom">Custom Mode</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    </TabsList>

                    <TabsContent value="default">
                      <div className="space-y-4 text-left">
                        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <span>Starting Money</span>
                          <span className="font-bold text-teal-600">₹500</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <span>Monthly Saving</span>
                          <span className="font-bold text-teal-600">₹200</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <span>Return Rate</span>
                          <span className="font-bold text-teal-600">8% per year</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <span>Duration</span>
                          <span className="font-bold text-teal-600">10 Years</span>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="custom">
                      <div className="space-y-4 text-left">
                        <div>
                          <Label>Starting Money (₹)</Label>
                          <Input
                            type="number"
                            value={settings.startingMoney}
                            onChange={(e) => setSettings({ ...settings, startingMoney: Number(e.target.value) })}
                          />
                        </div>
                        <div>
                          <Label>Monthly Saving (₹)</Label>
                          <Input
                            type="number"
                            value={settings.monthlySaving}
                            onChange={(e) => setSettings({ ...settings, monthlySaving: Number(e.target.value) })}
                          />
                        </div>
                        <div>
                          <Label>Return Rate (%)</Label>
                          <Input
                            type="number"
                            value={settings.returnRate}
                            onChange={(e) => setSettings({ ...settings, returnRate: Number(e.target.value) })}
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="advanced">
                      <div className="space-y-4 text-left">
                        <div>
                          <Label>Starting Money (₹)</Label>
                          <Input
                            type="number"
                            value={settings.startingMoney}
                            onChange={(e) => setSettings({ ...settings, startingMoney: Number(e.target.value) })}
                          />
                        </div>
                        <div>
                          <Label>Monthly Saving (₹)</Label>
                          <Input
                            type="number"
                            value={settings.monthlySaving}
                            onChange={(e) => setSettings({ ...settings, monthlySaving: Number(e.target.value) })}
                          />
                        </div>
                        <div>
                          <Label>Return Rate (%)</Label>
                          <Input
                            type="number"
                            value={settings.returnRate}
                            onChange={(e) => setSettings({ ...settings, returnRate: Number(e.target.value) })}
                          />
                        </div>
                        <div>
                          <Label>Compounding Frequency</Label>
                          <Select
                            value={settings.compoundingFrequency}
                            onValueChange={(v) => setSettings({ ...settings, compoundingFrequency: v as "daily" | "monthly" | "yearly" })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="yearly">Yearly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Duration (5-20 years)</Label>
                          <Input
                            type="number"
                            min={5}
                            max={20}
                            value={settings.duration}
                            onChange={(e) => setSettings({ ...settings, duration: Math.min(20, Math.max(5, Number(e.target.value))) })}
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={startGame} className="gap-2 bg-teal-600 hover:bg-teal-700">
                  <Play className="h-5 w-5" /> Start Adventure
                </Button>
                <Button size="lg" variant="outline" onClick={() => setShowNotes(true)} className="gap-2">
                  <BookOpen className="h-5 w-5" /> Learn First
                </Button>
              </div>
            </motion.div>
          )}

          {/* GAME PLAYING SCREEN */}
          {(gameState.gamePhase === "event" || gameState.gamePhase === "result") && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto"
            >
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Year {gameState.year} of {mode === "advanced" ? settings.duration : 10}</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((gameState.year / (mode === "advanced" ? settings.duration : 10)) * 100)}% Complete
                  </span>
                </div>
                <Progress value={(gameState.year / (mode === "advanced" ? settings.duration : 10)) * 100} className="h-3" />
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Wallet className="h-4 w-4" />
                      <span className="text-sm opacity-90">Balance</span>
                    </div>
                    <p className="text-2xl font-bold">₹{gameState.balance.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <PiggyBank className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Invested</span>
                    </div>
                    <p className="text-2xl font-bold">₹{gameState.totalInvested.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">Interest Earned</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">₹{Math.round(gameState.totalInterest).toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Investment Type</span>
                    </div>
                    <p className="text-lg font-bold capitalize">{gameState.investmentType === "fd" ? "Fixed Deposit" : gameState.investmentType === "gold" ? "Gold" : "Index Fund"}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Chart */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Your Wealth Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={gameState.monthlyHistory}>
                      <defs>
                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" label={{ value: 'Year', position: 'bottom', offset: -5 }} />
                      <YAxis tickFormatter={(value) => `₹${(value/1000).toFixed(0)}k`} />
                      <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Balance']} />
                      <Area type="monotone" dataKey="balance" stroke="#14b8a6" fillOpacity={1} fill="url(#colorBalance)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Event Card */}
              {gameState.gamePhase === "event" && gameState.currentEvent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Card className="border-2 border-teal-200">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        {gameState.currentEvent.type === "save" && <Gift className="h-6 w-6 text-green-500" />}
                        {gameState.currentEvent.type === "investment" && <TrendingUp className="h-6 w-6 text-blue-500" />}
                        {gameState.currentEvent.type === "discipline" && <AlertTriangle className="h-6 w-6 text-yellow-500" />}
                        {gameState.currentEvent.type === "risk" && <AlertTriangle className="h-6 w-6 text-red-500" />}
                        {gameState.currentEvent.type === "bonus" && <Sparkles className="h-6 w-6 text-purple-500" />}
                        <CardTitle>{gameState.currentEvent.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg mb-6">{gameState.currentEvent.description}</p>
                      <div className="grid gap-3">
                        {gameState.currentEvent.options.map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="h-auto p-4 flex flex-col items-start text-left hover:bg-teal-50 hover:border-teal-300"
                            onClick={() => handleChoice(option)}
                          >
                            <span className="font-semibold">{option.label}</span>
                            <span className="text-sm text-muted-foreground">{option.description}</span>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Result Screen */}
              {gameState.gamePhase === "result" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="text-center">
                    <CardContent className="p-8">
                      <div className="text-6xl mb-4">
                        {gameState.decisions[gameState.decisions.length - 1]?.isGood ? "🎉" : "📝"}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Year {gameState.year} Complete!</h3>
                      <p className="text-muted-foreground mb-6">
                        Your balance is now <span className="text-teal-600 font-bold">₹{gameState.balance.toLocaleString()}</span>
                      </p>
                      <Button onClick={nextYear} size="lg" className="bg-teal-600 hover:bg-teal-700">
                        {gameState.year >= (mode === "advanced" ? settings.duration : 10) ? "See Final Results" : `Continue to Year ${gameState.year + 1}`}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Smart Tip Popup */}
              <AnimatePresence>
                {showTip && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
                  >
                    <Lightbulb className="h-5 w-5" />
                    <span>{currentTip}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* END SCREEN */}
          {gameState.gamePhase === "end" && (
            <motion.div
              key="end"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-8">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: 2 }}
                >
                  <Trophy className="h-20 w-20 text-yellow-500 mx-auto mb-4" />
                </motion.div>
                <h1 className="text-4xl font-bold mb-2">Adventure Complete! 🎉</h1>
                <p className="text-xl text-muted-foreground">Here's your financial journey report</p>
              </div>

              {/* Final Stats */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white">
                  <CardContent className="p-6 text-center">
                    <Wallet className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm opacity-90">Final Balance</p>
                    <p className="text-3xl font-bold">₹{gameState.balance.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <PiggyBank className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Total Invested</p>
                    <p className="text-3xl font-bold">₹{gameState.totalInvested.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm opacity-90">Interest Earned</p>
                    <p className="text-3xl font-bold">₹{Math.round(gameState.totalInterest).toLocaleString()}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Growth Chart */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-teal-500" />
                    The Power of Compounding
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={gameState.monthlyHistory}>
                      <defs>
                        <linearGradient id="colorBalanceEnd" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" label={{ value: 'Year', position: 'bottom', offset: -5 }} />
                      <YAxis tickFormatter={(value) => `₹${(value/1000).toFixed(0)}k`} />
                      <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Balance']} />
                      <Area type="monotone" dataKey="balance" stroke="#14b8a6" fillOpacity={1} fill="url(#colorBalanceEnd)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Decisions Summary */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <Star className="h-5 w-5" />
                      Your Best Decisions ({goodDecisions.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {goodDecisions.length > 0 ? goodDecisions.map((d, i) => (
                        <div key={i} className="p-3 bg-green-50 rounded-lg text-sm">
                          <span className="font-medium">Year {d.year}:</span> {d.choice}
                        </div>
                      )) : (
                        <p className="text-muted-foreground">No particularly great decisions recorded</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="h-5 w-5" />
                      Learning Opportunities ({badDecisions.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {badDecisions.length > 0 ? badDecisions.map((d, i) => (
                        <div key={i} className="p-3 bg-red-50 rounded-lg text-sm">
                          <span className="font-medium">Year {d.year}:</span> {d.choice}
                        </div>
                      )) : (
                        <p className="text-muted-foreground">Great job! You made smart choices!</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Key Insight */}
              <Card className="bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200 mb-8">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Lightbulb className="h-8 w-8 text-teal-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-teal-800 mb-2">Key Insight</h3>
                      <p className="text-teal-700">
                        You started with just ₹{settings.startingMoney} and ended with ₹{gameState.balance.toLocaleString()}! 
                        That's a <span className="font-bold">{((gameState.balance / settings.startingMoney - 1) * 100).toFixed(0)}% growth</span> through the power of compound interest.
                        {gameState.totalInterest > gameState.totalInvested * 0.3 && " Your money really worked for you!"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" onClick={resetGame} className="gap-2 bg-teal-600 hover:bg-teal-700">
                  <RotateCcw className="h-5 w-5" /> Try Again
                </Button>
                <Button size="lg" variant="outline" onClick={() => { setMode("advanced"); resetGame(); }} className="gap-2">
                  <TrendingUp className="h-5 w-5" /> Advanced Mode
                </Button>
                <Button size="lg" variant="outline" onClick={() => setShowNotes(true)} className="gap-2">
                  <BookOpen className="h-5 w-5" /> Study Notes
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notes Dialog */}
        <Dialog open={showNotes} onOpenChange={setShowNotes}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-teal-500" />
                Compound Interest Notes
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 text-sm">
              <section>
                <h3 className="text-lg font-bold text-teal-700 mb-2">1. What Is Compound Interest?</h3>
                <p className="text-muted-foreground">
                  Compound interest is interest earned on the original money + the interest you already earned.
                  Your money earns money, and that money earns more money.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-teal-700 mb-2">2. Why It Grows So Fast</h3>
                <p className="text-muted-foreground mb-2">
                  The key is compounding frequency: More compounding = faster growth.
                </p>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>Yearly compounding</li>
                  <li>Half-yearly compounding</li>
                  <li>Monthly compounding</li>
                  <li>Daily compounding</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-bold text-teal-700 mb-2">3. The Formula</h3>
                <div className="bg-muted p-4 rounded-lg font-mono text-center">
                  A = P(1 + r/n)^(n × t)
                </div>
                <ul className="mt-2 text-muted-foreground list-disc list-inside">
                  <li>P = Principal (starting money)</li>
                  <li>r = Annual rate (as decimal)</li>
                  <li>n = Times interest applied per year</li>
                  <li>t = Time in years</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-bold text-teal-700 mb-2">4. Example</h3>
                <p className="text-muted-foreground">
                  ₹1,000 at 10% yearly for 5 years:
                </p>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>Simple Interest: ₹1,500</li>
                  <li>Compound Interest: ₹1,610</li>
                </ul>
                <p className="font-medium text-teal-600 mt-2">CI gives more growth!</p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-teal-700 mb-2">5. The Rule of 72</h3>
                <p className="text-muted-foreground">
                  72 ÷ interest rate ≈ years required to double money.
                </p>
                <p className="font-medium text-teal-600">
                  At 8% → 72/8 = 9 years to double!
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-teal-700 mb-2">6. Why Start Early?</h3>
                <p className="text-muted-foreground">
                  More time = more compounding = much higher final amount.
                  The earlier you start, the less you need to save!
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-teal-700 mb-2">7. Monthly SIP + Compounding</h3>
                <p className="text-muted-foreground">
                  Even small monthly savings like ₹200 grow huge with compounding over time.
                  Consistency beats perfection!
                </p>
              </section>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default CompoundInterestGame;

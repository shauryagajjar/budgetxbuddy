import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  TrendingUp, PiggyBank, Calculator, 
  Clock, IndianRupee, ArrowRight, RotateCcw,
  Sparkles, Target, LineChart
} from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart as RechartsLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart
} from "recharts";

const Simulator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(500);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [showResults, setShowResults] = useState(false);

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const months = years * 12;
    const futureValue = monthlyInvestment * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    const totalInvested = monthlyInvestment * months;
    const returns = futureValue - totalInvested;
    return { futureValue, totalInvested, returns };
  };

  const generateChartData = () => {
    const data = [];
    const monthlyRate = expectedReturn / 100 / 12;
    
    for (let year = 0; year <= years; year++) {
      const months = year * 12;
      const invested = monthlyInvestment * months;
      const futureValue = months === 0 ? 0 : monthlyInvestment * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
      
      data.push({
        year: `Year ${year}`,
        invested: Math.round(invested),
        value: Math.round(futureValue),
      });
    }
    return data;
  };

  const results = calculateSIP();
  const chartData = generateChartData();

  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Calculator className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Investment Simulator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how your money can grow with the power of compound interest. 
            Adjust the values and watch your future wealth unfold!
          </p>
          <p className="text-sm text-muted-foreground mt-4 bg-muted/50 inline-block px-4 py-2 rounded-full">
            📚 For education only — virtual simulation, no real money
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 space-y-8">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Set Your Investment Plan
              </h2>

              {/* Monthly Investment */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-muted-foreground" />
                    Monthly Investment
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">₹</span>
                    <Input
                      type="number"
                      value={monthlyInvestment}
                      onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                      className="w-24 text-right font-bold"
                    />
                  </div>
                </div>
                <Slider
                  value={[monthlyInvestment]}
                  onValueChange={([v]) => setMonthlyInvestment(v)}
                  min={100}
                  max={50000}
                  step={100}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹100</span>
                  <span>₹50,000</span>
                </div>
              </div>

              {/* Investment Duration */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    Investment Duration
                  </label>
                  <span className="text-lg font-bold text-primary">{years} years</span>
                </div>
                <Slider
                  value={[years]}
                  onValueChange={([v]) => setYears(v)}
                  min={1}
                  max={30}
                  step={1}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 year</span>
                  <span>30 years</span>
                </div>
              </div>

              {/* Expected Return */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    Expected Annual Return
                  </label>
                  <span className="text-lg font-bold text-primary">{expectedReturn}%</span>
                </div>
                <Slider
                  value={[expectedReturn]}
                  onValueChange={([v]) => setExpectedReturn(v)}
                  min={1}
                  max={20}
                  step={0.5}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1%</span>
                  <span>20%</span>
                </div>
              </div>

              {/* Preset Buttons */}
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Quick presets:</p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => { setMonthlyInvestment(500); setYears(5); setExpectedReturn(10); }}
                  >
                    Beginner
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => { setMonthlyInvestment(2000); setYears(10); setExpectedReturn(12); }}
                  >
                    Steady
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => { setMonthlyInvestment(5000); setYears(20); setExpectedReturn(12); }}
                  >
                    Ambitious
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 text-center bg-muted/30">
                <PiggyBank className="w-6 h-6 mx-auto text-blue-500 mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Total Invested</p>
                <p className="text-lg font-bold text-foreground">{formatCurrency(results.totalInvested)}</p>
              </Card>
              <Card className="p-4 text-center bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                <TrendingUp className="w-6 h-6 mx-auto text-green-500 mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Returns Earned</p>
                <p className="text-lg font-bold text-green-600">{formatCurrency(results.returns)}</p>
              </Card>
              <Card className="p-4 text-center bg-gradient-to-br from-primary/10 to-accent/10">
                <Sparkles className="w-6 h-6 mx-auto text-primary mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Future Value</p>
                <p className="text-lg font-bold text-primary">{formatCurrency(results.futureValue)}</p>
              </Card>
            </div>

            {/* Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <LineChart className="w-5 h-5 text-primary" />
                Growth Over Time
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area type="monotone" dataKey="invested" stroke="#3b82f6" fill="url(#colorInvested)" name="Invested" />
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="url(#colorValue)" name="Total Value" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Key Insight */}
            <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Key Insight
              </h3>
              <p className="text-muted-foreground">
                By investing just <span className="font-bold text-foreground">₹{monthlyInvestment}/month</span> for {years} years, 
                your money could grow to <span className="font-bold text-primary">{formatCurrency(results.futureValue)}</span>. 
                That's <span className="font-bold text-green-600">{formatCurrency(results.returns)}</span> in returns — 
                <span className="font-bold"> {((results.returns / results.totalInvested) * 100).toFixed(0)}% more</span> than what you put in!
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Educational Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Understanding the Magic of Compound Interest
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Start Early</h3>
              <p className="text-sm text-muted-foreground">
                The earlier you start, the more time your money has to grow. Even small amounts become big over time.
              </p>
            </Card>
            <Card className="p-6">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Stay Consistent</h3>
              <p className="text-sm text-muted-foreground">
                Regular monthly investments (SIP) help you build wealth steadily without timing the market.
              </p>
            </Card>
            <Card className="p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Let It Compound</h3>
              <p className="text-sm text-muted-foreground">
                Your returns earn returns! This snowball effect is what makes long-term investing powerful.
              </p>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Simulator;

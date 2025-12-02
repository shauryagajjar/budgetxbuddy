import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, PiggyBank, Wallet, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Tools = () => {
  // Budget Split Calculator
  const [totalMoney, setTotalMoney] = useState("");
  const needs = Number(totalMoney) * 0.5;
  const wants = Number(totalMoney) * 0.3;
  const savings = Number(totalMoney) * 0.2;

  // Savings Goal Calculator
  const [goalAmount, setGoalAmount] = useState("");
  const [monthlySaving, setMonthlySaving] = useState("");
  const monthsNeeded = goalAmount && monthlySaving ? Math.ceil(Number(goalAmount) / Number(monthlySaving)) : 0;

  // Pocket Money Planner
  const [pocketMoney, setPocketMoney] = useState("");
  const pocketNeeds = Number(pocketMoney) * 0.4;
  const pocketWants = Number(pocketMoney) * 0.4;
  const pocketSavings = Number(pocketMoney) * 0.2;

  // Compound Interest Visualizer
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [sipAmount, setSipAmount] = useState("");

  const calculateCompound = (p: number, r: number, t: number) => {
    return p * Math.pow(1 + r / 100, t);
  };

  const calculateSimple = (p: number, r: number, t: number) => {
    return p + (p * r * t) / 100;
  };

  const calculateSIP = (monthly: number, r: number, t: number) => {
    const monthlyRate = r / 12 / 100;
    const months = t * 12;
    if (monthlyRate === 0) return monthly * months;
    return monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  };

  const generateYearlyData = () => {
    const p = Number(principal);
    const r = Number(rate);
    const t = Number(years);
    const data = [];

    for (let year = 1; year <= t; year++) {
      data.push({
        year,
        amount: Math.round(calculateCompound(p, r, year))
      });
    }
    return data;
  };

  const compoundTotal = principal && rate && years ? Math.round(calculateCompound(Number(principal), Number(rate), Number(years))) : 0;
  const simpleTotal = principal && rate && years ? Math.round(calculateSimple(Number(principal), Number(rate), Number(years))) : 0;
  const sipTotal = sipAmount && rate && years ? Math.round(calculateSIP(Number(sipAmount), Number(rate), Number(years))) : 0;
  const sipInvested = sipAmount && years ? Number(sipAmount) * Number(years) * 12 : 0;

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Money Tools
          </h1>
          <p className="text-xl text-muted-foreground">
            Simple calculators to plan your money
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Budget Split Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 h-full border-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Budget Split</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Total Money (₹)</Label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={totalMoney}
                    onChange={(e) => setTotalMoney(e.target.value)}
                    className="text-lg"
                  />
                </div>

                {totalMoney && (
                  <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Needs (50%)</span>
                      <span className="text-xl font-bold text-primary">₹{needs.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Wants (30%)</span>
                      <span className="text-xl font-bold text-accent">₹{wants.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Savings (20%)</span>
                      <span className="text-xl font-bold text-green-600">₹{savings.toFixed(0)}</span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Savings Goal Calculator */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 h-full border-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <PiggyBank className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Savings Goal</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Goal Amount (₹)</Label>
                  <Input
                    type="number"
                    placeholder="What do you want to buy?"
                    value={goalAmount}
                    onChange={(e) => setGoalAmount(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div>
                  <Label>Monthly Savings (₹)</Label>
                  <Input
                    type="number"
                    placeholder="How much can you save?"
                    value={monthlySaving}
                    onChange={(e) => setMonthlySaving(e.target.value)}
                    className="text-lg"
                  />
                </div>

                {monthsNeeded > 0 && (
                  <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">You'll reach your goal in</p>
                    <p className="text-4xl font-bold text-primary">{monthsNeeded}</p>
                    <p className="text-sm text-muted-foreground">months</p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Pocket Money Planner */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 h-full border-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Pocket Money Plan</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Monthly Pocket Money (₹)</Label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={pocketMoney}
                    onChange={(e) => setPocketMoney(e.target.value)}
                    className="text-lg"
                  />
                </div>

                {pocketMoney && (
                  <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Needs (40%)</span>
                      <span className="text-xl font-bold text-primary">₹{pocketNeeds.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Fun (40%)</span>
                      <span className="text-xl font-bold text-accent">₹{pocketWants.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Savings (20%)</span>
                      <span className="text-xl font-bold text-green-600">₹{pocketSavings.toFixed(0)}</span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Compound Interest Visualizer */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2"
          >
            <Card className="p-6 border-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Compound Interest Visualizer</h2>
              </div>

              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="basic">Basic Mode</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced Mode</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label>Starting Amount (₹)</Label>
                      <Input
                        type="number"
                        placeholder="1000"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Annual Interest Rate (%)</Label>
                      <Input
                        type="number"
                        placeholder="10"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Years</Label>
                      <Input
                        type="number"
                        placeholder="5"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                      />
                    </div>
                  </div>

                  {compoundTotal > 0 && (
                    <div className="p-6 bg-muted/50 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-2">Your money grows to</p>
                      <p className="text-5xl font-bold text-primary mb-4">₹{compoundTotal.toLocaleString()}</p>
                      <p className="text-lg text-green-600 font-medium">
                        Profit: ₹{(compoundTotal - Number(principal)).toLocaleString()}
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="advanced" className="space-y-6">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <Label>Starting Amount (₹)</Label>
                      <Input
                        type="number"
                        placeholder="1000"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Annual Rate (%)</Label>
                      <Input
                        type="number"
                        placeholder="10"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Years</Label>
                      <Input
                        type="number"
                        placeholder="5"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Monthly SIP (₹)</Label>
                      <Input
                        type="number"
                        placeholder="500"
                        value={sipAmount}
                        onChange={(e) => setSipAmount(e.target.value)}
                      />
                    </div>
                  </div>

                  {compoundTotal > 0 && (
                    <>
                      {/* Comparison Cards */}
                      <div className="grid md:grid-cols-3 gap-4">
                        <Card className="p-4 bg-blue-50 border-blue-200">
                          <p className="text-sm font-medium text-blue-700 mb-2">Simple Interest</p>
                          <p className="text-2xl font-bold text-blue-900">₹{simpleTotal.toLocaleString()}</p>
                        </Card>
                        <Card className="p-4 bg-green-50 border-green-200">
                          <p className="text-sm font-medium text-green-700 mb-2">Compound Interest</p>
                          <p className="text-2xl font-bold text-green-900">₹{compoundTotal.toLocaleString()}</p>
                        </Card>
                        {sipTotal > 0 && (
                          <Card className="p-4 bg-purple-50 border-purple-200">
                            <p className="text-sm font-medium text-purple-700 mb-2">SIP Total</p>
                            <p className="text-2xl font-bold text-purple-900">₹{sipTotal.toLocaleString()}</p>
                            <p className="text-xs text-purple-600 mt-1">Invested: ₹{sipInvested.toLocaleString()}</p>
                          </Card>
                        )}
                      </div>

                      {/* Year by Year Table */}
                      <div className="border rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Year</TableHead>
                              <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {generateYearlyData().map((row) => (
                              <TableRow key={row.year}>
                                <TableCell className="font-medium">Year {row.year}</TableCell>
                                <TableCell className="text-right font-bold text-primary">
                                  ₹{row.amount.toLocaleString()}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      {/* Visual Bars */}
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Simple Interest</span>
                            <span className="text-sm font-bold">₹{simpleTotal.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div 
                              className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                              style={{ width: `${(simpleTotal / Math.max(compoundTotal, sipTotal)) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Compound Interest</span>
                            <span className="text-sm font-bold">₹{compoundTotal.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div 
                              className="bg-green-500 h-4 rounded-full transition-all duration-500"
                              style={{ width: `${(compoundTotal / Math.max(compoundTotal, sipTotal)) * 100}%` }}
                            />
                          </div>
                        </div>
                        {sipTotal > 0 && (
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">SIP Investment</span>
                              <span className="text-sm font-bold">₹{sipTotal.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                              <div 
                                className="bg-purple-500 h-4 rounded-full transition-all duration-500"
                                style={{ width: '100%' }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>
        </div>

        <div className="text-center p-6 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground">
            💡 <strong>Remember:</strong> These are educational tools. Always do your research before real investing!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tools;

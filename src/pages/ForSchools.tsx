import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { School, BookOpen, Users, Calculator, GraduationCap, ClipboardList, PiggyBank, Wallet, TrendingUp } from "lucide-react";

const ForSchools = () => {
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

  // Compound Interest
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const compoundTotal = principal && rate && years 
    ? Math.round(Number(principal) * Math.pow(1 + Number(rate) / 100, Number(years))) 
    : 0;
  const whoThisIsFor = [
    "Schools wanting practical money education",
    "Teachers needing ready-made notes + diagrams",
    "Students from classes 6–12",
    "100% educational, no real investing"
  ];

  const features = [
    { icon: BookOpen, title: "Structured Topics with Notes", description: "Ready-to-teach content organized by topic" },
    { icon: ClipboardList, title: "Teacher Board-Diagram Pack", description: "Visual aids designed for classroom boards" },
    { icon: Calculator, title: "Student-Friendly Tools", description: "Interactive calculators and planners" },
    { icon: GraduationCap, title: "Educational-Only Simulations", description: "Virtual practice with no real money" },
    { icon: Users, title: "No Training Required", description: "Can be used in classroom immediately" }
  ];

  const topics = [
    {
      number: 1,
      title: "Why Money Skills Matter",
      learn: [
        "Money is a tool, not just something to spend",
        "Good decisions with small amounts matter",
        "Saving and investing early changes the future"
      ],
      teach: [
        "Use pocket money or festival money examples",
        'Ask: "What do you do when you get money?"'
      ],
      diagram: `           +-----------+
           |   EARN    |
           +-----------+
                 |
                 v
           +-----------+
           |  SPEND    |
           +-----------+
                 |
                 v
           +-----------+
           |   SAVE    |
           +-----------+
                 |
                 v
           +-----------+
           | INVEST    |
           +-----------+
                 |
                 v
           +-------------------+
           |   BETTER FUTURE   |
           +-------------------+`
    },
    {
      number: 2,
      title: "Needs vs Wants",
      learn: [
        "Need = important for living",
        "Want = good to have but not necessary",
        "Prioritizing needs avoids stress"
      ],
      teach: [
        "List 10 items from students, classify live"
      ],
      diagram: `+-----------------+-----------------+
|      NEEDS      |      WANTS      |
+-----------------+-----------------+
| Food            | Fancy shoes     |
| School fees     | Gaming skins    |
| Basic clothes   | Headphones      |
| Internet/study  | Extra outings   |
+-----------------+-----------------+`
    },
    {
      number: 3,
      title: "Budgeting Basics",
      learn: [
        "Budget = deciding money before spending",
        "Formula: Money In – Money Out = Leftover"
      ],
      teach: [
        "Pocket money budgeting example"
      ],
      diagram: `Monthly Pocket Money Budget

+-----------------+----------+----------+
|    CATEGORY     | PLANNED  | ACTUAL   |
+-----------------+----------+----------+
| Snacks          |  ₹200    |  ₹230    |
| Travel          |  ₹150    |  ₹120    |
| Recharge        |  ₹100    |  ₹100    |
| Fun / Others    |  ₹150    |  ₹140    |
| Savings         |  ₹200    |  ₹210    |
+-----------------+----------+----------+
| TOTAL           |  ₹800    |  ₹800    |
+-----------------+----------+----------+`
    },
    {
      number: 4,
      title: "Saving & Habits",
      learn: [
        "Save first, spend later",
        "Small daily savings create habits"
      ],
      teach: [
        "Show how ₹20/day becomes ₹600/month"
      ],
      diagram: `Savings Over Weeks (₹50 per week)

Week 1: ████  ₹50  
Week 2: ████████  ₹100  
Week 3: ████████████  ₹150  
Week 4: ████████████████  ₹200`
    },
    {
      number: 5,
      title: "Simple vs Compound Interest",
      learn: [
        "Simple interest grows straight",
        "Compound grows faster over time"
      ],
      teach: [
        "Compare growth of ₹1000 at 10%"
      ],
      diagram: `Amount
^
|                              *
|                           *
|                        *      (Compound)
|                     *
|                  *
|               *
|            *
|         *----------------------  (Simple)
+----------------------------------------> Time`
    },
    {
      number: 6,
      title: "Goal-Based Saving",
      learn: [
        "Break big goals into small monthly targets"
      ],
      teach: [
        "Example: Phone ₹6000 → ₹1000/month"
      ],
      diagram: `Start → ₹1000 → ₹2000 → ₹3000 → ₹4000 → ₹5000 → ₹6000 (Goal)`
    },
    {
      number: 7,
      title: "Basics of Investing",
      learn: [
        "Investing grows money slowly",
        "Higher return = higher risk",
        "Diversification is smarter"
      ],
      teach: [
        "Tree analogy: Plant once, grow slowly"
      ],
      diagram: `Risk  ^
      |
High  |        [ Individual Stocks ]
      |
Med   |    [ Some Mutual Funds ]
      |
Low   | [ Bank FD / Savings ]
      +-----------------------------> Return`
    }
  ];

  const teacherSteps = [
    "Pick one topic (e.g., Budgeting)",
    "Show the notes",
    "Draw the diagram on board",
    "Ask students to use tools (Budget Split, Pocket Money Planner)",
    "Give simple homework (track spending for 1 day)"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto text-center relative z-10"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-1">
            Currently Free for Schools (Pilot Phase)
          </Badge>
          
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <School className="w-10 h-10 text-primary" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            FinRoad for Schools
          </h1>
          <p className="text-lg text-primary font-medium mb-2">Free School Plan</p>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Turn FinRoad into a ready-to-use financial literacy course for your students. 
            Designed for classes, clubs, workshops, and life-skill periods.
          </p>
        </motion.div>
      </section>

      {/* Who This Is For */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
              Who This Is For
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {whoThisIsFor.map((item, index) => (
                <Card key={index} className="p-4 flex items-center gap-3 border-2 hover:border-primary/20 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-foreground">{item}</p>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Schools Get */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-center mb-4 text-foreground"
          >
            What Schools Get
          </motion.h2>
          <p className="text-center text-muted-foreground mb-10">
            Everything you need to teach financial literacy
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300 border-2 hover:border-primary/20">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Outline */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-center mb-4 text-foreground"
          >
            Course Outline
          </motion.h2>
          <p className="text-center text-muted-foreground mb-10">
            7 topics with learning objectives, teaching tips, and board diagrams
          </p>

          <div className="space-y-8">
            {topics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 border-2 hover:border-primary/20 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {topic.number}
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{topic.title}</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        What Students Should Learn
                      </h4>
                      <ul className="space-y-1">
                        {topic.learn.map((item, i) => (
                          <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        How the Teacher Can Explain
                      </h4>
                      <ul className="space-y-1">
                        {topic.teach.map((item, i) => (
                          <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-card border-2 border-dashed border-border rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-3 text-sm">Board Diagram</h4>
                    <pre className="text-xs md:text-sm text-muted-foreground font-mono overflow-x-auto whitespace-pre">
                      {topic.diagram}
                    </pre>
                    <p className="text-xs text-muted-foreground mt-3 italic">For Education Only</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Tools Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-center mb-4 text-foreground"
          >
            Student Tools
          </motion.h2>
          <p className="text-center text-muted-foreground mb-10">
            Interactive calculators students can use in class
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Budget Split Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full border-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Budget Split (50-30-20)</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Total Money (₹)</Label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={totalMoney}
                      onChange={(e) => setTotalMoney(e.target.value)}
                    />
                  </div>
                  {totalMoney && (
                    <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                      <div className="flex justify-between">
                        <span>Needs (50%)</span>
                        <span className="font-bold text-primary">₹{needs.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wants (30%)</span>
                        <span className="font-bold text-accent">₹{wants.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Savings (20%)</span>
                        <span className="font-bold text-green-600">₹{savings.toFixed(0)}</span>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-3 italic">For Education Only</p>
              </Card>
            </motion.div>

            {/* Savings Goal Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full border-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <PiggyBank className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Savings Goal</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Goal Amount (₹)</Label>
                    <Input
                      type="number"
                      placeholder="What do you want to buy?"
                      value={goalAmount}
                      onChange={(e) => setGoalAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Monthly Savings (₹)</Label>
                    <Input
                      type="number"
                      placeholder="How much can you save?"
                      value={monthlySaving}
                      onChange={(e) => setMonthlySaving(e.target.value)}
                    />
                  </div>
                  {monthsNeeded > 0 && (
                    <div className="p-4 bg-muted/50 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-1">You'll reach your goal in</p>
                      <p className="text-3xl font-bold text-primary">{monthsNeeded} months</p>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-3 italic">For Education Only</p>
              </Card>
            </motion.div>

            {/* Pocket Money Planner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full border-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Pocket Money Plan</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Monthly Pocket Money (₹)</Label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={pocketMoney}
                      onChange={(e) => setPocketMoney(e.target.value)}
                    />
                  </div>
                  {pocketMoney && (
                    <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                      <div className="flex justify-between">
                        <span>Needs (40%)</span>
                        <span className="font-bold text-primary">₹{pocketNeeds.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fun (40%)</span>
                        <span className="font-bold text-accent">₹{pocketWants.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Savings (20%)</span>
                        <span className="font-bold text-green-600">₹{pocketSavings.toFixed(0)}</span>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-3 italic">For Education Only</p>
              </Card>
            </motion.div>

            {/* Compound Interest */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full border-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Compound Interest</h3>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label className="text-xs">Amount (₹)</Label>
                      <Input
                        type="number"
                        placeholder="1000"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Rate (%)</Label>
                      <Input
                        type="number"
                        placeholder="10"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Years</Label>
                      <Input
                        type="number"
                        placeholder="5"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                      />
                    </div>
                  </div>
                  {compoundTotal > 0 && (
                    <div className="p-4 bg-muted/50 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-1">Your money grows to</p>
                      <p className="text-3xl font-bold text-primary">₹{compoundTotal.toLocaleString()}</p>
                      <p className="text-sm text-green-600 font-medium mt-1">
                        Profit: ₹{(compoundTotal - Number(principal)).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-3 italic">For Education Only</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How Teachers Can Use FinRoad */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
              How Teachers Can Use FinRoad
            </h2>

            <Card className="p-6 border-2">
              <div className="space-y-4">
                {teacherSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-foreground pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-3xl"
        >
          <Card className="p-10 text-center bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border-2 border-primary/20">
            <School className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
              Use FinRoad in Your School
            </h2>
            <p className="text-muted-foreground mb-6">
              Free during the pilot phase for schools, clubs, skill periods.
            </p>
            <Button 
              size="lg"
              className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              onClick={() => {}}
            >
              Contact for School Use (Info Only)
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              For Schools Only – Education Use, No Real Investing.
            </p>
          </Card>
        </motion.div>
      </section>
    </div>
  );
};

export default ForSchools;

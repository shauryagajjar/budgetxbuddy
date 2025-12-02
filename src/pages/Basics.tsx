import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen, TrendingUp, PiggyBank, Calculator, Target, Shield, CheckCircle, XCircle, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Basics = () => {
  const topics = [
    {
      icon: Calculator,
      title: "Budgeting",
      color: "from-blue-500 to-cyan-500",
      content: `Budgeting means deciding how to use your money before you spend it.

A simple rule for students:
• 50% Needs
• 30% Wants
• 20% Savings

Why budgeting matters:
✓ You stop running out of money
✓ You stay in control
✓ You avoid impulsive spending`
    },
    {
      icon: PiggyBank,
      title: "Saving",
      color: "from-green-500 to-emerald-500",
      content: `Saving is keeping money aside for the future.
Even small amounts grow over time.

Why students should save:
✓ Emergency expenses
✓ Buying something big
✓ Feeling secure
✓ Learning discipline early

Best trick: Save first, spend later.`
    },
    {
      icon: TrendingUp,
      title: "Simple vs Compound Interest",
      color: "from-purple-500 to-pink-500",
      content: `Simple Interest
You earn interest only on the main amount.
₹1,000 at 10% for 3 years → earns ₹300.

Compound Interest
You earn interest on your interest.
₹1,000 at 10% for 3 years → becomes ₹1,331.

Compounding makes your money grow faster!`
    },
    {
      icon: Target,
      title: "What is SIP",
      color: "from-orange-500 to-red-500",
      content: `SIP means investing a small fixed amount every month.

Why SIP is good:
✓ You don't need a lot of money
✓ It builds discipline
✓ Works great with compounding
✓ ₹200/month can grow big over years.

Perfect for students!`
    },
    {
      icon: TrendingUp,
      title: "What are Mutual Funds?",
      color: "from-indigo-500 to-blue-500",
      content: `Mutual funds collect money from many people and invest in stocks, bonds, gold, etc.

Good for beginners:
✓ Experts manage money
✓ Lower risk
✓ Start small

A simple way to invest without being an expert.`
    },
    {
      icon: Shield,
      title: "Risk & Diversification",
      color: "from-teal-500 to-cyan-500",
      content: `Risk = chance of losing money.
Diversification = don't put all your money in one place.

Example:
✓ Some in index fund
✓ Some in gold
✓ Some in FD

This protects your money if one investment goes down.`
    },
    {
      icon: CheckCircle,
      title: "Good Money Habits",
      color: "from-green-500 to-teal-500",
      content: `Good habits to start now:
✓ Save part of every pocket money
✓ Track your spending
✓ Avoid impulsive buying
✓ Use cash for small expenses
✓ Set goals
✓ Learn basics of investing

These habits will help you forever.`
    },
    {
      icon: XCircle,
      title: "Common Money Mistakes",
      color: "from-red-500 to-orange-500",
      content: `Mistakes to avoid:
✗ Spending money fast
✗ Copying friends
✗ Not saving
✗ Borrowing from friends
✗ Not tracking money
✗ Thinking investing is only for adults

Learn from these common mistakes!`
    },
    {
      icon: Zap,
      title: "How Compound Interest Really Works",
      color: "from-yellow-500 to-orange-500",
      content: `Compounding means your interest also earns interest.

Example (₹1,000 at 10%):
Year 1: ₹1,100
Year 5: ₹1,610
Year 10: ₹2,593
Year 20: ₹6,727
Year 30: ₹17,449

Compounding grows slow first, then very fast.
The earlier you start, the more you benefit!`
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Financial Basics
          </h1>
          <p className="text-xl text-muted-foreground">
            Click any card to learn the fundamentals
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="p-6 cursor-pointer hover:shadow-[var(--card-hover-shadow)] transition-all duration-300 border-2 hover:border-primary/30 hover:scale-105">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mb-4`}>
                      <topic.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{topic.title}</h3>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3 text-2xl">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center`}>
                        <topic.icon className="w-6 h-6 text-white" />
                      </div>
                      {topic.title}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-4 whitespace-pre-line text-lg leading-relaxed text-foreground">
                    {topic.content}
                  </div>
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground italic">
                      💡 For education only. Practice with our tools and simulator!
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Basics;

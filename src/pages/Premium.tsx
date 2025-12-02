import { Card } from "@/components/ui/card";
import { BookOpen, TrendingUp, Target, Lightbulb, Zap, BarChart, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Premium = () => {
  const premiumNotes = [
    {
      icon: BookOpen,
      title: "How Banks Use Your Money",
      color: "from-blue-500 to-cyan-500",
      content: `When you deposit money in a bank, the bank doesn't just keep it in a vault.

How Banks Use Deposits:
• Lend to borrowers (home loans, business loans, personal loans)
• Invest in government bonds and securities
• Keep only a small portion as reserves (required by law)

The Interest Gap:
Banks pay you 3-4% interest on savings accounts, but charge borrowers 8-12% interest on loans. This difference is their profit.

Example:
You deposit ₹10,000 at 4% interest → Bank pays you ₹400/year
Bank lends your ₹10,000 at 10% → Bank earns ₹1,000/year
Bank's profit = ₹600

Why This Matters for Students:
✓ Understand why savings accounts have low returns
✓ Know that your money is being used to create more money
✓ Learn why investing can give you better returns than savings

Safety Note:
In India, deposits up to ₹5 lakh are insured by DICGC (Deposit Insurance and Credit Guarantee Corporation). Your money is safe even if the bank fails.`
    },
    {
      icon: TrendingUp,
      title: "Types of Mutual Funds",
      color: "from-green-500 to-emerald-500",
      content: `Mutual funds come in different types based on where they invest your money.

1. Equity Funds (Stock Market Funds)
• Invest in company stocks
• Risk: High
• Returns: 12-15% per year (long-term)
• Best for: 5+ year goals
• Example: Large-cap funds, small-cap funds

2. Debt Funds (Bond Funds)
• Invest in government and corporate bonds
• Risk: Low to Medium
• Returns: 6-8% per year
• Best for: 2-3 year goals
• Example: Liquid funds, short-term bond funds

3. Hybrid Funds (Balanced Funds)
• Mix of stocks and bonds
• Risk: Medium
• Returns: 8-10% per year
• Best for: 3-5 year goals
• Good for: Beginners wanting balance

4. ELSS Funds (Tax Saving Funds)
• Equity funds with tax benefits
• Risk: High
• Returns: 12-15% per year
• Lock-in: 3 years (can't withdraw)
• Benefit: Save tax under Section 80C

Choosing the Right Fund:
Short-term goal (1-2 years) → Debt funds
Medium-term (3-5 years) → Hybrid funds
Long-term (5+ years) → Equity funds
Want tax savings → ELSS funds`
    },
    {
      icon: Target,
      title: "How SIPs Grow Over Years",
      color: "from-purple-500 to-pink-500",
      content: `SIP (Systematic Investment Plan) is investing a fixed amount every month. Let's see how powerful this can be.

Real Example:
₹500/month SIP at 12% annual return

Year 1: Invested ₹6,000 → Worth ₹6,230
Year 3: Invested ₹18,000 → Worth ₹20,450
Year 5: Invested ₹30,000 → Worth ₹41,113
Year 10: Invested ₹60,000 → Worth ₹1,15,000
Year 20: Invested ₹1,20,000 → Worth ₹4,99,577

The Magic of SIP:
1. Rupee Cost Averaging
When market is down, your ₹500 buys more units
When market is up, your ₹500 buys fewer units
Over time, you get an average price

2. Power of Compounding
Your returns generate more returns
Growth accelerates over time

3. Disciplined Investing
Forces you to invest regularly
No need to time the market

Why Students Should Start Early:
Starting at age 15 vs age 25 = Double the returns by retirement!

₹200/month from age 15 to 60 = ₹3+ crores
₹200/month from age 25 to 60 = ₹1.5 crores

Even small amounts grow huge with time.`
    },
    {
      icon: Lightbulb,
      title: "Understanding Inflation",
      color: "from-orange-500 to-red-500",
      content: `Inflation means prices of things go up over time. Your money loses buying power.

Simple Example:
Today: ₹100 can buy 10 chocolates
After 5 years: Same ₹100 can buy only 7 chocolates
The money didn't change, but its value did!

India's Average Inflation:
Around 5-6% per year

What This Means:
If you keep ₹10,000 under your pillow:
• After 10 years, it's still ₹10,000
• But you can buy much less with it
• Real value = around ₹6,000

The Problem with Savings Accounts:
Bank gives: 4% interest
Inflation rate: 6%
Real return: -2% (you're losing money!)

How to Beat Inflation:
1. Fixed Deposits: 6-7% (barely beats inflation)
2. Debt Funds: 7-8% (slight edge over inflation)
3. Equity Funds: 12-15% (clearly beats inflation)
4. Gold: 8-10% (good inflation hedge)

Student Takeaway:
Money sitting idle loses value every year. Even small investments in mutual funds or gold help you beat inflation and grow your wealth.

Historical Inflation Impact:
₹1,00,000 in 2000 = ₹3,20,000 in 2023 (just to maintain same buying power)

That's why your grandparents say "everything was so cheap back then!" - it's inflation at work.`
    },
    {
      icon: BarChart,
      title: "Setting Long-Term Goals",
      color: "from-indigo-500 to-blue-500",
      content: `Goal setting is the foundation of smart money management. Here's how to do it right.

Step 1: Choose Your Goal
Examples for students:
• Buy a laptop (₹50,000)
• College education fund (₹5,00,000)
• First bike (₹80,000)
• Emergency fund (₹30,000)

Step 2: Set a Timeline
When do you need this money?
• Short-term: 1-2 years
• Medium-term: 3-5 years
• Long-term: 5+ years

Step 3: Calculate Monthly Savings
Goal: ₹50,000 in 3 years
Simple saving: ₹1,389/month
With 10% returns: ₹1,207/month

Step 4: Choose Investment Type
Based on timeline:
1-2 years → Savings account or FD
3-5 years → Debt funds or Hybrid funds
5+ years → Equity funds or SIPs

Step 5: Track Progress
• Check monthly if you're on track
• Adjust if you get extra money
• Celebrate milestones (25%, 50%, 75%)

Real Student Example:
Goal: Buy laptop for college (₹60,000)
Timeline: 2 years
Current savings: ₹10,000
Monthly pocket money: ₹2,000
Can save: ₹800/month

Plan:
• Put ₹10,000 in FD (safe, earns 7%)
• Save ₹800/month in recurring deposit
• After 24 months: ₹60,000+ achieved!

Pro Tips:
✓ Write down your goals
✓ Review every 3 months
✓ Adjust if income changes
✓ Don't withdraw early unless emergency
✓ Celebrate when you achieve it!

Multiple Goals Strategy:
Emergency fund: 6 months expenses (highest priority)
Short-term fun: New phone, trip (medium priority)
Long-term wealth: College, business (steady investments)`
    },
    {
      icon: Zap,
      title: "Deep Compounding Benefits",
      color: "from-teal-500 to-cyan-500",
      content: `Compounding is the most powerful wealth-building concept. It's money making money, which then makes more money.

The Compounding Formula:
Future Value = Present Value × (1 + rate)^years

But let's see it in action:

₹10,000 at 12% per year:
Year 1: ₹11,200 (earned ₹1,200)
Year 5: ₹17,623 (earned ₹7,623)
Year 10: ₹31,058 (earned ₹21,058)
Year 20: ₹96,462 (earned ₹86,462)
Year 30: ₹2,99,599 (earned ₹2,89,599)

Notice: In year 30 alone, you earned ₹32,000+ - that's more than 3x your original investment!

The Three Phases of Compounding:

Phase 1 (Years 1-10): Slow Growth
Your returns are small because the base is small.
This is when most people give up.

Phase 2 (Years 10-20): Visible Growth
Returns start becoming significant.
You see real wealth building.

Phase 3 (Years 20+): Explosive Growth
Returns dwarf your contributions.
Your money works harder than you do!

Why Start Early:

Person A: Starts at age 15
Invests ₹2,000/month till age 25 (only 10 years)
Then stops completely
At age 60: ₹3.78 crores

Person B: Starts at age 25
Invests ₹2,000/month till age 60 (35 years)
At age 60: ₹1.76 crores

Person A invested less money but has more than double!
That's the power of starting early.

Student Benefits:
✓ Time is your biggest advantage
✓ Small amounts become huge
✓ Mistakes now have time to recover
✓ Builds wealth-building habits early

Real-Life Compounding:
Warren Buffett (world's best investor):
• Made 99% of his wealth after age 50
• Why? Compounding!
• He started investing at age 11

The 8th Wonder of the World:
Albert Einstein called compounding "the 8th wonder of the world. He who understands it, earns it. He who doesn't, pays it."

Compounding Works Against You Too:
Credit card debt at 36% interest:
Borrow ₹10,000
After 1 year: owe ₹13,600
After 3 years: owe ₹25,155
After 5 years: owe ₹47,069

That's why avoiding debt is crucial!`
    },
    {
      icon: TrendingUp,
      title: "Index vs Active Funds",
      color: "from-pink-500 to-rose-500",
      content: `Two main types of equity mutual funds: Index and Active. Let's understand the difference.

Index Funds:
What: Copies a market index (like Nifty 50 or Sensex)
How: Automatically buys all stocks in the index
Management: No human decisions, just tracks index
Fees: Very low (0.1-0.5% per year)
Returns: Matches market returns

Active Funds:
What: Fund manager picks stocks they think will do well
How: Research team analyzes and selects stocks
Management: Human decisions, active buying/selling
Fees: Higher (1-2.5% per year)
Returns: Tries to beat market returns

Real Comparison:

Index Fund (Nifty 50):
₹10,000 invested for 10 years at 12%
Fees: 0.2% per year
Final value: ₹30,600

Active Fund:
₹10,000 invested for 10 years at 12%
Fees: 1.5% per year
Final value: ₹27,900

Even though both gave 12% returns, fees make a big difference!

When to Choose Index Funds:
✓ You're a beginner
✓ You want low fees
✓ You believe markets grow over time
✓ You want simple, "set and forget" investing
✓ Long-term goals (10+ years)

When to Choose Active Funds:
✓ You want someone expert managing
✓ You're okay with higher fees
✓ You want potential to beat market
✓ You have time to research fund managers
✓ Willing to review performance regularly

The Truth About Active Funds:
Studies show:
• Only 20-30% of active funds beat index over 10 years
• Many high-performing funds don't sustain it
• Fees eat into returns significantly

Warren Buffett's Advice:
"Put 90% of cash in a low-cost index fund"

For Students:
Start with index funds:
• Simple to understand
• Lower risk than individual stocks
• Better than most active funds
• Very low fees mean more money for you

Popular Index Funds in India:
• Nifty 50 Index Fund (top 50 companies)
• Nifty Next 50 (companies 51-100)
• Sensex Index Fund (top 30 companies)

Bottom Line:
Index funds are the "tortoise" - slow, steady, wins the race.
Active funds are the "hare" - tries to sprint but usually doesn't beat the tortoise.`
    },
    {
      icon: Target,
      title: "What Makes Investments Risky",
      color: "from-violet-500 to-purple-500",
      content: `Risk is the chance of losing money or not getting expected returns. Let's understand what creates risk.

Types of Investment Risk:

1. Market Risk
What: Overall market goes down
Example: 2020 COVID crash - market fell 40%
Who it affects: Stock investors, equity fund investors
How to reduce: Long-term investing, don't panic sell

2. Inflation Risk
What: Returns don't beat price increases
Example: FD gives 6%, inflation is 7% → You lose 1%
Who it affects: Savings accounts, low-return investments
How to reduce: Invest in equity, gold, real estate

3. Interest Rate Risk
What: When interest rates change, investment values change
Example: Bond prices fall when interest rates rise
Who it affects: Bond investors, debt fund investors
How to reduce: Short-term debt funds, diversification

4. Company Risk
What: Specific company faces problems
Example: Yes Bank crisis - stock fell 90%
Who it affects: Individual stock investors
How to reduce: Mutual funds, diversification

5. Liquidity Risk
What: Can't sell investment quickly
Example: Real estate takes months to sell
Who it affects: Property investors, some bonds
How to reduce: Keep emergency fund in liquid assets

Risk Levels of Common Investments:

Very Low Risk:
• Savings Account: 0% loss chance
• Fixed Deposits: 0% loss chance (up to ₹5 lakh insured)
Returns: 3-7% per year

Low Risk:
• Debt Mutual Funds: Rare small losses
• Government Bonds: Very safe
Returns: 6-8% per year

Medium Risk:
• Hybrid Funds: Some market exposure
• Gold: Prices fluctuate
Returns: 8-10% per year

High Risk:
• Equity Funds: Market ups and downs
• Stocks: Individual company risk
Returns: 12-15% per year (long-term)

Very High Risk:
• Crypto: Extreme volatility
• Penny Stocks: Can go to zero
Returns: Unpredictable (-90% to +500%)

How to Reduce Risk:

1. Diversification
Don't put all money in one place:
• 50% equity funds
• 30% debt funds
• 20% gold/FD

2. Long-Term Investing
Markets go up over time:
• 1 year: 50% chance of loss
• 5 years: 15% chance of loss
• 10+ years: Nearly 0% chance of loss

3. Regular Investing (SIP)
Invest same amount monthly:
• Buy more when prices are low
• Buy less when prices are high
• Average out cost over time

4. Emergency Fund First
Keep 6 months expenses in savings:
• Won't need to sell investments in emergency
• Can hold through market crashes

5. Don't Follow Crowd
• When everyone is buying, prices are high (risky)
• When everyone is selling, prices are low (opportunity)

Risk and Return Relationship:
Higher risk = Higher potential returns
Lower risk = Lower potential returns

You can't eliminate risk, but you can manage it!

Student Strategy:
• Start with low risk (FD, debt funds)
• Gradually add medium risk (hybrid funds)
• After learning, add high risk (equity funds)
• Always keep some money in low-risk options

Remember: Risk is not your enemy. Not understanding risk is!`
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Premium Notes
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Advanced financial concepts unlocked for you
          </p>
          
          <Card className="inline-block p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
            <div className="flex items-center gap-3 text-green-700">
              <CheckCircle className="w-6 h-6" />
              <p className="text-lg font-bold">All Premium Content Unlocked!</p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Deep Dive Premium Notes
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Advanced financial concepts to take your knowledge to the next level
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumNotes.map((note, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="p-6 cursor-pointer hover:shadow-[var(--card-hover-shadow)] transition-all duration-300 border-2 hover:border-primary/30 hover:scale-105 relative overflow-hidden group">
                      <div className="absolute top-3 right-3">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${note.color} flex items-center justify-center mb-4`}>
                        <note.icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-foreground mb-2">{note.title}</h3>
                      
                      <div className="mt-4 flex items-center gap-2 text-green-600 font-medium text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>Unlocked</span>
                      </div>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3 text-2xl">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${note.color} flex items-center justify-center`}>
                          <note.icon className="w-6 h-6 text-white" />
                        </div>
                        {note.title}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 whitespace-pre-line text-base leading-relaxed text-foreground">
                      {note.content}
                    </div>
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-green-800">
                          <strong>Premium Content Unlocked:</strong> This advanced note is now available for you to learn deeper financial concepts!
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl font-bold text-foreground">All Content Now Available!</h3>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              All premium notes have been unlocked for you. Explore advanced topics on banking, mutual funds, SIPs, inflation, goal setting, compounding, fund types, and investment risks.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border border-green-200">
                <h4 className="font-bold mb-2 flex items-center gap-2 text-green-700">
                  <BookOpen className="w-5 h-5" />
                  8 Deep Notes
                </h4>
                <p className="text-sm text-muted-foreground">
                  Comprehensive explanations with examples
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-green-200">
                <h4 className="font-bold mb-2 flex items-center gap-2 text-green-700">
                  <Target className="w-5 h-5" />
                  Practical Knowledge
                </h4>
                <p className="text-sm text-muted-foreground">
                  Real-world scenarios and calculations
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-green-200">
                <h4 className="font-bold mb-2 flex items-center gap-2 text-green-700">
                  <Zap className="w-5 h-5" />
                  Zero Cost
                </h4>
                <p className="text-sm text-muted-foreground">
                  All content free for student learning
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Premium;

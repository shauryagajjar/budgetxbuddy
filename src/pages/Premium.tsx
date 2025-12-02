import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Lock, BookOpen, TrendingUp, Target, Lightbulb, Zap, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

const Premium = () => {
  const handlePremiumClick = () => {
    toast.info("FinRoad Premium will include deeper notes, advanced tools, and extra simulations — but everything is free for now. Premium is not launched yet.", {
      duration: 5000
    });
  };

  const premiumNotes = [
    {
      icon: BookOpen,
      title: "How Banks Use Your Money",
      teaser: "Banks lend and invest a portion of your deposits. They earn more interest than they pay you.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "Types of Mutual Funds",
      teaser: "Equity = high growth, high risk. Debt = low risk. Hybrid = balanced. ELSS = tax savings.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Target,
      title: "How SIPs Grow Over Years",
      teaser: "SIPs benefit from ups/downs and compounding. ₹300/month for 10 years at 12% → ₹69,000+.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Lightbulb,
      title: "Understanding Inflation",
      teaser: "If your money grows slower than inflation, you lose value. Investing helps beat inflation.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: BarChart,
      title: "Setting Long-Term Goals",
      teaser: "Choose goal → time → monthly saving → investment → track.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Zap,
      title: "Deep Compounding Benefits",
      teaser: "Compounding = your money works for you. Benefits: Bigger growth in later years, great for students, beats inflation.",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "Index vs Active Funds",
      teaser: "Index = simple, low fees. Active = managed by experts, higher fees.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Target,
      title: "What Makes Investments Risky",
      teaser: "Risk from market swings, inflation, economy. Reduced by long-term investing + diversification.",
      color: "from-violet-500 to-purple-500"
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            FinRoad Premium
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Deeper notes, advanced tools, and extra simulations
          </p>
          
          <Card className="inline-block p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20">
            <p className="text-lg font-medium mb-4">Premium is coming soon!</p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90 text-white"
              onClick={handlePremiumClick}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Learn More About Premium
            </Button>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Premium Notes Preview
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            These advanced notes will be unlocked with Premium (currently locked)
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
                    <Card className="p-6 cursor-pointer hover:shadow-[var(--card-hover-shadow)] transition-all duration-300 border-2 hover:border-yellow-500/30 relative overflow-hidden group">
                      <div className="absolute top-3 right-3">
                        <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                          <Lock className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${note.color} flex items-center justify-center mb-4 opacity-50 group-hover:opacity-70 transition-opacity`}>
                        <note.icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-foreground mb-2">{note.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{note.teaser}</p>
                      
                      <div className="mt-4 flex items-center gap-2 text-yellow-600 font-medium text-sm">
                        <Sparkles className="w-4 h-4" />
                        <span>Premium Content</span>
                      </div>
                    </Card>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${note.color} flex items-center justify-center`}>
                          <note.icon className="w-6 h-6 text-white" />
                        </div>
                        {note.title}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <p className="text-muted-foreground mb-6">{note.teaser}</p>
                      <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 text-center">
                        <Lock className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                        <p className="font-bold text-lg mb-2">This content is locked</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          Premium is not launched yet. When it does, you'll get access to deeper explanations, examples, and case studies!
                        </p>
                        <Button 
                          onClick={handlePremiumClick}
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Get Notified
                        </Button>
                      </Card>
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
          <Card className="p-8 bg-gradient-to-br from-muted/50 to-muted/20 border-2">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Why Premium Will Exist</h3>
            <p className="text-lg text-muted-foreground mb-6">
              FinRoad Premium is planned only to support better tools and deeper student learning. 
              The basic learning will always remain free for everyone.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-card rounded-lg">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Deeper Content
                </h4>
                <p className="text-sm text-muted-foreground">
                  Advanced explanations with real-world examples
                </p>
              </div>
              <div className="p-4 bg-card rounded-lg">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Better Tools
                </h4>
                <p className="text-sm text-muted-foreground">
                  More calculators and interactive simulations
                </p>
              </div>
              <div className="p-4 bg-card rounded-lg">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Support Development
                </h4>
                <p className="text-sm text-muted-foreground">
                  Help us keep building free educational content
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

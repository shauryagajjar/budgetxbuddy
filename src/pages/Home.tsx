import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Calculator, TrendingUp, Target, Shield, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BookOpen,
      title: "Simple Notes",
      description: "Learn budgeting, saving, and compound interest in plain English"
    },
    {
      icon: Calculator,
      title: "Easy Tools",
      description: "Budget calculators, savings planners, and compound interest visualizers"
    },
    {
      icon: TrendingUp,
      title: "Virtual Simulator",
      description: "Practice investing with fake money before using real money"
    },
    {
      icon: Target,
      title: "Personal Plans",
      description: "Get a custom money plan based on your goals and risk level"
    },
    {
      icon: Shield,
      title: "Risk-Free Learning",
      description: "100% educational. No real money, no pressure, just learning"
    },
    {
      icon: Lightbulb,
      title: "Avoid Mistakes",
      description: "Learn common money mistakes students make before making them"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <img src={logo} alt="BudgetBuddy Logo" className="w-40 h-40 mx-auto object-contain" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            Money skills schools <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              don't teach
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Understand saving, budgeting, interest, and investments in the simplest way.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-lg"
              onClick={() => navigate("/basics")}
            >
              Start Learning
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 rounded-full border-2"
              onClick={() => navigate("/simulator")}
            >
              Try Simulator
            </Button>
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-6 rounded-full"
              onClick={() => navigate("/premium")}
            >
              Premium (Coming Soon)
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-4 text-foreground"
          >
            Everything you need to learn money
          </motion.h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Simple, practical, and built for students
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:shadow-[var(--card-hover-shadow)] transition-shadow duration-300 border-2 hover:border-primary/20">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-4xl"
        >
          <Card className="p-12 text-center bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border-2 border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Ready to learn money skills?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of students learning financial literacy the easy way
            </p>
            <Button 
              size="lg"
              className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              onClick={() => navigate("/basics")}
            >
              Get Started Free
            </Button>
          </Card>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;

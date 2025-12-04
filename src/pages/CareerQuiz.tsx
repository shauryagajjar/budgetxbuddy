import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, Code, Palette, Stethoscope, Building2, GraduationCap,
  TrendingUp, PiggyBank, Shield, Calculator, Target, ArrowRight, Check
} from "lucide-react";

const careers = [
  { id: "entrepreneur", name: "Entrepreneur / Business Owner", icon: Briefcase },
  { id: "engineer", name: "Engineer / Tech Professional", icon: Code },
  { id: "creative", name: "Designer / Creative Professional", icon: Palette },
  { id: "medical", name: "Doctor / Medical Professional", icon: Stethoscope },
  { id: "corporate", name: "Corporate Job / Manager", icon: Building2 },
  { id: "teacher", name: "Teacher / Educator", icon: GraduationCap },
];

const careerAdvice: Record<string, {
  title: string;
  description: string;
  focusAreas: { icon: React.ElementType; title: string; tip: string }[];
  keyNumbers: { label: string; value: string }[];
}> = {
  entrepreneur: {
    title: "Financial Tips for Entrepreneurs",
    description: "As a future business owner, you'll need to understand cash flow, risk management, and smart investing.",
    focusAreas: [
      { icon: TrendingUp, title: "Cash Flow Management", tip: "Always keep 6+ months of expenses saved before starting a business" },
      { icon: Shield, title: "Risk Management", tip: "Never invest all your savings in one business. Diversify!" },
      { icon: Calculator, title: "Compound Growth", tip: "Reinvest profits early for exponential business growth" },
      { icon: Target, title: "Emergency Fund", tip: "Business income is irregular. Keep a larger emergency fund (12 months)" },
    ],
    keyNumbers: [
      { label: "Emergency Fund", value: "12 months expenses" },
      { label: "Business Insurance", value: "Must have" },
      { label: "Retirement Savings", value: "Start from Day 1" },
    ],
  },
  engineer: {
    title: "Financial Tips for Engineers",
    description: "With stable income, you can focus on long-term wealth building and smart tax planning.",
    focusAreas: [
      { icon: TrendingUp, title: "Long-term Investing", tip: "Start SIP early - even ₹5,000/month becomes ₹1 Crore in 20 years" },
      { icon: PiggyBank, title: "Tax Savings", tip: "Max out 80C (₹1.5L), NPS (₹50K extra), and health insurance" },
      { icon: Shield, title: "Emergency Fund", tip: "Keep 6 months expenses liquid for job security" },
      { icon: Calculator, title: "Lifestyle Creep", tip: "When salary increases, increase savings first, not spending" },
    ],
    keyNumbers: [
      { label: "Savings Rate", value: "30-40% of income" },
      { label: "Emergency Fund", value: "6 months expenses" },
      { label: "Investment Start Age", value: "Day 1 of job!" },
    ],
  },
  creative: {
    title: "Financial Tips for Creative Professionals",
    description: "Freelance and creative work often means irregular income. Plan accordingly!",
    focusAreas: [
      { icon: Calculator, title: "Irregular Income Budgeting", tip: "Budget based on your lowest month, not average" },
      { icon: Shield, title: "Large Emergency Fund", tip: "Keep 9-12 months expenses due to income gaps" },
      { icon: PiggyBank, title: "Project-Based Saving", tip: "Save 30% of every project payment immediately" },
      { icon: Target, title: "Multiple Income Streams", tip: "Passive income (courses, prints) provides stability" },
    ],
    keyNumbers: [
      { label: "Emergency Fund", value: "9-12 months" },
      { label: "Per Project Savings", value: "30% minimum" },
      { label: "Tax Set Aside", value: "25-30% per project" },
    ],
  },
  medical: {
    title: "Financial Tips for Medical Professionals",
    description: "Long education means delayed earning, but high income potential. Plan for both phases.",
    focusAreas: [
      { icon: GraduationCap, title: "Education Loans", tip: "Plan loan repayment strategy before graduating" },
      { icon: TrendingUp, title: "Late Start Investing", tip: "Higher SIP amounts needed to catch up - start immediately after residency" },
      { icon: Shield, title: "Professional Insurance", tip: "Medical malpractice insurance is essential" },
      { icon: Calculator, title: "Practice Setup Costs", tip: "Save for clinic setup or partnership buy-in" },
    ],
    keyNumbers: [
      { label: "Loan Repayment", value: "Prioritize first 5 years" },
      { label: "Savings Rate", value: "40-50% post-loan" },
      { label: "Insurance", value: "Professional + Health" },
    ],
  },
  corporate: {
    title: "Financial Tips for Corporate Professionals",
    description: "Steady growth potential with good benefits. Maximize what your employer offers!",
    focusAreas: [
      { icon: PiggyBank, title: "Employer Benefits", tip: "Max out PF, gratuity, and any matching contributions" },
      { icon: TrendingUp, title: "Promotion Planning", tip: "Each raise = increase savings rate by same percentage" },
      { icon: Shield, title: "Job Security Fund", tip: "Corporate restructuring happens. Keep 6-9 months saved" },
      { icon: Target, title: "Skill Investment", tip: "Budget for courses/certifications for career growth" },
    ],
    keyNumbers: [
      { label: "PF Contribution", value: "Max out always" },
      { label: "Emergency Fund", value: "6-9 months" },
      { label: "Learning Budget", value: "5% of income" },
    ],
  },
  teacher: {
    title: "Financial Tips for Educators",
    description: "Stable income with summers off. Plan for predictable but modest growth.",
    focusAreas: [
      { icon: Calculator, title: "Summer Income", tip: "Consider tutoring or online courses for summer income" },
      { icon: PiggyBank, title: "Pension Planning", tip: "Government pensions are changing. Add personal retirement savings" },
      { icon: Shield, title: "Health Coverage", tip: "Ensure adequate health insurance beyond employer coverage" },
      { icon: Target, title: "Side Income", tip: "Online tutoring or content creation can boost income 30-50%" },
    ],
    keyNumbers: [
      { label: "Additional Savings", value: "Beyond pension" },
      { label: "Summer Planning", value: "Budget or earn" },
      { label: "Side Income Goal", value: "30% extra" },
    ],
  },
};

const CareerQuiz = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [savedCareer, setSavedCareer] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchSavedCareer();
    }
  }, [user]);

  const fetchSavedCareer = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("profiles")
      .select("dream_career")
      .eq("user_id", user.id)
      .maybeSingle();
    
    if (data?.dream_career) {
      setSavedCareer(data.dream_career);
      setSelectedCareer(data.dream_career);
      setShowResult(true);
    }
  };

  const handleSubmit = async () => {
    if (!selectedCareer) return;
    setShowResult(true);

    if (user) {
      await supabase
        .from("profiles")
        .update({ dream_career: selectedCareer })
        .eq("user_id", user.id);
      toast.success("Career preference saved!");
    }
  };

  const resetQuiz = () => {
    setSelectedCareer(null);
    setShowResult(false);
  };

  const advice = selectedCareer ? careerAdvice[selectedCareer] : null;

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">Career-Based Financial Guidance</h1>
          <p className="text-muted-foreground text-lg">
            Select your dream career and get personalized financial tips
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>What's your dream career?</CardTitle>
                  <CardDescription>
                    Select the career path that interests you most
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {careers.map((career) => (
                      <motion.div
                        key={career.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant={selectedCareer === career.id ? "default" : "outline"}
                          className="w-full h-auto py-4 px-4 justify-start"
                          onClick={() => setSelectedCareer(career.id)}
                        >
                          <career.icon className="w-5 h-5 mr-3" />
                          {career.name}
                          {selectedCareer === career.id && (
                            <Check className="w-4 h-4 ml-auto" />
                          )}
                        </Button>
                      </motion.div>
                    ))}
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg"
                    disabled={!selectedCareer}
                    onClick={handleSubmit}
                  >
                    Get My Financial Tips
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : advice ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <Card className="border-primary/50 bg-primary/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge className="mb-2">Your Career Path</Badge>
                      <CardTitle className="text-2xl">{advice.title}</CardTitle>
                      <CardDescription className="text-base mt-2">
                        {advice.description}
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={resetQuiz}>
                      Change Career
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                {advice.focusAreas.map((area, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <area.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">{area.title}</h3>
                            <p className="text-sm text-muted-foreground">{area.tip}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Key Numbers to Remember</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {advice.keyNumbers.map((item, index) => (
                      <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">{item.value}</p>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => navigate("/learning-path")}
                >
                  Start Learning Path
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => navigate("/simulations")}
                >
                  Try Simulations
                </Button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <p className="text-center text-sm text-muted-foreground mt-12">
          For Education Only - General guidance, not professional financial advice.
        </p>
      </div>
    </div>
  );
};

export default CareerQuiz;

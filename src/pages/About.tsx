import { Card } from "@/components/ui/card";
import { BookOpen, Shield, Heart, GraduationCap, AlertCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const points = [
    {
      icon: BookOpen,
      title: "Why Financial Literacy Matters",
      content: "Money affects every part of life - from buying things you want to planning for the future. Understanding how money works gives you control, confidence, and freedom. Yet most schools don't teach these essential skills.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: GraduationCap,
      title: "Why Schools Don't Teach This",
      content: "Traditional education focuses on academics, but practical money skills are often left out. That's why students graduate without knowing how to budget, save, or invest - skills they'll use every single day.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Shield,
      title: "This App is 100% Educational",
      content: "FinRoad Student is a safe learning space. No real money, no real investing, no pressure. Just clear explanations and practice tools to help you understand money before you need to use it.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: AlertCircle,
      title: "No Real Investing Takes Place",
      content: "Everything here uses virtual money and simulated scenarios. The investment simulator is purely educational - it helps you understand concepts like risk, diversification, and compound interest without any real financial risk.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Sparkles,
      title: "Why Subscription Exists",
      content: "FinRoad Premium is planned only to support better tools and deeper student learning. The basic learning will always remain free for everyone. Premium will include advanced notes, extra tools, and detailed case studies - helping us continue building quality educational content.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Heart,
      title: "Our Mission",
      content: "We believe every student deserves to understand money. Our goal is to make financial literacy accessible, simple, and practical - teaching you the skills that schools miss but life requires.",
      color: "from-teal-500 to-cyan-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            About FinRoad Student
          </h1>
          <p className="text-xl text-muted-foreground">
            Learning the money skills schools don't teach
          </p>
        </motion.div>

        <div className="space-y-6 mb-12">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 border-2 hover:border-primary/20 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${point.color} flex items-center justify-center flex-shrink-0`}>
                    <point.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-3 text-foreground">{point.title}</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">{point.content}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20 text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Start Your Journey</h2>
            <p className="text-xl text-muted-foreground mb-6">
              You're never too young to learn about money. The earlier you start, the better prepared you'll be for life's financial decisions.
            </p>
            <div className="inline-block p-4 bg-card rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Remember</p>
              <p className="text-2xl font-bold text-primary">Knowledge is your best investment</p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Card className="p-6 bg-yellow-50 border-yellow-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-700 flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-yellow-900 mb-2">Important Disclaimer</p>
                <p className="text-sm text-yellow-800">
                  FinRoad Student is an educational platform designed to teach financial concepts to students. 
                  All simulations use virtual money only. No real financial transactions occur on this platform. 
                  Always consult with parents or guardians before making any real financial decisions. 
                  This platform does not provide professional financial advice.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

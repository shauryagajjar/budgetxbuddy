import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { 
  BookOpen, Target, TrendingUp, PiggyBank, Calculator, 
  CheckCircle, Lock, Trophy, Star, Zap, Award
} from "lucide-react";

const topics = [
  { id: "money-basics", title: "Why Money Skills Matter", icon: BookOpen, difficulty: "Beginner" },
  { id: "needs-vs-wants", title: "Needs vs Wants", icon: Target, difficulty: "Beginner" },
  { id: "budgeting", title: "Budgeting Basics", icon: Calculator, difficulty: "Beginner" },
  { id: "saving-habits", title: "Saving & Habits", icon: PiggyBank, difficulty: "Intermediate" },
  { id: "simple-compound", title: "Simple vs Compound Interest", icon: TrendingUp, difficulty: "Intermediate" },
  { id: "goal-saving", title: "Goal-Based Saving", icon: Target, difficulty: "Intermediate" },
  { id: "investing-basics", title: "Basics of Investing", icon: TrendingUp, difficulty: "Advanced" },
];

const badges = [
  { id: "first-step", name: "First Step", icon: Star, description: "Complete your first topic", requirement: 1 },
  { id: "halfway-hero", name: "Halfway Hero", icon: Zap, description: "Complete 3 topics", requirement: 3 },
  { id: "money-master", name: "Money Master", icon: Trophy, description: "Complete all topics", requirement: 7 },
  { id: "quick-learner", name: "Quick Learner", icon: Award, description: "Complete 2 topics in one session", requirement: 2 },
];

const LearningPath = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [achievements, setAchievements] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProgress();
      fetchAchievements();
    }
  }, [user]);

  const fetchProgress = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("learning_progress")
      .select("topic_id, completed")
      .eq("user_id", user.id);
    
    const progressMap: Record<string, boolean> = {};
    data?.forEach((p) => {
      progressMap[p.topic_id] = p.completed || false;
    });
    setProgress(progressMap);
    setLoading(false);
  };

  const fetchAchievements = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("achievements")
      .select("badge_id")
      .eq("user_id", user.id);
    
    setAchievements(data?.map((a) => a.badge_id) || []);
  };

  const markComplete = async (topicId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from("learning_progress")
      .upsert({
        user_id: user.id,
        topic_id: topicId,
        completed: true,
        completed_at: new Date().toISOString(),
      }, { onConflict: "user_id,topic_id" });

    if (error) {
      toast.error("Failed to save progress");
      return;
    }

    setProgress((prev) => ({ ...prev, [topicId]: true }));
    toast.success("Topic completed! 🎉");
    checkForBadges({ ...progress, [topicId]: true });
  };

  const checkForBadges = async (currentProgress: Record<string, boolean>) => {
    if (!user) return;
    const completedCount = Object.values(currentProgress).filter(Boolean).length;

    for (const badge of badges) {
      if (completedCount >= badge.requirement && !achievements.includes(badge.id)) {
        await supabase.from("achievements").insert({
          user_id: user.id,
          badge_id: badge.id,
        });
        setAchievements((prev) => [...prev, badge.id]);
        toast.success(`🏆 New Badge: ${badge.name}!`);
      }
    }
  };

  const completedCount = Object.values(progress).filter(Boolean).length;
  const progressPercent = (completedCount / topics.length) * 100;

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">Your Learning Path</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Track your progress and earn badges as you learn
          </p>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">{completedCount}/{topics.length} topics</span>
              </div>
              <Progress value={progressPercent} className="h-3" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Badges Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Your Badges
            </CardTitle>
            <CardDescription>Earn badges by completing topics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {badges.map((badge) => {
                const earned = achievements.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-lg text-center transition-all ${
                      earned 
                        ? "bg-primary/10 border-2 border-primary" 
                        : "bg-muted/50 opacity-50"
                    }`}
                  >
                    <badge.icon className={`w-8 h-8 mx-auto mb-2 ${earned ? "text-primary" : "text-muted-foreground"}`} />
                    <p className="font-medium text-sm">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Topics List */}
        <div className="space-y-4">
          {topics.map((topic, index) => {
            const isCompleted = progress[topic.id];
            const isLocked = index > 0 && !progress[topics[index - 1].id] && !isCompleted;

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`transition-all ${isLocked ? "opacity-50" : "hover:shadow-lg"}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isCompleted 
                            ? "bg-green-500/20 text-green-500" 
                            : isLocked 
                            ? "bg-muted text-muted-foreground" 
                            : "bg-primary/20 text-primary"
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : isLocked ? (
                            <Lock className="w-6 h-6" />
                          ) : (
                            <topic.icon className="w-6 h-6" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{topic.title}</h3>
                          <Badge variant="secondary" className="mt-1">{topic.difficulty}</Badge>
                        </div>
                      </div>
                      
                      {!isLocked && (
                        <Button
                          variant={isCompleted ? "outline" : "default"}
                          onClick={() => !isCompleted && markComplete(topic.id)}
                          disabled={isCompleted}
                        >
                          {isCompleted ? "Completed" : "Mark Complete"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          For Education Only - This is a learning tracker, not financial advice.
        </p>
      </div>
    </div>
  );
};

export default LearningPath;

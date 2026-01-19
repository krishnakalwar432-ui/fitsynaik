import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Dumbbell, BookOpen, Trophy, Apple, LineChart, Grid3X3, CreditCard, Map, Flower2, ChevronRight, Sparkles } from "lucide-react";
import AppShell from "@/components/AppShell";
import FeatureCard from "@/components/FeatureCard";
import FitSynLogo from "@/components/FitSynLogo";
import QuickStartWidget from "@/components/QuickStartWidget";
import { useAuth } from "@/contexts/AuthContext";

const features = [
  {
    icon: <Brain size={28} />,
    title: "AI Workout Generator",
    description: "Get personalized workouts powered by AI based on your goals and fitness level.",
    route: "/workout-generator",
    gradient: "from-cyan-500/20 to-blue-500/10"
  },
  {
    icon: <Dumbbell size={28} />,
    title: "AI Form Assistant",
    description: "Real-time form correction and guidance for perfect technique.",
    route: "/form-assistant",
    gradient: "from-purple-500/20 to-pink-500/10"
  },
  {
    icon: <BookOpen size={28} />,
    title: "Exercise Library",
    description: "Comprehensive library of exercises with detailed instructions.",
    route: "/exercise-library",
    gradient: "from-green-500/20 to-emerald-500/10"
  },
  {
    icon: <Trophy size={28} />,
    title: "Strength Arena",
    description: "Challenge yourself and compete with others in strength challenges.",
    route: "/strength-arena",
    gradient: "from-amber-500/20 to-orange-500/10"
  },
  {
    icon: <Apple size={28} />,
    title: "AI Nutrition",
    description: "Smart meal planning and nutrition tracking tailored to you.",
    route: "/nutrition",
    gradient: "from-red-500/20 to-rose-500/10"
  },
  {
    icon: <LineChart size={28} />,
    title: "Tracker",
    description: "Track your workouts, progress, and achievements over time.",
    route: "/tracker",
    gradient: "from-blue-500/20 to-indigo-500/10"
  },
  {
    icon: <Grid3X3 size={28} />,
    title: "FitMatrix",
    description: "Interactive workout grid for structured training sessions.",
    route: "/fitmatrix",
    gradient: "from-teal-500/20 to-cyan-500/10"
  },
  {
    icon: <CreditCard size={28} />,
    title: "Smash Card",
    description: "Quick workout challenges to push your limits.",
    route: "/smash-card",
    gradient: "from-violet-500/20 to-purple-500/10"
  },
  {
    icon: <Map size={28} />,
    title: "FitMap",
    description: "Discover fitness spots, gyms, and outdoor workout locations.",
    route: "/fitmap",
    gradient: "from-emerald-500/20 to-green-500/10"
  },
  {
    icon: <Flower2 size={28} />,
    title: "AI Yoga",
    description: "Guided yoga sessions with AI-powered pose detection.",
    route: "/yoga",
    gradient: "from-pink-500/20 to-rose-500/10"
  },
];

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <AppShell>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative px-4 pt-8 pb-6 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-glow-secondary/10 rounded-full blur-3xl" />
          </div>

          <motion.div
            className="relative z-10 max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo animation */}
            <motion.div
              className="inline-flex items-center justify-center mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            >
              <FitSynLogo size="xl" animate />
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Your AI-powered fitness companion. Train smarter, get stronger.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                onClick={() => navigate("/workout-generator")}
                className="btn-glow flex items-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Sparkles size={18} />
                Start Training
                <ChevronRight size={18} />
              </motion.button>

              {!user && (
                <motion.button
                  onClick={() => navigate("/login")}
                  className="px-5 py-2.5 rounded-xl bg-secondary text-foreground font-semibold hover:bg-secondary/80 transition-colors haptic-press"
                  whileTap={{ scale: 0.97 }}
                >
                  Sign In
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        </section>

        {/* Quick Start Widget */}
        <section className="px-4 pb-6">
          <div className="max-w-2xl mx-auto">
            <QuickStartWidget />
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
                Explore Modules
              </h2>
              <p className="text-muted-foreground">
                Everything you need for your fitness journey
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.route}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  gradient={feature.gradient}
                  onClick={() => navigate(feature.route)}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom padding for mobile */}
        <div className="h-8" />
      </div>
    </AppShell>
  );
};

export default Index;

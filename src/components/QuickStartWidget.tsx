import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Play, Clock, Flame, Zap, ChevronRight } from "lucide-react";
import { useSoundContext } from "@/contexts/SoundContext";

const todaysWorkouts = [
  {
    id: 1,
    title: "Full Body HIIT",
    duration: "25 min",
    calories: "320 cal",
    intensity: "High",
    gradient: "from-orange-500/20 to-red-500/10",
    route: "/workout-generator"
  },
  {
    id: 2,
    title: "Core Strength",
    duration: "15 min",
    calories: "150 cal",
    intensity: "Medium",
    gradient: "from-blue-500/20 to-cyan-500/10",
    route: "/workout-generator"
  },
  {
    id: 3,
    title: "Morning Yoga",
    duration: "20 min",
    calories: "100 cal",
    intensity: "Low",
    gradient: "from-purple-500/20 to-pink-500/10",
    route: "/yoga"
  }
];

const QuickStartWidget = () => {
  const navigate = useNavigate();
  const { playClick } = useSoundContext();

  // Get a "random" workout based on the day
  const dayIndex = new Date().getDay() % todaysWorkouts.length;
  const suggestedWorkout = todaysWorkouts[dayIndex];

  const handleStart = () => {
    playClick();
    navigate(suggestedWorkout.route);
  };

  const handleViewAll = () => {
    playClick();
    navigate("/workout-generator");
  };

  return (
    <motion.div
      className="glass-panel p-5 md:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <motion.div
            className="p-2 rounded-lg bg-primary/10"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap size={18} className="text-primary" />
          </motion.div>
          <div>
            <h3 className="font-display font-semibold text-foreground">Quick Start</h3>
            <p className="text-xs text-muted-foreground">Today's suggested workout</p>
          </div>
        </div>
        <button
          onClick={handleViewAll}
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          View all
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Featured Workout Card */}
      <motion.div
        className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${suggestedWorkout.gradient} border border-border/30 p-4 mb-4`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Animated background shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
          animate={{ translateX: ["−100%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="text-lg font-display font-bold text-foreground mb-1">
                {suggestedWorkout.title}
              </h4>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {suggestedWorkout.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Flame size={12} />
                  {suggestedWorkout.calories}
                </span>
              </div>
            </div>
            
            {/* Intensity Badge */}
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              suggestedWorkout.intensity === "High" 
                ? "bg-red-500/20 text-red-400"
                : suggestedWorkout.intensity === "Medium"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-green-500/20 text-green-400"
            }`}>
              {suggestedWorkout.intensity}
            </span>
          </div>

          {/* Start Button */}
          <motion.button
            onClick={handleStart}
            className="w-full btn-glow flex items-center justify-center gap-2 py-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Play size={18} fill="currentColor" />
            </motion.div>
            Start Workout
          </motion.button>
        </div>
      </motion.div>

      {/* Other Workout Options */}
      <div className="space-y-2">
        {todaysWorkouts
          .filter((w) => w.id !== suggestedWorkout.id)
          .map((workout) => (
            <motion.button
              key={workout.id}
              onClick={() => { playClick(); navigate(workout.route); }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  workout.intensity === "High" 
                    ? "bg-red-400"
                    : workout.intensity === "Medium"
                    ? "bg-yellow-400"
                    : "bg-green-400"
                }`} />
                <span className="font-medium text-sm text-foreground">{workout.title}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock size={12} />
                {workout.duration}
                <ChevronRight size={14} className="text-primary" />
              </div>
            </motion.button>
          ))}
      </div>
    </motion.div>
  );
};

export default QuickStartWidget;

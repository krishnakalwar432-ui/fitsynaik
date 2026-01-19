import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
  minDuration?: number;
}

const SplashScreen = ({ onComplete, minDuration = 2000 }: SplashScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 500); // Wait for exit animation
    }, minDuration);

    return () => clearTimeout(timer);
  }, [onComplete, minDuration]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Animated background rings */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-primary/20"
                style={{ width: 150 + i * 80, height: 150 + i * 80 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: [0.8, 1.2, 0.8], 
                  opacity: [0, 0.5, 0] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.3,
                  ease: "easeInOut" 
                }}
              />
            ))}
          </div>

          {/* Glowing background */}
          <motion.div
            className="absolute w-80 h-80 rounded-full bg-primary/10 blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />

          {/* Logo Container */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.34, 1.56, 0.64, 1] // Spring-like
            }}
          >
            {/* Dumbbell Icon with Pulse */}
            <motion.div
              className="relative mb-6"
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 1.2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              {/* Glow ring */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ 
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.3, 1]
                }}
                transition={{ 
                  duration: 1.2, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                <div className="w-28 h-28 rounded-full bg-primary/30 blur-xl" />
              </motion.div>

              {/* Icon */}
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                <Dumbbell 
                  size={72} 
                  className="text-primary drop-shadow-[0_0_30px_hsl(var(--primary)/0.8)]" 
                />
              </motion.div>
            </motion.div>

            {/* FitSyn Text */}
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.span
                className="text-5xl md:text-6xl font-display font-bold tracking-tight"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Fit<span className="text-primary text-glow">Syn</span>
              </motion.span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="mt-4 text-muted-foreground text-sm tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              AI-Powered Fitness
            </motion.p>

            {/* Loading bar */}
            <motion.div
              className="mt-8 w-48 h-1 bg-secondary rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-glow-secondary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ 
                  duration: minDuration / 1000 - 0.5, 
                  ease: "easeInOut" 
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Dumbbell } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = forwardRef<HTMLDivElement, LoadingScreenProps>(({ 
  message = "Loading FitSyn Experience…" 
}, ref) => {
  return (
    <motion.div 
      ref={ref}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="absolute w-40 h-40 rounded-full border border-primary/20"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-60 h-60 rounded-full border border-primary/10"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
      </div>

      {/* Logo container */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
      >
        {/* Animated dumbbell */}
        <motion.div
          className="relative"
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <Dumbbell 
            size={64} 
            className="text-primary drop-shadow-[0_0_30px_hsl(var(--primary)/0.6)]" 
          />
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-20 h-20 rounded-full bg-primary/20 blur-xl" />
          </motion.div>
        </motion.div>

        {/* FitSyn text */}
        <motion.div
          className="flex items-center gap-1"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-4xl font-display font-bold tracking-tight">
            Fit<span className="text-primary text-glow">Syn</span>
          </span>
        </motion.div>

        {/* Loading text */}
        <motion.p
          className="text-muted-foreground text-sm tracking-wide"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {message}
        </motion.p>

        {/* Loading dots */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 0.6, 
                repeat: Infinity, 
                delay: i * 0.15,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
});

LoadingScreen.displayName = "LoadingScreen";

export default LoadingScreen;

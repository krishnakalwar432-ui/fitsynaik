import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";

interface FitSynLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  animate?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: { icon: 20, text: "text-lg" },
  md: { icon: 28, text: "text-xl" },
  lg: { icon: 40, text: "text-3xl" },
  xl: { icon: 56, text: "text-5xl" },
};

const FitSynLogo = forwardRef<HTMLDivElement, FitSynLogoProps>(({ 
  size = "md", 
  showText = true, 
  animate = false,
  className 
}, ref) => {
  const { icon, text } = sizeClasses[size];

  return (
    <motion.div 
      ref={ref}
      className={cn("flex items-center gap-2", className)}
      initial={animate ? { opacity: 0, scale: 0.9 } : false}
      animate={animate ? { opacity: 1, scale: 1 } : false}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
        className="relative"
        animate={animate ? { rotate: [0, 10, -10, 0] } : {}}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Dumbbell 
          size={icon} 
          className="text-primary drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]" 
        />
      </motion.div>
      {showText && (
        <span className={cn(
          "font-display font-bold tracking-tight text-foreground",
          text
        )}>
          Fit<span className="text-primary text-glow">Syn</span>
        </span>
      )}
    </motion.div>
  );
});

FitSynLogo.displayName = "FitSynLogo";

export default FitSynLogo;

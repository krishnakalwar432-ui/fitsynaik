import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import { useSoundContext } from "@/contexts/SoundContext";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  gradient?: string;
  onClick: () => void;
  index: number;
}

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  gradient = "from-primary/20 to-primary/5",
  onClick,
  index 
}: FeatureCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { playClick } = useSoundContext();

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    playClick();
    onClick();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.05, 
        duration: 0.4, 
        ease: "easeOut" 
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="cursor-pointer perspective-1000"
    >
      <motion.div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} border border-border/50 p-6 h-full`}
        whileHover={{ 
          boxShadow: "0 20px 40px rgba(0,0,0,0.3), 0 0 60px hsl(var(--primary) / 0.15)"
        }}
        whileTap={{ scale: 0.97 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
          whileHover={{ translateX: "100%" }}
          transition={{ duration: 0.6 }}
        />

        {/* Content */}
        <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
          {/* Icon */}
          <motion.div 
            className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-lg font-display font-semibold text-foreground mb-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Corner glow */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
      </motion.div>
    </motion.div>
  );
};

export default FeatureCard;

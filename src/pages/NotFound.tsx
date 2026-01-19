import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import AppShell from "@/components/AppShell";
import FitSynLogo from "@/components/FitSynLogo";
import { useSoundContext } from "@/contexts/SoundContext";

const NotFound = () => {
  const navigate = useNavigate();
  const { playClick } = useSoundContext();

  const handleGoHome = () => {
    playClick();
    navigate("/");
  };

  const handleGoBack = () => {
    playClick();
    navigate(-1);
  };

  return (
    <AppShell>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          className="relative z-10 text-center max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Logo */}
          <motion.div
            className="inline-block mb-6"
            animate={{ 
              rotate: [0, 5, -5, 0],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <FitSynLogo size="xl" showText={false} />
          </motion.div>

          {/* 404 */}
          <motion.h1
            className="text-8xl font-display font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            4<span className="text-primary text-glow">0</span>4
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Oops! This workout doesn't exist.
          </motion.p>

          {/* Actions */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              onClick={handleGoHome}
              className="btn-glow flex items-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Home size={18} />
              Go Home
            </motion.button>

            <motion.button
              onClick={handleGoBack}
              className="px-6 py-3 rounded-xl bg-secondary text-foreground font-semibold flex items-center gap-2 hover:bg-secondary/80 transition-colors haptic-press"
              whileTap={{ scale: 0.97 }}
            >
              <ArrowLeft size={18} />
              Go Back
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </AppShell>
  );
};

export default NotFound;
import { motion, AnimatePresence } from "framer-motion";
import { X, Dumbbell, Brain, BookOpen, Trophy, Apple, LineChart, Grid3X3, CreditCard, Map, Flower2, LogIn, UserPlus, User, Settings, LogOut } from "lucide-react";
import { useSoundContext } from "@/contexts/SoundContext";
import { useAuth } from "@/contexts/AuthContext";
import FitSynLogo from "./FitSynLogo";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  route: string;
  description?: string;
}

const primaryMenuItems: MenuItem[] = [
  { icon: <Brain size={24} />, label: "AI Workout Generator", route: "/workout-generator", description: "Generate custom workouts" },
  { icon: <Dumbbell size={24} />, label: "AI Form Assistant", route: "/form-assistant", description: "Perfect your form" },
  { icon: <BookOpen size={24} />, label: "Exercise Library", route: "/exercise-library", description: "Browse exercises" },
  { icon: <Trophy size={24} />, label: "Strength Arena", route: "/strength-arena", description: "Compete & challenge" },
  { icon: <Apple size={24} />, label: "AI Nutrition", route: "/nutrition", description: "Smart meal planning" },
  { icon: <LineChart size={24} />, label: "Tracker", route: "/tracker", description: "Track your progress" },
  { icon: <Grid3X3 size={24} />, label: "FitMatrix", route: "/fitmatrix", description: "Interactive workouts" },
  { icon: <CreditCard size={24} />, label: "Smash Card", route: "/smash-card", description: "Workout challenges" },
  { icon: <Map size={24} />, label: "FitMap", route: "/fitmap", description: "Find fitness spots" },
  { icon: <Flower2 size={24} />, label: "AI Yoga", route: "/yoga", description: "Guided yoga sessions" },
];

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

const FullScreenMenu = ({ isOpen, onClose, onNavigate }: FullScreenMenuProps) => {
  const { playClick, playSwoosh } = useSoundContext();
  const { user, signOut } = useAuth();

  const handleClose = () => {
    playSwoosh();
    onClose();
  };

  const handleNavigate = (route: string) => {
    playClick();
    onNavigate(route);
    onClose();
  };

  const handleSignOut = async () => {
    playClick();
    await signOut();
    onClose();
  };

  // Get display name - use displayName, email prefix, or "User"
  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";

  // Dynamic secondary menu based on auth state
  const getSecondaryMenuItems = (): MenuItem[] => {
    if (user) {
      return [
        { icon: <Settings size={20} />, label: "Settings", route: "/settings" },
      ];
    }
    return [
      { icon: <LogIn size={20} />, label: "Login", route: "/login" },
      { icon: <UserPlus size={20} />, label: "Sign Up", route: "/signup" },
      { icon: <User size={20} />, label: "Continue as Guest", route: "/" },
      { icon: <Settings size={20} />, label: "Settings", route: "/settings" },
    ];
  };

  const secondaryMenuItems = getSecondaryMenuItems();

  const menuVariants = {
    closed: {
      x: "-100%",
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    },
    open: {
      x: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    }
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 + i * 0.03, duration: 0.3 }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md"
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={handleClose}
          />

          {/* Menu Panel */}
          <motion.div
            className="fixed inset-y-0 left-0 z-50 w-full max-w-md bg-card border-r border-border overflow-y-auto"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-card/90 backdrop-blur-sm border-b border-border">
              <FitSynLogo size="md" />
              <motion.button
                onClick={handleClose}
                className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors haptic-press"
                whileTap={{ scale: 0.92 }}
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* User Profile Section (if logged in) */}
            {user && (
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/10">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <User size={24} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate">{displayName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Primary Menu Items */}
            <div className="p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Modules
              </p>
              <div className="space-y-2">
                {primaryMenuItems.map((item, i) => (
                  <motion.button
                    key={item.route}
                    custom={i}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    onClick={() => handleNavigate(item.route)}
                    className="w-full flex items-center gap-4 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/60 transition-all haptic-press group"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {item.icon}
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-foreground">{item.label}</p>
                      {item.description && (
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="mx-4 h-px bg-border" />

            {/* Secondary Menu Items */}
            <div className="p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Account
              </p>
              <div className="space-y-2">
                {secondaryMenuItems.map((item, i) => (
                  <motion.button
                    key={item.route}
                    custom={i + primaryMenuItems.length}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    onClick={() => handleNavigate(item.route)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/40 transition-all haptic-press"
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-muted-foreground">{item.icon}</div>
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </motion.button>
                ))}

                {/* Sign Out Button (only if logged in) */}
                {user && (
                  <motion.button
                    custom={secondaryMenuItems.length + primaryMenuItems.length}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 transition-all haptic-press text-red-400"
                    whileTap={{ scale: 0.98 }}
                  >
                    <LogOut size={20} />
                    <span className="text-sm font-medium">Sign Out</span>
                  </motion.button>
                )}
              </div>
            </div>

            {/* Footer hint (only if not logged in) */}
            {!user && (
              <div className="p-4 mt-4">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <p className="text-xs text-muted-foreground text-center">
                    💡 Login to sync your progress across devices
                  </p>
                </div>
              </div>
            )}

            {/* Footer hint (if logged in) */}
            {user && (
              <div className="p-4 mt-4">
                <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10">
                  <p className="text-xs text-green-400 text-center">
                    ✓ Logged in as {displayName}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FullScreenMenu;

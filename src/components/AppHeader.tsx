import { motion } from "framer-motion";
import { Menu, Volume2, VolumeX, User, LogOut } from "lucide-react";
import FitSynLogo from "./FitSynLogo";
import { useSoundContext } from "@/contexts/SoundContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface AppHeaderProps {
  onMenuClick: () => void;
}

const AppHeader = ({ onMenuClick }: AppHeaderProps) => {
  const { isMuted, toggleMute, playClick } = useSoundContext();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleMenuClick = () => {
    playClick();
    onMenuClick();
  };

  const handleMuteClick = () => {
    toggleMute();
  };

  const handleSignOut = async () => {
    playClick();
    await signOut();
    setShowUserMenu(false);
    navigate("/");
  };

  const handleUserClick = () => {
    playClick();
    if (user) {
      setShowUserMenu(!showUserMenu);
    } else {
      navigate("/login");
    }
  };

  // Get display name - use displayName, email prefix, or "User"
  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 h-16 px-4 glass-panel rounded-none border-t-0 border-x-0"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="h-full flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: Hamburger Menu */}
        <motion.button
          onClick={handleMenuClick}
          className="p-2 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors haptic-press focus-ring"
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
        >
          <Menu size={24} className="text-foreground" />
        </motion.button>

        {/* Center: Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <FitSynLogo size="md" showText />
        </div>

        {/* Right: User Profile / Sound Toggle */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <motion.button
            onClick={handleMuteClick}
            className="p-2 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors haptic-press focus-ring"
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
          >
            {isMuted ? (
              <VolumeX size={22} className="text-muted-foreground" />
            ) : (
              <Volume2 size={22} className="text-primary" />
            )}
          </motion.button>

          {/* User Avatar / Login Button */}
          <div className="relative">
            <motion.button
              onClick={handleUserClick}
              className={`p-2 rounded-xl transition-colors haptic-press focus-ring flex items-center gap-2 ${user
                  ? "bg-primary/20 hover:bg-primary/30 text-primary"
                  : "bg-secondary/50 hover:bg-secondary text-foreground"
                }`}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
            >
              <User size={22} />
              {user && (
                <span className="text-sm font-medium max-w-[80px] truncate hidden sm:block">
                  {displayName}
                </span>
              )}
            </motion.button>

            {/* User Dropdown Menu */}
            {showUserMenu && user && (
              <motion.div
                className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="p-3 border-b border-border">
                  <p className="font-medium text-foreground truncate">{displayName}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full p-3 flex items-center gap-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </motion.header>
  );
};

export default AppHeader;

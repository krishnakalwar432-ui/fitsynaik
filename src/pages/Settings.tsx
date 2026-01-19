import { motion } from "framer-motion";
import { Volume2, VolumeX, Moon, Sun, Bell, Shield, HelpCircle, Info } from "lucide-react";
import AppShell from "@/components/AppShell";
import { useSoundContext } from "@/contexts/SoundContext";
import { useTheme } from "@/contexts/ThemeContext";

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: React.ReactNode;
  delay?: number;
}

const SettingItem = ({ icon, title, description, action, delay = 0 }: SettingItemProps) => (
  <motion.div
    className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: delay * 0.05, duration: 0.3 }}
  >
    <div className="flex items-center gap-4">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
    {action}
  </motion.div>
);

interface ToggleProps {
  enabled: boolean;
  onToggle: () => void;
  activeColor?: string;
}

const Toggle = ({ enabled, onToggle, activeColor = "bg-primary" }: ToggleProps) => (
  <motion.button
    onClick={onToggle}
    className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
      enabled ? activeColor : "bg-muted"
    }`}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div
      className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center"
      animate={{ left: enabled ? "calc(100% - 28px)" : "4px" }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      {enabled ? (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeColor.includes("amber") ? (
            <Sun size={14} className="text-amber-500" />
          ) : (
            <div className="w-2 h-2 rounded-full bg-primary" />
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Moon size={14} className="text-muted-foreground" />
        </motion.div>
      )}
    </motion.div>
  </motion.button>
);

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { playClick } = useSoundContext();
  
  const handleToggle = () => {
    playClick();
    toggleTheme();
  };

  return (
    <motion.button
      onClick={handleToggle}
      className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
        theme === "light" ? "bg-amber-400" : "bg-muted"
      }`}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden"
        animate={{ left: theme === "light" ? "calc(100% - 28px)" : "4px" }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <motion.div
          initial={false}
          animate={{ 
            rotate: theme === "light" ? 0 : 180,
            scale: 1
          }}
          transition={{ duration: 0.3 }}
        >
          {theme === "light" ? (
            <Sun size={14} className="text-amber-500" />
          ) : (
            <Moon size={14} className="text-slate-600" />
          )}
        </motion.div>
      </motion.div>
      
      {/* Background icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        <Moon size={12} className={`transition-opacity ${theme === "light" ? "opacity-40" : "opacity-0"}`} />
        <Sun size={12} className={`transition-opacity ${theme === "dark" ? "opacity-40" : "opacity-0"}`} />
      </div>
    </motion.button>
  );
};

const Settings = () => {
  const { isMuted, toggleMute, playClick } = useSoundContext();
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState(true);

  const handleSoundToggle = () => {
    // Play click before toggling (so it plays if unmuting)
    if (isMuted) {
      toggleMute();
      // Small delay to let unmute take effect
      setTimeout(() => {
        playClick();
      }, 50);
    } else {
      playClick();
      toggleMute();
    }
  };

  const handleNotificationToggle = () => {
    playClick();
    setNotifications(prev => !prev);
  };

  return (
    <AppShell>
      <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-display font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">Customize your FitSyn experience</p>
          </motion.div>

          {/* Settings List */}
          <div className="space-y-3">
            {/* Theme Toggle */}
            <SettingItem
              icon={theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
              title="Theme"
              description={theme === "dark" ? "Dark mode enabled" : "Light mode enabled"}
              action={<ThemeToggle />}
              delay={1}
            />

            <SettingItem
              icon={isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              title="Sound Effects"
              description="Button clicks and transitions"
              action={
                <Toggle 
                  enabled={!isMuted} 
                  onToggle={handleSoundToggle}
                />
              }
              delay={2}
            />

            <SettingItem
              icon={<Bell size={20} />}
              title="Notifications"
              description="Workout reminders and updates"
              action={
                <Toggle 
                  enabled={notifications} 
                  onToggle={handleNotificationToggle}
                />
              }
              delay={3}
            />

            <div className="h-4" />

            <SettingItem
              icon={<Shield size={20} />}
              title="Privacy"
              description="Manage your data and preferences"
              action={<span className="text-muted-foreground text-sm">→</span>}
              delay={4}
            />

            <SettingItem
              icon={<HelpCircle size={20} />}
              title="Help & Support"
              description="FAQs and contact support"
              action={<span className="text-muted-foreground text-sm">→</span>}
              delay={5}
            />

            <SettingItem
              icon={<Info size={20} />}
              title="About FitSyn"
              description="Version 1.0.0"
              action={<span className="text-muted-foreground text-sm">→</span>}
              delay={6}
            />
          </div>

          {/* Theme Preview */}
          <motion.div
            className="mt-8 p-4 rounded-xl bg-secondary/30 border border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-sm text-muted-foreground mb-3">Theme Preview</p>
            <div className="flex gap-3">
              <div className="flex-1 p-3 rounded-lg bg-background border border-border">
                <div className="w-full h-2 rounded bg-primary mb-2" />
                <div className="w-3/4 h-2 rounded bg-muted" />
              </div>
              <div className="flex-1 p-3 rounded-lg bg-card border border-border">
                <div className="w-full h-2 rounded bg-accent mb-2" />
                <div className="w-1/2 h-2 rounded bg-muted" />
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-muted-foreground">
              Made with 💪 by FitSyn Team
            </p>
          </motion.div>
        </div>
      </div>
    </AppShell>
  );
};

// Need to import useState
import { useState } from "react";

export default Settings;

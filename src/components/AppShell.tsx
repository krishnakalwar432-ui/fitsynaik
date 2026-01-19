import { useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "./AppHeader";
import FullScreenMenu from "./FullScreenMenu";
import { useSoundContext } from "@/contexts/SoundContext";

interface AppShellProps {
  children: ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { playSwoosh } = useSoundContext();

  const handleMenuToggle = () => {
    playSwoosh();
    setIsMenuOpen(prev => !prev);
  };

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader onMenuClick={handleMenuToggle} />
      
      <FullScreenMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
      />

      <main className="pt-16 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default AppShell;

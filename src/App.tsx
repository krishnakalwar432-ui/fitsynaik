import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SoundProvider } from "@/contexts/SoundContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import SplashScreen from "@/components/SplashScreen";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Settings from "./pages/Settings";
import ModulePage from "./pages/ModulePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Module URLs
const moduleUrls = {
  workoutGenerator: "https://openai-workout-generator.vercel.app/",
  formAssistant: "https://ai-workout-assistant-ten.vercel.app/",
  exerciseLibrary: "https://library-psi-three.vercel.app/",
  strengthArena: "https://keen-torte-50546a.netlify.app/",
  nutrition: "https://nutrition-ai-lovat.vercel.app/",
  tracker: "https://tracker-lilac-xi.vercel.app/",
  fitmatrix: "https://velvety-arithmetic-6f8aee.netlify.app/",
  smashCard: "https://sweet-horse-372fab.netlify.app/",
  fitmap: "https://fitnessmap.vercel.app/",
  yoga: "https://yoga-gold-nu.vercel.app/",
};

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [hasShownSplash, setHasShownSplash] = useState(false);

  useEffect(() => {
    // Check if splash was already shown this session
    const splashShown = sessionStorage.getItem("fitsyn-splash-shown");
    if (splashShown) {
      setShowSplash(false);
      setHasShownSplash(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setHasShownSplash(true);
    sessionStorage.setItem("fitsyn-splash-shown", "true");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <SoundProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />

              {/* Splash Screen */}
              {showSplash && !hasShownSplash && (
                <SplashScreen onComplete={handleSplashComplete} minDuration={2500} />
              )}

              <BrowserRouter>
                <Routes>
                  {/* Main Routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/settings" element={<Settings />} />

                  {/* Module Routes */}
                  <Route
                    path="/workout-generator"
                    element={<ModulePage url={moduleUrls.workoutGenerator} title="AI Workout Generator" />}
                  />
                  <Route
                    path="/form-assistant"
                    element={<ModulePage url={moduleUrls.formAssistant} title="AI Form Assistant" />}
                  />
                  <Route
                    path="/exercise-library"
                    element={<ModulePage url={moduleUrls.exerciseLibrary} title="Exercise Library" />}
                  />
                  <Route
                    path="/strength-arena"
                    element={<ModulePage url={moduleUrls.strengthArena} title="Strength Arena" />}
                  />
                  <Route
                    path="/nutrition"
                    element={<ModulePage url={moduleUrls.nutrition} title="AI Nutrition" />}
                  />
                  <Route
                    path="/tracker"
                    element={<ModulePage url={moduleUrls.tracker} title="Tracker" />}
                  />
                  <Route
                    path="/fitmatrix"
                    element={<ModulePage url={moduleUrls.fitmatrix} title="FitMatrix" />}
                  />
                  <Route
                    path="/smash-card"
                    element={<ModulePage url={moduleUrls.smashCard} title="Smash Card" />}
                  />
                  <Route
                    path="/fitmap"
                    element={<ModulePage url={moduleUrls.fitmap} title="FitMap" />}
                  />
                  <Route
                    path="/yoga"
                    element={<ModulePage url={moduleUrls.yoga} title="AI Yoga" />}
                  />

                  {/* Catch-all */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </SoundProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

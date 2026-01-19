import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "./LoadingScreen";

interface ModuleEmbedProps {
  url: string;
  title: string;
}

const ModuleEmbed = ({ url, title }: ModuleEmbedProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Reset loading state when URL changes
    setIsLoading(true);
    setShowContent(false);
  }, [url]);

  const handleLoad = () => {
    // Add a small delay for the transition effect
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 100);
    }, 800);
  };

  return (
    <div className="relative w-full h-full">
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen message={`Loading ${title}…`} />
        )}
      </AnimatePresence>

      <motion.iframe
        src={url}
        title={title}
        className="w-full h-full border-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        onLoad={handleLoad}
        allow="accelerometer; camera; geolocation; microphone"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
      />
    </div>
  );
};

export default ModuleEmbed;

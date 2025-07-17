import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface FireworkButtonProps {
  onFirework: (x: number, y: number) => void;
}

const FireworkButton = ({ onFirework }: FireworkButtonProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    onFirework(x, y);
    setIsAnimating(true);
    
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <Button
      onClick={handleClick}
      className={`
        relative overflow-hidden bg-gradient-primary hover:shadow-glow 
        transition-all duration-300 transform hover:scale-105
        ${isAnimating ? 'animate-pulse' : ''}
      `}
      size="lg"
    >
      <Sparkles className="w-5 h-5 mr-2" />
      Rayakan! 🎆
      {isAnimating && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-slide-right"></div>
      )}
    </Button>
  );
};

export default FireworkButton;
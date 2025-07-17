import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

const SoundManager = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fireworkSoundRef = useRef<HTMLAudioElement | null>(null);
  const balloonPopRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio elements
    audioRef.current = new Audio();
    audioRef.current.src = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMAA0GU2u/IeDAGHHfH8N2OPwoPWK7n6qNODgxOp+LvtWIcCDuI0/DUfisI"; // Placeholder for Happy Birthday audio
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    fireworkSoundRef.current = new Audio();
    fireworkSoundRef.current.src = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMAA0GU2u/IeDAGHHfH8N2OPwoPWK7n6qNODgxOp+LvtWIcCDuI0/DUfisI"; // Placeholder for firework sound
    fireworkSoundRef.current.volume = 0.5;

    balloonPopRef.current = new Audio();
    balloonPopRef.current.src = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMAA0GU2u/IeDAGHHfH8N2OPwoPWK7n6qNODgxOp+LvtWIcCDuI0/DUfisI"; // Placeholder for balloon pop sound
    balloonPopRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (fireworkSoundRef.current) {
        fireworkSoundRef.current = null;
      }
      if (balloonPopRef.current) {
        balloonPopRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    if (fireworkSoundRef.current) {
      fireworkSoundRef.current.muted = !isMuted;
    }
    if (balloonPopRef.current) {
      balloonPopRef.current.muted = !isMuted;
    }
  };

  // Expose functions to play sound effects
  useEffect(() => {
    window.playFireworkSound = () => {
      if (fireworkSoundRef.current && !isMuted) {
        fireworkSoundRef.current.currentTime = 0;
        fireworkSoundRef.current.play().catch(console.error);
      }
    };

    window.playBalloonPop = () => {
      if (balloonPopRef.current && !isMuted) {
        balloonPopRef.current.currentTime = 0;
        balloonPopRef.current.play().catch(console.error);
      }
    };

    return () => {
      delete window.playFireworkSound;
      delete window.playBalloonPop;
    };
  }, [isMuted]);

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <Button
        onClick={toggleMusic}
        variant="secondary"
        size="sm"
        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/20"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </Button>
      
      <Button
        onClick={toggleMute}
        variant="secondary"
        size="sm"
        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/20"
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </Button>
    </div>
  );
};

export default SoundManager;
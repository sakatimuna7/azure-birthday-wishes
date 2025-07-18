"use client";

import { useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import RealTimeEqualizer from "./RealTImeEqualizer";

export default function CelebrationButton() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    try {
      await audioRef.current?.play();
      setIsPlaying(true);
    } catch (err) {
      console.error("Error playing audio:", err);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/pak_toni.mp3"
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      />

      <Button
        onClick={handlePlay}
        className="relative overflow-hidden bg-gradient-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105"
        size="lg"
      >
        <Sparkles className="w-5 h-5 mr-2" />
        Rayakan! 🎆
      </Button>

      {isPlaying && <RealTimeEqualizer audioRef={audioRef} />}
    </>
  );
}

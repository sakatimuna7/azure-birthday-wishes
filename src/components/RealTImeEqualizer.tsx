"use client";

import { useEffect, useRef } from "react";

export default function RealTimeEqualizer({
  audioRef,
}: {
  audioRef: React.RefObject<HTMLAudioElement>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();

  useEffect(() => {
    if (!audioRef.current) return;

    const canvas = canvasRef.current;
    const canvasCtx = canvas?.getContext("2d");
    if (!canvas || !canvasCtx) return;

    let audioCtx: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let source: MediaElementAudioSourceNode | null = null;
    let dataArray: Uint8Array;
    let bufferLength: number;

    const start = async () => {
      audioCtx = new AudioContext();
      await audioCtx.resume();

      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128;
      bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);

      source = audioCtx.createMediaElementSource(audioRef.current!);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);

      const draw = () => {
        animationIdRef.current = requestAnimationFrame(draw);
        analyser!.getByteFrequencyData(dataArray);
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 1.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const value = dataArray[i];
          const barHeight = value / 2;
          const opacity = Math.min(1, Math.max(0.2, value / 255)); // transparansi

          canvasCtx.fillStyle = `rgba(0, 255, 150, ${opacity})`;
          canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }
      };

      draw();
    };

    start();

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      analyser?.disconnect();
      source?.disconnect();
      audioCtx?.close();
    };
  }, [audioRef]);

  return (
    <canvas
      ref={canvasRef}
      width={typeof window !== "undefined" ? window.innerWidth : 1920}
      height={60}
      className="fixed bottom-0 left-0 w-full z-50 bg-black/20 backdrop-blur-sm pointer-events-none"
    />
  );
}

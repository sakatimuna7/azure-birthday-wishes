import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
}

interface FireworkProps {
  active?: boolean;
}

const Fireworks = ({ active = true }: FireworkProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const colors = [
    'hsl(220, 100%, 70%)', // Blue
    'hsl(45, 100%, 65%)',  // Gold
    'hsl(260, 100%, 70%)', // Purple
    'hsl(200, 100%, 60%)', // Light Blue
    'hsl(320, 100%, 70%)', // Pink
    'hsl(180, 100%, 60%)', // Cyan
  ];

  const createFirework = (x: number, y: number) => {
    const particleCount = 15 + Math.random() * 20;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 2 + Math.random() * 4;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        color,
        life: 100,
        maxLife: 100,
      });
    }

    setParticles(prev => [...prev, ...newParticles]);
  };

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight * 0.6;
      createFirework(x, y);
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, [active]);

  useEffect(() => {
    const animationFrame = setInterval(() => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.1, // gravity
            life: particle.life - 2,
          }))
          .filter(particle => particle.life > 0)
      );
    }, 16);

    return () => clearInterval(animationFrame);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            opacity: particle.life / particle.maxLife,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 6px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
};

export default Fireworks;
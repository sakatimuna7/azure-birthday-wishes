import { useState, useEffect } from "react";

interface Balloon {
  id: number;
  x: number;
  color: string;
  animationDelay: number;
  speed: number;
  isPopped: boolean;
}

const FloatingBalloons = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  const balloonColors = [
    'hsl(220, 100%, 70%)', // Blue
    'hsl(45, 100%, 65%)',  // Gold
    'hsl(260, 100%, 70%)', // Purple
    'hsl(320, 100%, 70%)', // Pink
    'hsl(180, 100%, 60%)', // Cyan
    'hsl(0, 100%, 70%)',   // Red
    'hsl(120, 100%, 60%)', // Green
  ];

  const createBalloon = () => {
    const newBalloon: Balloon = {
      id: Date.now() + Math.random(),
      x: Math.random() * (window.innerWidth - 100),
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
      animationDelay: Math.random() * 2,
      speed: 15 + Math.random() * 10,
      isPopped: false,
    };
    return newBalloon;
  };

  useEffect(() => {
    // Create initial balloons
    const initialBalloons = Array.from({ length: 8 }, createBalloon);
    setBalloons(initialBalloons);

    // Add new balloons periodically
    const interval = setInterval(() => {
      setBalloons(prev => {
        const activeBalloons = prev.filter(balloon => !balloon.isPopped);
        if (activeBalloons.length < 12) {
          return [...prev, createBalloon()];
        }
        return prev;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const popBalloon = (balloonId: number) => {
    setBalloons(prev =>
      prev.map(balloon =>
        balloon.id === balloonId ? { ...balloon, isPopped: true } : balloon
      )
    );

    // Play pop sound
    if (window.playBalloonPop) {
      window.playBalloonPop();
    }

    // Create confetti effect
    createConfetti();

    // Remove popped balloon after animation
    setTimeout(() => {
      setBalloons(prev => prev.filter(balloon => balloon.id !== balloonId));
    }, 500);
  };

  const createConfetti = () => {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'fixed inset-0 pointer-events-none z-40';
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 20; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'absolute w-2 h-2';
      confetti.style.backgroundColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.top = Math.random() * window.innerHeight + 'px';
      confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
      confetti.style.animation = 'confetti-fall 3s ease-out forwards';
      confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
      document.body.removeChild(confettiContainer);
    }, 3000);
  };

  return (
    <>
      {/* CSS for confetti animation */}
      <style>{`
        @keyframes confetti-fall {
          0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(100vh) rotate(720deg);
          }
        }
        
        @keyframes balloon-float {
          0% {
            transform: translateY(100vh) translateX(0px);
          }
          100% {
            transform: translateY(-150px) translateX(20px);
          }
        }
        
        @keyframes balloon-sway {
          0%, 100% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(10px);
          }
        }
        
        @keyframes balloon-pop {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.7;
          }
          100% {
            transform: scale(0);
            opacity: 0;
          }
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        {balloons.map(balloon => (
          <div
            key={balloon.id}
            className={`absolute cursor-pointer transition-all duration-500 ${
              balloon.isPopped ? 'animate-pulse' : ''
            }`}
            style={{
              left: balloon.x,
              animation: balloon.isPopped 
                ? 'balloon-pop 0.5s ease-out forwards'
                : `balloon-float ${balloon.speed}s linear infinite, balloon-sway 3s ease-in-out infinite`,
              animationDelay: `${balloon.animationDelay}s`,
              pointerEvents: balloon.isPopped ? 'none' : 'auto',
            }}
            onClick={() => popBalloon(balloon.id)}
          >
            {/* Balloon */}
            <div
              className="w-16 h-20 rounded-full relative shadow-lg hover:scale-110 transition-transform cursor-pointer"
              style={{
                backgroundColor: balloon.color,
                background: `radial-gradient(circle at 30% 30%, ${balloon.color}, ${balloon.color}dd)`,
              }}
            >
              {/* Balloon highlight */}
              <div 
                className="absolute top-2 left-3 w-4 h-6 rounded-full opacity-40"
                style={{ backgroundColor: 'white' }}
              />
              
              {/* Balloon knot */}
              <div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 rounded-full"
                style={{ backgroundColor: balloon.color }}
              />
            </div>
            
            {/* String */}
            <div 
              className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-24 bg-gray-400"
              style={{
                background: 'linear-gradient(to bottom, transparent, #666)',
                animation: 'balloon-sway 2s ease-in-out infinite',
                animationDelay: `${balloon.animationDelay + 0.5}s`,
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default FloatingBalloons;
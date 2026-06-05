import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Gift, Heart, Undo2 } from "lucide-react";

interface FireworkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  gravity: number;
  fade: number;
}

export default function GiftSurprise() {
  const [isOpened, setIsOpened] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<FireworkParticle[]>([]);
  const loopRef = useRef<number | null>(null);

  const colors = ["#fef08a", "#fbbf24", "#f59e0b", "#3b82f6", "#ef4444", "#10b981", "#a855f7"];

  const triggerFireworks = () => {
    setIsOpened(true);
  };

  const createFirework = (x: number, y: number) => {
    const particleCount = 65;
    const baseColor = colors[Math.floor(Math.random() * colors.length)];
    
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1.0,
        color: baseColor,
        size: Math.random() * 2.5 + 1.2,
        gravity: 0.06,
        fade: Math.random() * 0.015 + 0.01,
      });
    }
  };

  const resetGift = () => {
    setIsOpened(false);
    particlesRef.current = [];
  };

  // Launch occasional automatic fireworks once opened
  useEffect(() => {
    if (!isOpened) return;

    const interval = setInterval(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        const x = Math.random() * canvas.width / (window.devicePixelRatio || 1);
        const y = Math.random() * (canvas.height * 0.5) / (window.devicePixelRatio || 1);
        createFirework(x, y);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [isOpened]);

  // Main canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    const observer = new ResizeObserver(() => handleResize());
    observer.observe(container);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= p.fade;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      loopRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (loopRef.current) cancelAnimationFrame(loopRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[600px] py-24 px-4 md:px-8 bg-radial from-neutral-950 via-slate-950 to-neutral-950 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Absolute canvas drawing fireworks */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-20" />

      {/* Decorative halos */}
      <div className="absolute top-[30%] left-1/3 h-[250px] w-[250px] rounded-full bg-yellow-500/5 blur-[100px] pointer-events-none" />

      {/* Interactive Box layout before opened */}
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="gift-box"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="flex flex-col items-center justify-center max-w-sm w-full text-center z-10"
          >
            <span className="font-mono text-xs text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded-full border border-yellow-500/20 inline-flex items-center gap-1.5 uppercase tracking-widest mb-6">
              <Gift className="h-3.5 w-3.5" />
              The Final Secret
            </span>

            <h2 className="font-serif text-3xl font-extrabold md:text-4xl text-white mb-2">
              The Golden Box
            </h2>
            <p className="text-gray-400 font-light text-xs mb-10 px-4 leading-relaxed">
              Inside lies the central prayer. Tap the giant, glowing birthday gift below to open it and launch the celebrations.
            </p>

            {/* Glowing tactile Bob-animating Gift Box */}
            <motion.div
              onClick={() => {
                const canvas = canvasRef.current;
                if (canvas) {
                  createFirework(canvas.width / 2 / (window.devicePixelRatio || 1), canvas.height / 2 / (window.devicePixelRatio || 1));
                }
                triggerFireworks();
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="cursor-pointer relative h-40 w-40 flex items-center justify-center bg-gradient-to-br from-yellow-600 via-amber-500 to-yellow-650 rounded-xl border border-yellow-300 shadow-[0_25px_50px_rgba(234,179,8,0.25)] hover:shadow-[0_0_55px_rgba(234,179,8,0.55)] transition-all group"
            >
              {/* Wrapping Ribbon crosses */}
              <div className="absolute inset-y-0 w-8 bg-red-650" />
              <div className="absolute inset-x-0 h-8 bg-red-650" />
              
              {/* Lid borders */}
              <div className="absolute -top-1 inset-x-0 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-t-lg shadow" />
              
              {/* Ribbon Bow on top */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 h-8 w-12 flex items-center justify-center pointer-events-none">
                <div className="absolute w-6 h-6 border-2 border-red-600 rounded-full rotate-45 transform bg-red-650" />
                <div className="absolute w-6 h-6 border-2 border-red-600 rounded-full -rotate-45 transform bg-red-650" />
              </div>

              {/* Sparkle core inside box */}
              <Sparkles className="absolute text-yellow-100 h-8 w-8 animate-pulse pointer-events-none z-20 group-hover:scale-125 transition-transform" />
              <span className="absolute inset-0 border border-yellow-300/40 rounded-xl animate-ping opacity-30 pointer-events-none" />
            </motion.div>
            
            <p className="font-mono text-[9px] text-yellow-500/50 uppercase tracking-widest mt-8">
              ● Tap Box to celebrate
            </p>
          </motion.div>
        ) : (
          /* DISPLAY REVEAL CARD STAGE */
          <motion.div
            key="reveal-card"
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 100, damping: 14 }}
            className="flex flex-col items-center justify-center max-w-lg w-full text-center z-10 px-4"
          >
            <div className="relative w-full bg-stone-900/85 border border-yellow-500/35 rounded-2xl p-8 backdrop-blur-md shadow-[0_30px_60px_rgba(234,179,8,0.15)] flex flex-col justify-between overflow-hidden">
              {/* Top gold border */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-yellow-600 via-amber-400 to-yellow-600" />

              {/* Mini Sparkles details */}
              <div className="flex justify-center mb-6">
                <div className="h-14 w-14 rounded-full border border-yellow-500/30 bg-stone-950 flex items-center justify-center text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.3)] animate-pulse">
                  <Heart className="h-6 w-6 text-red-500 fill-red-500" />
                </div>
              </div>

              {/* Sincere Final message requested by the user */}
              <h3 className="font-serif text-2xl font-extrabold text-white tracking-wide">
                Happy 31st Birthday, <br/>
                <span className="text-gradient bg-gradient-to-r from-yellow-500 to-yellow-300">
                  Ihtisham Khan!
                </span>
              </h3>

              <div className="my-6 border-y border-yellow-500/10 py-5 leading-relaxed">
                <p className="font-serif text-sm italic text-yellow-105/90 md:text-base">
                  &ldquo;Happy 31st Birthday. <br className="hidden md:inline"/>
                  Late, yes. Forgotten, never. <br className="hidden md:inline"/>
                  From Swat with appreciation, affection, and countless good wishes.&rdquo;
                </p>
              </div>

              <p className="font-sans text-xs text-gray-400 font-light max-w-sm mx-auto leading-relaxed">
                Thank you for being my constant, reliable best friend. Nasir values your loyalty above anything else on earth. May this year shower success upon you!
              </p>

              {/* Close/Reset journey button */}
              <div className="mt-8 pt-4 border-t border-yellow-500/10 flex justify-between items-center text-xs font-mono text-gray-500">
                <span>Brotherhood Forever</span>
                <button
                  onClick={resetGift}
                  className="flex items-center gap-1.5 text-yellow-500 bg-yellow-500/5 px-2.5 py-1 rounded cursor-pointer hover:bg-yellow-500/15 border border-yellow-500/10 transition-all font-semibold"
                >
                  <Undo2 className="h-3.5 w-3.5" />
                  Pack Gift Again
                </button>
              </div>
            </div>

            <div className="mt-10 font-mono text-[9px] uppercase tracking-[0.3em] text-yellow-500/60 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
              Celebration active. Enjoy the wishes!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

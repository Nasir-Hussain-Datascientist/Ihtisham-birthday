import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  fadeSpeed: number;
  isStar: boolean;
  angle: number;
}

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      // Handle retina scale
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    // Initialize dimensions
    handleResize();

    // Use ResizeObserver for responsive boundary tracking
    const observer = new ResizeObserver(() => {
      handleResize();
    });
    observer.observe(container);

    const goldColors = [
      "rgba(253, 224, 71, 0.45)", // Light Yellow / Gold
      "rgba(234, 179, 8, 0.35)",  // Gold
      "rgba(202, 138, 4, 0.25)",  // Dark Gold
      "rgba(254, 240, 138, 0.4)",  // Pastel Yellow
    ];

    const createParticle = (x: number, y: number, isStar = false): Particle => {
      const size = isStar ? Math.random() * 2.5 + 1.5 : Math.random() * 1.8 + 0.5;
      const angle = Math.random() * Math.PI * 2;
      return {
        x,
        y,
        size,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -(Math.random() * 0.7 + 0.2), // Rising slowly
        opacity: Math.random() * 0.5 + 0.3,
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
        fadeSpeed: Math.random() * 0.005 + 0.002,
        isStar,
        angle,
      };
    };

    // Prefill some stars on screen
    const starCount = 80;
    for (let i = 0; i < starCount; i++) {
      particlesRef.current.push(
        createParticle(Math.random() * width, Math.random() * height, Math.random() > 0.8)
      );
    }

    // Capture pointers for touch/mouse interactive trails
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if (e instanceof MouseEvent) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }

      const rect = canvas.getBoundingClientRect();
      const ptX = clientX - rect.left;
      const ptY = clientY - rect.top;
      
      pointerRef.current.x = ptX;
      pointerRef.current.y = ptY;

      // Spark trail on hover/touch
      if (Math.random() > 0.5) {
        particlesRef.current.push(createParticle(ptX, ptY, Math.random() > 0.85));
      }
    };

    const handlePointerLeave = () => {
      pointerRef.current.x = null;
      pointerRef.current.y = null;
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchstart", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave);
    window.addEventListener("touchend", handlePointerLeave);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Slow rising particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around limits or fade
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }

        // Star twinkle oscillation
        if (p.isStar) {
          p.angle += 0.03;
          p.opacity = Math.max(0.1, Math.min(0.9, p.opacity + Math.sin(p.angle) * 0.02));
        }

        // Draw particle
        ctx.beginPath();
        ctx.globalAlpha = p.opacity;

        if (p.isStar) {
          // Draw standard star shape or glowing rhombus
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle * 0.1);
          ctx.fillStyle = "#fef08a"; // high glow gold
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#eab308";
          
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size * 0.4, -p.size * 0.4);
          ctx.lineTo(p.size, 0);
          ctx.lineTo(p.size * 0.4, p.size * 0.4);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size * 0.4, p.size * 0.4);
          ctx.lineTo(-p.size, 0);
          ctx.lineTo(-p.size * 0.4, -p.size * 0.4);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        } else {
          ctx.fillStyle = p.color;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      // Draw subtle connector lines on cursor hover optionally to look elegant
      if (pointerRef.current.x !== null && pointerRef.current.y !== null) {
        const px = pointerRef.current.x;
        const py = pointerRef.current.y;
        
        ctx.beginPath();
        const grad = ctx.createRadialGradient(px, py, 2, px, py, 45);
        grad.addColorStop(0, "rgba(234, 179, 8, 0.15)");
        grad.addColorStop(1, "rgba(234, 179, 8, 0)");
        ctx.fillStyle = grad;
        ctx.arc(px, py, 45, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchstart", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("touchend", handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 overflow-hidden bg-radial from-slate-950 via-gray-950 to-neutral-950"
    >
      <canvas ref={canvasRef} className="block pointer-events-none" />
    </div>
  );
}

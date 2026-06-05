import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Heart, ChevronDown, Clock, ArrowRight } from "lucide-react";

interface HeroProps {
  onStartJourney: () => void;
}

export default function HeroSection({ onStartJourney }: HeroProps) {
  const [timerText, setTimerText] = useState({
    days: 4,
    hours: 12,
    minutes: 30,
    seconds: 45,
  });

  // Calculate elapsed time from June 1st, 2026 (assuming his birthday is June 1st)
  useEffect(() => {
    const birthday = new Date("2026-06-01T00:00:00Z").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime(); // Will be around June 5th, 2026
      const difference = now - birthday;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimerText({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-between px-6 py-12 text-center text-white overflow-hidden">
      {/* Glow Ambient effects */}
      <div className="absolute top-[20%] left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-1/3 h-[250px] w-[250px] rounded-full bg-red-500/5 blur-[100px] pointer-events-none" />

      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-12 flex items-center gap-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/5 px-4 py-1.5 backdrop-blur-md"
      >
        <span className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
        <span className="font-mono text-xs text-yellow-500 uppercase tracking-[0.2em]">
          Special 31st Celebration
        </span>
      </motion.div>

      {/* Main Hero Header */}
      <div className="my-auto flex max-w-3xl flex-col items-center gap-6 z-10">
        {/* Swat to Peshawar label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="flex items-center gap-3 md:gap-5"
        >
          <span className="font-serif text-lg italic text-yellow-400/90 tracking-wide">
            Swat
          </span>
          <div className="relative flex items-center justify-center w-16 md:w-24">
            <span className="absolute h-0.5 w-full bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-[0_0_8px_#eab308]" />
            <motion.div
              animate={{ x: [-20, 20] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute text-yellow-400 shadow-glow"
            >
              <Heart className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            </motion.div>
          </div>
          <span className="font-serif text-lg italic text-yellow-400/90 tracking-wide">
            Peshawar
          </span>
        </motion.div>

        <h1 className="relative font-serif text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl pt-2">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="block text-gradient bg-gradient-to-r from-gray-100 via-yellow-200 to-white"
          >
            From Swat to Peshawar ❤️
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="block mt-4 text-3xl font-bold bg-gradient-to-r from-yellow-500 via-amber-300 to-yellow-600 bg-clip-text text-transparent uppercase tracking-wider"
          >
            Happy 31st Birthday,
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="block mt-1 font-serif text-4xl md:text-5xl text-yellow-400 drop-shadow-[0_2px_15px_rgba(234,179,8,0.3)]"
          >
            My Friend Ihtisham Khan
          </motion.span>
        </h1>

        {/* Distance summary indicator */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mx-auto max-w-lg font-sans text-sm md:text-base text-gray-300/90 leading-relaxed font-light"
        >
          Separated by mountain ranges and 250 kilometers of highways, but connected by a heartbeat and absolute loyalty.
        </motion.p>

        {/* Elapsed Timer Counter (Apology clock) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.9 }}
          className="mt-8 flex flex-col items-center gap-3 w-full"
        >
          <div className="flex items-center gap-2 text-red-400/90 text-xs font-mono tracking-widest uppercase">
            <Clock className="h-3 w-3 animate-pulse" />
            Ticking Memory Counter (Late Wishes)
          </div>

          <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-sm w-full mx-auto">
            {[
              { label: "Days", val: timerText.days },
              { label: "Hrs", val: timerText.hours },
              { label: "Mins", val: timerText.minutes },
              { label: "Secs", val: timerText.seconds }
            ].map((col, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center py-2.5 px-1 rounded-lg border border-yellow-500/10 bg-yellow-500/5 backdrop-blur-sm"
              >
                <div className="font-mono text-xl md:text-2xl font-bold text-yellow-400 tabular-nums">
                  {col.val.toString().padStart(2, "0")}
                </div>
                <div className="text-[10px] text-gray-400 tracking-wider font-light">
                  {col.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 text-xs italic text-yellow-200/70 max-w-xs font-light">
            &ldquo;I may be late... but my wishes are timeless.&rdquo;
          </div>
        </motion.div>

        {/* Core CTA */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.5, delay: 2.2 }}
          onClick={onStartJourney}
          className="group relative mt-10 overflow-hidden rounded-full bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 px-8 py-3.5 font-sans text-sm font-semibold text-black tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_35px_rgba(234,179,8,0.5)] cursor-pointer"
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-bold select-none">
            Unlock My Wishes
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </motion.button>
      </div>

      {/* Down arrow indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer pt-6"
        onClick={onStartJourney}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.25em]">
          Scroll to explore
        </span>
        <ChevronDown className="h-4 w-4 text-yellow-500" />
      </motion.div>
    </section>
  );
}

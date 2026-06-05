import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sliders, ShieldAlert, Sparkles, Star } from "lucide-react";

export default function FriendshipMeter() {
  const [level, setLevel] = useState(30);

  const getMeterLabel = (val: number) => {
    if (val === 100) return "Brother Level Unlocked ❤️";
    if (val >= 85) return "Unbreakable Blood Bond 🔥";
    if (val >= 65) return "Soul Companion Status ✨";
    if (val >= 40) return "Genuine Best Friends 🏔️";
    if (val >= 15) return "Trusted Confidant ☕";
    return "Exploring Gaps...";
  };

  const getLevelColor = (val: number) => {
    if (val === 100) return "text-red-500 font-serif drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]";
    if (val >= 85) return "text-orange-400";
    if (val >= 65) return "text-yellow-400";
    return "text-yellow-500/80";
  };

  return (
    <section className="relative min-h-[500px] py-24 px-4 md:px-8 bg-black text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Background neon elements */}
      <div className="absolute top-[40%] right-[10%] h-[200px] w-[200px] rounded-full bg-yellow-500/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[20%] h-[250px] w-[250px] rounded-full bg-red-500/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-16 z-10 relative">
        <span className="font-mono text-xs text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded-full border border-yellow-500/20 inline-flex items-center gap-1.5 uppercase tracking-widest mb-3">
          <Sliders className="h-3.5 w-3.5" />
          The Synchronization Gauge
        </span>
        <h2 className="font-serif text-3xl font-extrabold md:text-4xl text-white">
          Nasir & Ihtisham Meter
        </h2>
        <p className="text-gray-400 font-light text-sm mt-3 px-6">
          Adjust the golden slider below to rate the core strength of our friendship bond. <span className="text-yellow-400 font-medium">Try sliding all the way to 100%</span> to override logic.
        </p>
      </div>

      {/* Main Interactive Slider Box */}
      <div className="relative max-w-md w-full bg-stone-900/40 border border-yellow-500/20 rounded-2xl p-8 backdrop-blur-md shadow-[0_20px_45px_rgba(0,0,0,0.8)] z-10 text-center">
        
        {/* Progress level numerical percentage block */}
        <div className="mb-4">
          <motion.div
            key={level}
            initial={{ scale: 0.9, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`font-mono text-5xl md:text-6xl font-bold tracking-tight select-none transition-colors duration-500 ${
              level === 100 ? "text-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" : "text-gray-300"
            }`}
          >
            {level}%
          </motion.div>
        </div>

        {/* Level Descriptive Message Block with dynamic labels */}
        <div className="min-h-[40px] flex items-center justify-center my-3">
          <AnimatePresence mode="wait">
            <motion.p
              key={level}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -5, opacity: 0 }}
              className={`font-sans text-sm md:text-base font-bold transition-all ${getLevelColor(level)}`}
            >
              {getMeterLabel(level)}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Custom gold accent slider element */}
        <div className="mt-8 relative flex items-center w-full">
          {/* Track fill percentage representation */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-amber-700 pointer-events-none z-10 shadow-[0_0_8px_rgba(234,179,8,0.5)]"
            style={{ width: `${level}%` }}
          />

          <input
            type="range"
            min="0"
            max="100"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="w-full h-1.5 rounded-full bg-stone-850 appearance-none cursor-pointer outline-none relative z-20"
            style={{
              WebkitAppearance: "none",
            }}
          />
        </div>

        {/* Unlock effects displayed when level reaches 100 */}
        <div className="relative mt-10 h-16 flex items-center justify-center">
          <AnimatePresence>
            {level === 100 ? (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="flex flex-col items-center gap-1.5 text-xs font-mono text-yellow-400 bg-yellow-500/10 border border-yellow-500/25 py-2 px-6 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.35)] animate-bounce"
              >
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span>BROTHER LEVEL ACTIVE</span>
                  <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
                </div>
                <span className="text-[9px] text-gray-400 uppercase tracking-widest font-light">
                  Absolute Sync Achieved
                </span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 0.8 }}
                className="text-[10px] font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2"
              >
                <ShieldAlert className="h-3.5 w-3.5 text-yellow-500/60" />
                Access Level: Restricted (Move to 100% to Sync)
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

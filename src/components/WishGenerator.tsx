import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HEARTFELT_WISHES } from "@/src/types";
import { Gift, Sparkles, RefreshCw, Quote } from "lucide-react";

export default function WishGenerator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [triggerSpin, setTriggerSpin] = useState(false);

  // Pick sequential or random wish
  const generateNewWish = () => {
    setTriggerSpin(true);
    setTimeout(() => setTriggerSpin(false), 500);

    let nextIndex = Math.floor(Math.random() * HEARTFELT_WISHES.length);
    if (nextIndex === currentIndex) {
      nextIndex = (currentIndex + 1) % HEARTFELT_WISHES.length;
    }
    setCurrentIndex(nextIndex);
  };

  const currentWish = HEARTFELT_WISHES[currentIndex];

  return (
    <section className="relative min-h-[500px] py-24 px-4 md:px-8 bg-radial from-neutral-950 via-slate-950 to-neutral-950 overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-[10%] right-[10%] h-[200px] w-[200px] rounded-full bg-yellow-500/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] h-[250px] w-[250px] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-16 z-10 relative">
        <span className="font-mono text-xs text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded-full border border-yellow-500/20 inline-flex items-center gap-1.5 uppercase tracking-widest mb-3 animate-pulse">
          <Gift className="h-3.5 w-3.5" />
          Infinite Prayer Deck
        </span>
        <h2 className="font-serif text-3xl font-extrabold md:text-4xl text-white">
          Heartfelt Wish Generator
        </h2>
        <p className="text-gray-400 font-light text-sm mt-3 px-6">
          Press the golden button below to shuffle through custom prayers, blessings, and emotional messages drafted specifically for your success, health, and peace.
        </p>
      </div>

      {/* Generator Card Stage */}
      <div className="max-w-lg mx-auto flex flex-col items-center gap-8 relative z-10 px-4">
        
        <div className="relative w-full aspect-[1.6/1] bg-stone-900/60 border border-yellow-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-[0_20px_45px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden">
          {/* Gold accent borders */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-yellow-600 via-amber-400 to-yellow-600" />
          
          {/* Quote quote mark icon watermark */}
          <div className="absolute top-6 right-6 opacity-[0.03] text-yellow-400">
            <Quote className="h-32 w-32" />
          </div>

          <div className="z-10 flex justify-between items-center mb-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-yellow-500/60 font-semibold">
              Ihtisham Khan Series
            </span>
            <span className="font-mono text-[10px] text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
              {currentWish.tag}
            </span>
          </div>

          {/* Animating Message Block */}
          <div className="flex-grow flex items-center justify-center my-2 relative min-h-[90px] z-10">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentWish.id}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.35 }}
                className="font-serif text-base md:text-lg text-yellow-105/90 italic leading-relaxed text-center font-medium"
              >
                &ldquo;{currentWish.text}&rdquo;
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Small metadata block */}
          <div className="flex justify-between items-center text-[10px] font-mono border-t border-yellow-500/10 pt-4 z-10">
            <span className="text-gray-500">From Swat to Peshawar</span>
            <span className="text-yellow-500/40">Wish Deck #{currentWish.id}</span>
          </div>
        </div>

        {/* Button: "Send Me Another Wish" */}
        <motion.button
          onClick={generateNewWish}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer group flex items-center gap-2.5 bg-gradient-to-r from-yellow-600 via-yellow-400 to-amber-600 border border-yellow-300/20 rounded-full px-8 py-3.5 font-sans font-bold text-xs uppercase tracking-widest text-black shadow-[0_0_15px_rgba(234,179,8,0.2)] hover:shadow-[0_0_25px_rgba(234,179,8,0.4)] transition-all"
        >
          <RefreshCw className={`h-4.5 w-4.5 font-bold transition-transform duration-500 ${triggerSpin ? "rotate-180" : ""}`} />
          Send Me Another Wish
        </motion.button>

      </div>
    </section>
  );
}

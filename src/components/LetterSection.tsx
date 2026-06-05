import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, CheckCircle2, Heart, Sparkles, BookOpen } from "lucide-react";

export default function LetterSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const triggerOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Wait for the flap rotation, then slide the letter up
      setTimeout(() => {
        setIsRevealed(true);
      }, 700);
    }
  };

  const resetLetter = () => {
    setIsRevealed(false);
    setIsOpen(false);
  };

  return (
    <section className="relative min-h-screen w-full py-20 px-4 md:px-8 flex flex-col items-center justify-center bg-radial from-neutral-950 via-slate-950 to-neutral-950 overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-[30%] right-[10%] h-[200px] w-[200px] rounded-full bg-yellow-500/5 blur-[80px]" />
      <div className="absolute bottom-[20%] left-[5%] h-[250px] w-[250px] rounded-full bg-amber-500/5 blur-[100px]" />

      <div className="max-w-xl w-full text-center mb-10 z-10">
        <span className="font-mono text-xs text-yellow-500 uppercase tracking-widest bg-yellow-500/5 px-3 py-1 rounded-full border border-yellow-500/10 inline-flex items-center gap-1.5 mb-3">
          <BookOpen className="h-3 w-3" />
          Interactive Secret Letter
        </span>
        <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
          The Sealed Apology
        </h2>
        <p className="text-gray-400 font-light text-sm mt-3 px-4">
          I missed the calendar, but some words belong to eternity. Tap the golden seal below to break it and open the letter.
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative w-full max-w-lg min-h-[420px] flex items-center justify-center z-10 px-4">
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            /* ENVELOPE STAGE */
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={triggerOpen}
              className="relative w-full max-w-sm aspect-[4/3] rounded-lg bg-stone-900 border border-yellow-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center cursor-pointer overflow-hidden group select-none hover:border-yellow-500/40 transition-colors"
            >
              {/* Envelope visual styling representation */}
              {/* Diagonal lines to make it look like an envelope back */}
              <div className="absolute inset-0 border-t-[80px] border-t-stone-850/40 border-l-[150px] border-l-transparent border-r-[150px] border-r-transparent pointer-events-none" />
              <div className="absolute inset-b-0 inset-x-0 h-[60%] bg-stone-900/60 border-t border-yellow-500/10 pointer-events-none" />

              {/* Envelope Flap (3D top flap folding down) */}
              <motion.div
                className="absolute top-0 inset-x-0 h-1/2 bg-stone-900 border-b border-yellow-500/15 origin-top pointer-events-none"
                style={{
                  clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                  zIndex: 20
                }}
                animate={isOpen ? { rotateX: 180, y: -2, filter: "brightness(0.6)" } : { rotateX: 0, y: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />

              {/* Secret Wax Seal stamp */}
              <motion.div
                className="absolute z-30 flex flex-col items-center justify-center"
                animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-600 via-yellow-400 to-amber-700 p-0.5 shadow-[0_0_20px_rgba(234,179,8,0.4)] group-hover:shadow-[0_0_30px_rgba(234,179,8,0.6)] group-hover:scale-110 transition-all duration-300">
                  <div className="h-full w-full rounded-full bg-amber-950 border border-yellow-600 flex flex-col items-center justify-center text-center font-serif text-white">
                    <span className="text-[9px] uppercase tracking-wider text-yellow-500 font-bold -mb-0.5">IK</span>
                    <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-yellow-500 font-mono mt-0.5">31</span>
                  </div>
                  {/* Subtle radiating shockwave particle indicator */}
                  <span className="absolute inset-0 rounded-full border border-yellow-400/40 animate-ping pointer-events-none" />
                </div>
                <span className="text-yellow-400 font-mono text-[10px] tracking-widest uppercase mt-3 py-1 px-2.5 rounded bg-amber-500/10 border border-amber-500/20 group-hover:bg-amber-500/20 transition-all">
                  Tap To Break Seal
                </span>
              </motion.div>

              {/* Envelope watermark label */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 opacity-40">
                <Mail className="h-3 w-3 text-yellow-500" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">Swat Mail Service</span>
              </div>
            </motion.div>
          ) : (
            /* UNFOLDED LETTER STAGE */
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="relative w-full max-w-lg min-h-[380px] bg-[#fbfbf6] p-6 md:p-8 rounded-lg border border-amber-100 shadow-[0_20px_40px_rgba(0,0,0,0.6)] font-serif text-amber-950 select-text overflow-hidden"
              style={{
                backgroundImage: `radial-gradient(ellipse at 50% 50%, rgba(254, 254, 250, 1), rgba(246, 244, 230, 0.9)), url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" /></filter><rect width="100" height="100" filter="url(%23noise)" opacity="0.04"/></svg>')`
              }}
            >
              {/* Elegant golden border inside letter margins */}
              <div className="absolute inset-3 border border-amber-200/60 rounded-md pointer-events-none" />
              <div className="absolute inset-4 border border-amber-200/30 rounded pointer-events-none" />
              
              {/* Letter Heading */}
              <div className="flex justify-between items-center border-b border-amber-200/50 pb-3 mb-5 z-10">
                <div className="text-left">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-amber-800 font-semibold">From Swat</span>
                  <p className="text-xs font-serif italic text-amber-700">Nasir's Heart</p>
                </div>
                <Heart className="h-5 w-5 text-red-600 fill-red-100" />
                <div className="text-right">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-amber-800 font-semibold font-bold">To Peshawar</span>
                  <p className="text-xs font-serif italic text-amber-700">Dearest Ihtisham Khan</p>
                </div>
              </div>

              {/* Letter Paragraph Content */}
              <div className="text-sm md:text-base leading-relaxed text-stone-800 font-sans space-y-4 text-justify px-2 relative z-10 font-[450]">
                <p>
                  Happy Birthday. <span className="font-serif font-semibold text-amber-900 border-b border-amber-400">I know I am late</span>, and I owe you an apology. Some wishes arrive on time. Others arrive from the heart.
                </p>
                <p>
                  No matter the date on the calendar, I hope this reminds you how much you are valued and appreciated. Distance may separate Swat and Peshawar, but it has never reduced the respect, memories, laughter, and bond we share. 
                </p>
                <p>
                  May your 31st year bring success, happiness, health, and everything your heart seeks. And thank you for being someone whose presence means more than words can properly express.
                </p>
              </div>

              {/* Signatures */}
              <div className="mt-8 border-t border-amber-200/50 pt-4 flex justify-between items-end relative z-10 px-2">
                <button
                  onClick={resetLetter}
                  className="rounded px-2.5 py-1 text-[10px] uppercase font-mono tracking-widest text-amber-700 hover:bg-amber-100 transition-colors border border-amber-350 cursor-pointer"
                >
                  Seal Again
                </button>
                <div className="text-right font-serif">
                  <p className="text-xs text-amber-850 italic">With infinite respect & loyalty,</p>
                  <p className="text-base font-bold text-amber-900 font-serif tracking-wide mt-1">Your Brother, Nasir ❤️</p>
                </div>
              </div>

              {/* Sparkles effect */}
              <div className="absolute top-2 right-4 opacity-30">
                <Sparkles className="h-5 w-5 text-yellow-600 animate-spin" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

import { motion } from "motion/react";
import { Clock, History, CalendarDays, Sparkles } from "lucide-react";

export default function ApologyClock() {
  return (
    <section className="relative min-h-[550px] py-24 px-4 md:px-8 bg-black text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Background circular gradients */}
      <div className="absolute top-[40%] left-1/3 h-[250px] w-[250px] rounded-full bg-red-650/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[30%] right-1/4 h-[300px] w-[300px] rounded-full bg-yellow-600/5 blur-[120px] pointer-events-none" />

      {/* Frame Container */}
      <div className="max-w-2xl mx-auto text-center mb-12 z-10 relative">
        <span className="font-mono text-xs text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded-full border border-yellow-500/20 inline-flex items-center gap-1.5 uppercase tracking-widest mb-3 animate-pulse">
          <History className="h-3.5 w-3.5" />
          The Heart's Chronology
        </span>
        <h2 className="font-serif text-3xl font-extrabold md:text-4xl text-white">
          A Heartfelt Apology
        </h2>
      </div>

      {/* Interactive Backward Clock Visual */}
      <div className="relative flex flex-col items-center justify-center max-w-md w-full bg-stone-900/40 border border-yellow-500/20 rounded-2xl p-8 backdrop-blur-md shadow-[0_25px_45px_rgba(0,0,0,0.8)] z-10 text-center">
        
        {/* Dynamic backward-moving clock */}
        <div className="relative h-44 w-44 rounded-full border-4 border-yellow-500/35 bg-stone-950 flex items-center justify-center shadow-[0_0_35px_rgba(234,179,8,0.2)] mb-8">
          
          {/* Roman numbers representing luxury vintage clocks */}
          <span className="absolute top-2 font-serif text-xs text-yellow-500/60 font-semibold select-none">XII</span>
          <span className="absolute right-3.5 font-serif text-xs text-yellow-500/60 font-semibold select-none">III</span>
          <span className="absolute bottom-2 font-serif text-xs text-yellow-500/60 font-semibold select-none">VI</span>
          <span className="absolute left-3.5 font-serif text-xs text-yellow-500/60 font-semibold select-none">IX</span>

          {/* Central golden axis pin */}
          <div className="absolute h-3 w-3 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 z-30 shadow" />

          {/* Clock needles scaling and rotating BACKWARD */}
          {/* HOUR HAND */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-1.5 h-12 bg-yellow-400 origin-[bottom_center] rounded-full z-10"
            style={{ x: "-50%", y: "-100%" }}
            animate={{ rotate: [360, 0] }}
            transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
          />

          {/* MINUTE HAND */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-1 h-16 bg-yellow-500/70 origin-[bottom_center] rounded-full z-10"
            style={{ x: "-50%", y: "-100%" }}
            animate={{ rotate: [360, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          />

          {/* SECOND HAND */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-[1.5px] h-18 bg-red-500 origin-[bottom_center] rounded-full z-20"
            style={{ x: "-50%", y: "-100%" }}
            animate={{ rotate: [360, 0] }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />

          {/* Clock grid tick marks border around circle */}
          <div className="absolute inset-2 border border-dashed border-yellow-500/10 rounded-full" />
        </div>

        {/* Emotion quotes */}
        <h3 className="font-serif text-xl font-bold text-yellow-400 uppercase tracking-wide leading-relaxed">
          &ldquo;I missed the date, <br/>not the importance of the day.&rdquo;
        </h3>

        <p className="font-sans text-xs text-gray-300 font-light mt-4 leading-relaxed pr-2 pl-2 border-l-2 border-yellow-500/40">
          Some calendars count deadlines. But the heart counts loyalty, trust, and shared memories. It owes you a full box of chocolates, key tea cups, and a giant apology card for this late wish. Thank you for always listening, Ihtisham Khan!
        </p>

        {/* Status flags */}
        <div className="mt-6 flex items-center gap-1.5 text-xs font-mono text-red-400 bg-red-500/5 px-3 py-1 rounded border border-red-500/10">
          <CalendarDays className="h-3.5 w-3.5" />
          Late Wish Apology Accepted ❤️
        </div>
      </div>
    </section>
  );
}

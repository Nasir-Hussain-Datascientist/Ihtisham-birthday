import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MILESTONES, TimelineMilestone } from "@/src/types";
import { Sparkles, HelpCircle, RefreshCw, Milestone } from "lucide-react";

export default function TimelineSection() {
  return (
    <section className="relative min-h-screen py-24 px-4 md:px-8 bg-black text-white overflow-hidden">
      {/* Golden glow lines */}
      <div className="absolute top-1/4 left-0 h-[300px] w-[300px] rounded-full bg-yellow-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 h-[300px] w-[300px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-16 z-10 relative">
        <span className="font-mono text-xs text-yellow-500 bg-yellow-500/5 px-2.5 py-1 rounded-full border border-yellow-500/20 inline-flex items-center gap-1.5 uppercase tracking-widest">
          <Milestone className="h-3 w-3" />
          The Chronicles of Nasir & Ihtisham
        </span>
        <h2 className="font-serif text-3xl font-extrabold md:text-4xl mt-3">
          Our Journey of Brotherhood
        </h2>
        <p className="text-gray-400 font-light text-sm mt-3 px-6">
          Scroll through some of the pivotal milestones of a friendship that crossed mountain tracks and city lines. <span className="font-medium text-yellow-400">Tap any card</span> to flip and reveal custom reflective logs.
        </p>
      </div>

      {/* Timeline Tree Line */}
      <div className="relative max-w-4xl mx-auto z-10">
        {/* The central golden dashed line */}
        <div className="absolute left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-yellow-500/10 via-yellow-500/35 to-yellow-500/10 border-l border-dashed border-yellow-500/30" />

        <div className="space-y-16">
          {MILESTONES.map((milestone, idx) => (
            <TimelineCard key={milestone.id} milestone={milestone} isEven={idx % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TimelineCardProps {
  milestone: TimelineMilestone;
  isEven: boolean;
  key?: number;
}

function TimelineCard({ milestone, isEven }: TimelineCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-between w-full relative ${
        isEven ? "" : "md:flex-row-reverse"
      }`}
    >
      {/* Node Bullet Marker in Center of timeline column */}
      <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-yellow-500/30 bg-stone-950 flex items-center justify-center shadow-[0_0_12px_rgba(234,179,8,0.3)] z-20">
        <span className="text-sm select-none">{milestone.emoji}</span>
        {/* Ring ripple animation */}
        <span className="absolute inset-0 rounded-full border border-yellow-500/30 animate-ping opacity-60 pointer-events-none" />
      </div>

      {/* Spacing alignment columns for desktop */}
      <div className="hidden md:block w-[45%]" />

      {/* Actual Responsive Animation Card container */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50, y: 15 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="w-full md:w-[45%] px-2 pt-6 md:pt-0"
      >
        {/* Perspectives card for 3D flip effect */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative min-h-[300px] w-full [perspective:1000px] cursor-pointer group"
        >
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative w-full min-h-[300px] rounded-xl [transform-style:preserve-3d]"
          >
            {/* FRONT CARD SIDE */}
            <div className="absolute inset-0 h-full w-full rounded-xl border border-yellow-500/20 bg-stone-900/60 p-5 md:p-6 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] [backface-visibility:hidden] flex flex-col justify-between overflow-hidden group-hover:border-yellow-500/40 transition-colors">
              {/* Gold gradient top border accent */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-amber-700" />
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-xs text-yellow-500 bg-yellow-500/10 px-2.5 py-0.5 rounded border border-yellow-500/20 uppercase tracking-widest font-semibold">
                    {milestone.year}
                  </span>
                  <span className="text-gray-500 font-mono text-[10px] tracking-widest uppercase">
                    31st Milestones
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                  {milestone.title}
                </h3>
                <p className="font-sans text-xs text-yellow-500/85 font-medium mt-1">
                  {milestone.subtitle}
                </p>

                <p className="font-sans text-xs text-gray-400 font-light mt-3 leading-relaxed">
                  {milestone.description}
                </p>
              </div>

              {/* Photos placeholders element requested by user */}
              <div className="mt-4 border border-dashed border-yellow-500/15 rounded bg-yellow-500/5 p-2 flex items-center gap-3">
                <div className="h-10 w-10 flex-shrink-0 rounded bg-stone-950 border border-yellow-500/20 flex items-center justify-center relative overflow-hidden">
                  <span className="text-xs">{milestone.emoji}</span>
                  {/* Glowing core */}
                  <div className="absolute inset-0 bg-yellow-400/5 animate-pulse" />
                </div>
                <div className="text-left">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Brotherhood Photo Slot</p>
                  <p className="font-sans text-[10px] text-yellow-400/80 font-light italic mt-0.5">❤️ Tab to see secret mental logs</p>
                </div>
              </div>

              {/* Hover flip indicator */}
              <div className="mt-4 border-t border-yellow-500/10 pt-2 flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-yellow-500/40 group-hover:text-yellow-500/70 transition-colors">
                <span>Nasir & Ihtisham Logs</span>
                <span className="flex items-center gap-1">
                  Flip <RefreshCw className="h-2 w-2 animate-spin" />
                </span>
              </div>
            </div>

            {/* BACK CARD SIDE */}
            <div className="absolute inset-0 h-full w-full rounded-xl border border-yellow-500/35 bg-stone-950 p-5 md:p-6 shadow-[0_15px_35px_rgba(234,179,8,0.1)] [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-600 via-yellow-500 to-yellow-600" />
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[10px] text-yellow-400 uppercase tracking-widest font-semibold flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-yellow-500 animate-pulse" />
                    Brotherhood Musings
                  </span>
                  <HelpCircle className="h-4 w-4 text-yellow-500/40" />
                </div>

                <p className="font-serif italic text-sm text-yellow-100/90 leading-relaxed border-l-2 border-yellow-500/50 pl-3">
                  &ldquo;{milestone.placeholderText}&rdquo;
                </p>
                
                <p className="font-sans text-xs text-gray-400 mt-4 font-light leading-relaxed">
                  Since the early chapters, distance from Swat peaks to Peshawar's gates was never an obstacle. It was just an excuse to write legendary stories whenever we met.
                </p>
              </div>

              {/* Status and back-flip details */}
              <div className="mt-4 border-t border-yellow-500/10 pt-2.5 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400">
                  Status: Indestructible Bond
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-yellow-500/50">
                  Tap to return
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { COMPLIMENTS, Compliment } from "@/src/types";
import { Award, Sparkles, Star } from "lucide-react";

export default function ComplimentsSection() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const toggleSelect = (id: number) => {
    setSelectedId(selectedId === id ? null : id);
  };

  return (
    <section className="relative min-h-screen py-24 px-4 md:px-8 bg-radial from-neutral-950 via-gray-950 to-neutral-950 overflow-hidden">
      {/* Visual background rings */}
      <div className="absolute top-[20%] left-[10%] h-[350px] w-[350px] rounded-full border border-yellow-500/5 [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] rotate-12 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] h-[250px] w-[250px] rounded-full border border-amber-500/5 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />

      {/* Decorative core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-yellow-400/5 blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-16 z-10 relative">
        <span className="font-mono text-xs text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded-full border border-yellow-500/20 inline-flex items-center gap-1.5 uppercase tracking-widest mb-3 animate-pulse">
          <Award className="h-3.5 w-3.5" />
          The Pillars of Character
        </span>
        <h2 className="font-serif text-3xl font-extrabold md:text-4xl text-white">
          What I Like About You
        </h2>
        <p className="text-gray-400 font-light text-sm mt-3 px-6">
          Six golden attributes that define your personality, Ihtisham Khan. Tap each tribute card to express the depth of my admiration.
        </p>
      </div>

      {/* Grid of Interactive Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {COMPLIMENTS.map((compliment, index) => {
          const isSelected = selectedId === compliment.id;
          return (
            <motion.div
              layout
              key={compliment.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => toggleSelect(compliment.id)}
              className="cursor-pointer relative rounded-xl overflow-hidden"
            >
              <motion.div
                className={`relative h-full w-full min-h-[190px] p-6 rounded-xl border transition-all duration-500 flex flex-col justify-between ${
                  isSelected
                    ? "border-yellow-400 bg-gradient-to-b from-yellow-950/40 to-amber-950/40 shadow-[0_0_25px_rgba(234,179,8,0.25)]"
                    : "border-yellow-500/10 bg-stone-900/40 hover:border-yellow-500/30 hover:bg-stone-900/60"
                }`}
                style={{
                  boxShadow: isSelected ? `0 0 30px ${compliment.glowColor}` : ""
                }}
              >
                {/* Micro-sparkle icons when selected */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="absolute top-4 right-4 text-yellow-400 flex gap-1"
                    >
                      <Sparkles className="h-4 w-4 animate-spin" />
                      <Star className="h-4 w-4 animate-pulse fill-yellow-400" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Card Header Structure */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-lg border transition-colors ${
                      isSelected 
                        ? "bg-yellow-500/20 border-yellow-400" 
                        : "bg-stone-950 border-yellow-500/10"
                    }`}>
                      {compliment.emoji}
                    </div>
                    <h3 className={`font-serif text-lg font-bold tracking-tight transition-colors ${
                      isSelected ? "text-yellow-400" : "text-white"
                    }`}>
                      {compliment.title}
                    </h3>
                  </div>

                  <AnimatePresence mode="wait">
                    {!isSelected ? (
                      /* Masked Hint */
                      <motion.div
                        key="hint"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-gray-400 font-mono tracking-wider italic flex items-center gap-1.5 mt-2"
                      >
                        ● Tap card to unlock tribute
                      </motion.div>
                    ) : (
                      /* Real Description Review */
                      <motion.p
                        key="desc"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="font-sans text-xs text-yellow-100/90 leading-relaxed font-light mt-2 pl-1.5 border-l border-yellow-500/30"
                      >
                        {compliment.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer brand details */}
                <div className="mt-4 flex justify-between items-center text-[9px] font-mono tracking-widest uppercase">
                  <span className={isSelected ? "text-yellow-500" : "text-slate-500"}>
                    Verified Attribute
                  </span>
                  <span className="text-yellow-500/50">
                    Nasir Logs
                  </span>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

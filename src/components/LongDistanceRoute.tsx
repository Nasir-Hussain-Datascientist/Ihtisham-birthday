import { motion } from "motion/react";
import { Compass, Heart, MapPin, Navigation } from "lucide-react";

export default function LongDistanceRoute() {
  return (
    <section className="relative min-h-[500px] py-24 px-4 md:px-8 bg-black text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Background grid representation */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#eab30805_1px,transparent_1px),linear-gradient(to_bottom,#eab30805_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Neon glowing center dots */}
      <div className="absolute top-[35%] left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-yellow-500/5 blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-2xl mx-auto text-center mb-16 z-10 relative">
        <span className="font-mono text-xs text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded-full border border-yellow-500/20 inline-flex items-center gap-1.5 uppercase tracking-widest mb-3">
          <Compass className="h-3.5 w-3.5 animate-spin" />
          The Spatial Coordinates of Brotherhood
        </span>
        <h2 className="font-serif text-3xl font-extrabold md:text-4xl text-white">
          Swat to Peshawar Route
        </h2>
        <p className="text-gray-400 font-light text-sm mt-3 px-6">
          A physical gap of 250 kilometers bridged instantly by deep affection and emotional connection.
        </p>
      </div>

      {/* Maps Interactive Stage */}
      <div className="relative w-full max-w-lg aspect-[1.3/1] bg-stone-900/40 border border-yellow-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.7)] flex flex-col justify-between overflow-hidden z-10">
        
        {/* Map Header metadata */}
        <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 border-b border-yellow-500/10 pb-3">
          <span className="flex items-center gap-1">
            <Navigation className="h-3 w-3 text-yellow-500" />
            Live Vector Interface
          </span>
          <span className="text-yellow-500/60 font-semibold uppercase">
            Distance: ~250 KM (M-16 Expressway)
          </span>
        </div>

        {/* The Graphic Map Area */}
        <div className="relative flex-grow flex items-center justify-center my-6 h-48">
          <svg
            viewBox="0 0 500 300"
            className="w-full h-full drop-shadow-[0_0_15px_rgba(234,179,8,0.15)]"
          >
            {/* Outline mountain ranges in background representing Northern Pakistan */}
            <path
              d="M 50 120 L 120 70 L 190 120 L 260 80 L 330 140"
              fill="none"
              stroke="rgba(234, 179, 8, 0.04)"
              strokeWidth="2.5"
            />
            <path
              d="M 150 110 L 220 50 L 290 110"
              fill="none"
              stroke="rgba(234, 179, 8, 0.03)"
              strokeWidth="1.5"
            />

            {/* Glowing serpentine expressway path from top right (Swat coordinates setup) to bottom left (Peshawar coordinates setup) */}
            <path
              id="expressway-path"
              d="M 380 60 Q 250 150 120 240"
              fill="none"
              stroke="rgba(234, 179, 8, 0.25)"
              strokeWidth="3.5"
              strokeDasharray="4 4"
            />

            {/* Pulsing Swat City Node (A beautiful green mountains representation) */}
            <g transform="translate(380, 60)">
              <circle r="18" fill="rgba(234, 179, 8, 0.05)" className="animate-ping" stroke="rgba(234, 179, 8, 0.15)" strokeWidth="1" />
              <circle r="10" fill="rgba(234, 179, 8, 0.2)" />
              <circle r="5" fill="#fef08a" />
            </g>

            {/* Pulsing Peshawar City Node (A beautiful historic gateway representation) */}
            <g transform="translate(120, 240)">
              <circle r="22" fill="rgba(234, 179, 8, 0.05)" className="animate-ping" stroke="rgba(234, 179, 8, 0.15)" strokeWidth="1" />
              <circle r="12" fill="rgba(234, 179, 8, 0.2)" />
              <circle r="6" fill="#fef08a" />
            </g>

            {/* Traveling wish/light pulse */}
            <circle r="8" fill="#fef08a" className="shadow-lg">
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path="M 380 60 Q 250 150 120 240"
              />
              {/* Highlight flash */}
            </circle>
            
            {/* Overlay labels inside SVG */}
            <text x="380" y="32" fill="#fff" fontSize="10" fontFamily="sans-serif" textAnchor="middle" className="font-mono tracking-wider font-semibold">
              🏔️ SWAT
            </text>
            <text x="120" y="278" fill="#fff" fontSize="10" fontFamily="sans-serif" textAnchor="middle" className="font-mono tracking-wider font-semibold">
              🕌 PESHAWAR
            </text>
          </svg>

          {/* Floaters coordinates on the sides */}
          <div className="absolute top-2 right-4 text-right flex flex-col items-end">
            <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Swat valley elevation</span>
            <span className="font-mono text-[10px] text-yellow-500 font-semibold">34.8068° N, 72.3607° E</span>
          </div>

          <div className="absolute bottom-2 left-4 text-left flex flex-col items-start">
            <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Peshawar plains elevation</span>
            <span className="font-mono text-[10px] text-yellow-500 font-semibold">34.0151° N, 71.5249° E</span>
          </div>
        </div>

        {/* Map Footer slogan */}
        <div className="text-center font-serif text-lg text-yellow-400 font-semibold italic mt-4 px-2 tracking-wide drop-shadow-[0_2px_10px_rgba(234,179,8,0.2)] border-t border-yellow-500/10 pt-4">
          &ldquo;Distance measures kilometers, not friendship.&rdquo;
        </div>
      </div>
    </section>
  );
}

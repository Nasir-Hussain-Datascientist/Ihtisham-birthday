import { useRef } from "react";
import ParticleBackground from "@/src/components/ParticleBackground";
import AudioEngine from "@/src/components/AudioEngine";
import HeroSection from "@/src/components/HeroSection";
import LetterSection from "@/src/components/LetterSection";
import TimelineSection from "@/src/components/TimelineSection";
import ComplimentsSection from "@/src/components/ComplimentsSection";
import LongDistanceRoute from "@/src/components/LongDistanceRoute";
import ApologyClock from "@/src/components/ApologyClock";
import WishGenerator from "@/src/components/WishGenerator";
import FriendshipMeter from "@/src/components/FriendshipMeter";
import GiftSurprise from "@/src/components/GiftSurprise";
import { Sparkles, Heart } from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  const journeyStartRef = useRef<HTMLDivElement>(null);

  const handleStartJourney = () => {
    journeyStartRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="full-app-container" className="relative min-h-screen text-white bg-slate-950 font-sans selection:bg-yellow-500 selection:text-black">
      {/* Immersive background particles covering the whole scrolling experience */}
      <ParticleBackground />

      {/* Persistent corner audio synthesiser controllers */}
      <AudioEngine />

      {/* Main Page Layout Flow */}
      <main className="relative z-10 w-full">
        {/* HERO INTRO BLOCK */}
        <HeroSection onStartJourney={handleStartJourney} />

        {/* CONTAINER FOR SCROLLING STORIES */}
        <div ref={journeyStartRef} className="w-full">
          {/* THE SACRED SEALED LETTER */}
          <div className="border-t border-yellow-500/10">
            <LetterSection />
          </div>

          {/* CHRONICLES MILSTONE SCROLL TIMELINE */}
          <div className="border-t border-yellow-500/10 bg-black/40">
            <TimelineSection />
          </div>

          {/* BENTO ATTRIBUTES COMPLIMENTS PANEL */}
          <div className="border-t border-yellow-500/10 bg-gradient-to-b from-transparent to-black/60">
            <ComplimentsSection />
          </div>

          {/* CHRONOLOGY CO-COORDINATE LONG DISTANCE ROUTES MAP */}
          <div className="border-t border-yellow-500/10 bg-black/40">
            <LongDistanceRoute />
          </div>

          {/* TIME TRAVEL LATE APOLOGY DIAL */}
          <div className="border-t border-yellow-500/10">
            <ApologyClock />
          </div>

          {/* PRAYERS SHUFFLER CARD DECK */}
          <div className="border-t border-yellow-500/10 bg-black/50">
            <WishGenerator />
          </div>

          {/* SYNCHRONIZER GAUGE SLIDER */}
          <div className="border-t border-yellow-500/10">
            <FriendshipMeter />
          </div>

          {/* FINAL BLOWING BOX CELEBRATION */}
          <div className="border-t border-yellow-500/10 bg-[#020205]">
            <GiftSurprise />
          </div>
        </div>
      </main>

      {/* Elegant minimalist footer */}
      <footer id="app-footer" className="relative z-10 bg-black py-12 px-6 border-t border-yellow-500/10 text-center font-mono text-xs text-gray-500">
        <div className="max-w-md mx-auto flex flex-col items-center gap-3">
          <div className="flex items-center gap-1 text-yellow-500/40 select-none">
            <Sparkles className="h-3 w-3" />
            <span>SWAT</span>
            <Heart className="h-2.5 w-2.5 text-red-500/60 fill-red-500/30" />
            <span>PESHAWAR</span>
          </div>
          <p className="font-light tracking-wide">
            Designed specifically for Ihtisham Khan’s 31st Golden Birthday.
          </p>
          <p className="text-[10px] text-gray-650 opacity-60">
            Handcrafted with love & loyalty by Nasir. Late wishes are eternal wishes.
          </p>
        </div>
      </footer>
    </div>
  );
}

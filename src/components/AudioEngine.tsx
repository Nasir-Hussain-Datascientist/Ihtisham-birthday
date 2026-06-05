import { useState, useEffect, useRef } from "react";
import { Music, VolumeX, Volume2, Sparkles } from "lucide-react";

export default function AudioEngine() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [useSynth, setUseSynth] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const loopRef = useRef<number | null>(null);
  const playSeqRef = useRef<number>(0);

  // A warm, pentatonic, emotional melody notes (frequencies) representation
  // Chords: G Major -> E Minor -> C Major -> D Major
  const chords = [
    [196.00, 246.94, 293.66, 392.00], // G3, B3, D4, G4 (Warm G)
    [164.81, 196.00, 246.94, 329.63], // E3, G3, B3, E4 (Em)
    [130.81, 164.81, 196.00, 261.63], // C3, E3, G3, C4 (Warm C)
    [146.83, 220.00, 293.66, 369.99], // D3, A3, D4, F#4 (D)
  ];

  const playNote = (ctx: AudioContext, freq: number, time: number, duration: number = 2.0) => {
    // Synth components: Oscillator + Lowpass Filter + Gain (ADS Envelope) + Ping-Pong Echo
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gainNode = ctx.createGain();
    const delay = ctx.createDelay();
    const feedback = ctx.createGain();

    osc.type = "sine"; // Super clean, soft tone
    osc.frequency.setValueAtTime(freq, time);

    // Filter to make it warmer and less harsh
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, time);
    filter.frequency.exponentialRampToValueAtTime(300, time + duration);

    // Warm envelope
    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime(0.12, time + 0.15); // soft attack
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + duration); // smooth decay

    // Intersect echo/delay for ambient space feel
    delay.delayTime.setValueAtTime(0.4, time);
    feedback.gain.setValueAtTime(0.35, time);

    // Connections
    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Echo pathway
    gainNode.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    feedback.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + duration + 1.0);
  };

  const startMusicLoop = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    let noteIndex = 0;
    let chordIndex = 0;
    let stepTime = ctx.currentTime + 0.1;

    const scheduler = () => {
      // Schedule notes 1.5 seconds in advance
      while (stepTime < ctx.currentTime + 2.0) {
        const chord = chords[chordIndex];
        const freq = chord[noteIndex];
        
        // Add subtle pitch randomizer to simulate emotional piano touch
        const humanTouch = (Math.random() - 0.5) * 1.5;
        playNote(ctx, freq + humanTouch, stepTime, 2.5);

        // Advance note sequencer
        noteIndex++;
        if (noteIndex >= chord.length) {
          noteIndex = 0;
          chordIndex = (chordIndex + 1) % chords.length;
        }

        // Add slow rhythm (1.2 seconds per note for slow emotional tempo)
        stepTime += 1.2;
      }
      
      loopRef.current = requestAnimationFrame(scheduler);
    };

    scheduler();
  };

  const stopMusicLoop = () => {
    if (loopRef.current) {
      cancelAnimationFrame(loopRef.current);
      loopRef.current = null;
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopMusicLoop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      startMusicLoop();
    }
  };

  // Clean-up on unmount
  useEffect(() => {
    return () => {
      stopMusicLoop();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // Listen to interactive taps on screen to start if permitted
  useEffect(() => {
    const handleFirstTap = () => {
      if (!isPlaying && audioCtxRef.current?.state !== "suspended") {
        // We can optionally trigger here, but to avoid surprising the user,
        // we let them click the float button explicitly, OR trigger upon unlocking/reading.
      }
    };

    window.addEventListener("click", handleFirstTap, { once: true });
    return () => window.removeEventListener("click", handleFirstTap);
  }, [isPlaying]);

  return (
    <div 
      id="audio-badge"
      className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full border border-yellow-500/20 bg-black/60 px-3 py-1.5 backdrop-blur-md shadow-[0_0_15px_rgba(234,179,8,0.15)] transition-all duration-300 md:top-6 md:right-6"
    >
      <div className="flex flex-col items-end text-[10px]">
        <span className="font-mono text-yellow-500 uppercase tracking-widest text-[9px] flex items-center gap-1">
          {isPlaying && (
            <Sparkles className="h-2 w-2 animate-pulse text-yellow-400" />
          )}
          Ambient Sound
        </span>
        <span className="text-gray-400 font-sans text-[8px]">
          {isPlaying ? "Melody Synthesized" : "Sound Muted"}
        </span>
      </div>

      <button
        id="sound-toggle-btn"
        onClick={toggleSound}
        className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-500 ${
          isPlaying
            ? "border-yellow-500 bg-yellow-500/20 text-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.4)] rotate-45"
            : "border-gray-700 bg-gray-900/40 text-gray-400 hover:border-gray-500"
        }`}
        aria-label="Toggle background music"
      >
        {isPlaying ? (
          <Volume2 className="h-4 w-4 animate-bounce" />
        ) : (
          <VolumeX className="h-4 w-4 text-gray-500" />
        )}
      </button>
    </div>
  );
}

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed (interaction needed first)", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <audio ref={audioRef} loop>
        <source src="song.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      <button 
        onClick={togglePlay}
        className="relative bg-gradient-to-br from-amber-900/30 to-amber-950/30 backdrop-blur-md border border-amber-500/30 hover:border-amber-400/50 text-amber-200 rounded-full p-4 transition-all duration-300 group overflow-hidden"
        aria-label={isPlaying ? "Pause Music" : "Play Music"}
      >
        {/* Gold glow effect */}
        <motion.div
          className="absolute inset-0 bg-amber-500/20 rounded-full blur-md"
          animate={isPlaying ? {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Icon */}
        <div className="relative z-10">
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16" fill="currentColor" />
              <rect x="14" y="4" width="4" height="16" fill="currentColor" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </div>
        
        {/* Tooltip */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 text-xs text-amber-400/80 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none bg-black/50 px-2 py-1 rounded">
          {isPlaying ? 'Pause' : 'Play Music'}
        </span>
      </button>
    </motion.div>
  );
};

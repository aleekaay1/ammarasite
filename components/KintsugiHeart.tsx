import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface KintsugiHeartProps {
  progress: number; // 0 to 1
}

export const KintsugiHeart: React.FC<KintsugiHeartProps> = ({ progress }) => {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      {/* Base broken heart - dark ceramic */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.3))' }}
      >
        {/* Main heart shape - dark ceramic color */}
        <defs>
          <linearGradient id="ceramicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="50%" stopColor="#16213e" />
            <stop offset="100%" stopColor="#0f0f1a" />
          </linearGradient>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f4d03f" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Heart base */}
        <path
          d="M50 88 C20 60, 5 40, 15 25 C25 10, 40 10, 50 25 C60 10, 75 10, 85 25 C95 40, 80 60, 50 88Z"
          fill="url(#ceramicGradient)"
          stroke="#2a2a4a"
          strokeWidth="0.5"
        />

        {/* Crack lines - these fill with gold based on progress */}
        {/* Main vertical crack */}
        <motion.path
          d="M50 25 L48 35 L52 45 L47 55 L53 65 L50 75 L50 88"
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: progress, 
            opacity: progress > 0.1 ? 1 : 0 
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Left diagonal crack */}
        <motion.path
          d="M35 35 L40 40 L38 50 L42 55"
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: Math.max(0, (progress - 0.2) * 1.25), 
            opacity: progress > 0.2 ? 1 : 0 
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Right diagonal crack */}
        <motion.path
          d="M65 35 L60 42 L63 50 L58 58"
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: Math.max(0, (progress - 0.3) * 1.43), 
            opacity: progress > 0.3 ? 1 : 0 
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Upper left crack */}
        <motion.path
          d="M25 30 L30 35 L28 42"
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: Math.max(0, (progress - 0.4) * 1.67), 
            opacity: progress > 0.4 ? 1 : 0 
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Upper right crack */}
        <motion.path
          d="M75 30 L70 36 L73 43"
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: Math.max(0, (progress - 0.5) * 2), 
            opacity: progress > 0.5 ? 1 : 0 
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Small branching cracks */}
        <motion.path
          d="M48 35 L42 38"
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth="1"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: Math.max(0, (progress - 0.6) * 2.5), 
            opacity: progress > 0.6 ? 1 : 0 
          }}
          transition={{ duration: 0.5 }}
        />

        <motion.path
          d="M52 45 L58 48"
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth="1"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: Math.max(0, (progress - 0.7) * 3.33), 
            opacity: progress > 0.7 ? 1 : 0 
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Gold dust particles when fully repaired */}
        {progress > 0.9 && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.circle
                key={i}
                cx={50 + Math.cos(i * 0.785) * 30}
                cy={50 + Math.sin(i * 0.785) * 30}
                r="1"
                fill="#d4af37"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </>
        )}
      </svg>

      {/* Glow effect behind heart */}
      <motion.div
        className="absolute inset-0 rounded-full bg-amber-500/20 blur-3xl -z-10"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};



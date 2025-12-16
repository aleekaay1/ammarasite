import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { KintsugiHeart } from './components/KintsugiHeart';
import { MusicPlayer } from './components/MusicPlayer';
import { WindowSize } from './types';

// Custom hook for window size
const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({ width: 0, height: 0 });
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

// Gold particle component
const GoldParticle: React.FC<{ delay: number }> = ({ delay }) => (
  <motion.div
    className="absolute w-1 h-1 bg-amber-400 rounded-full"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    animate={{
      y: [0, -100, -200],
      x: [0, Math.random() * 50 - 25],
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
    }}
    transition={{
      duration: 4 + Math.random() * 2,
      repeat: Infinity,
      delay: delay,
      ease: "easeOut",
    }}
  />
);

const App: React.FC = () => {
  const [wishMade, setWishMade] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  
  // Transform scroll progress to heart repair progress
  const heartProgress = useTransform(smoothProgress, [0, 0.7], [0, 1]);
  const [currentHeartProgress, setCurrentHeartProgress] = useState(0);
  
  useEffect(() => {
    const unsubscribe = heartProgress.on("change", (v) => setCurrentHeartProgress(v));
    return () => unsubscribe();
  }, [heartProgress]);

  const handleMakeWish = () => {
    setWishMade(true);
    setShowConfetti(true);
    // Stop confetti after 5 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 300);
  };

  // Confetti config with gold colors
  const confettiColors = ['#d4af37', '#f4d03f', '#b8860b', '#ffd700', '#ffec8b', '#fff8dc'];

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-[#0a0a0f] selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Progress Bar - Gold */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 origin-left z-50"
        style={{ scaleX: smoothProgress }}
      />

      {/* Floating gold particles background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <GoldParticle key={i} delay={i * 0.3} />
        ))}
      </div>

      {/* Confetti - stops after 5 seconds */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <Confetti 
            width={width} 
            height={height} 
            numberOfPieces={250} 
            recycle={false}
            gravity={0.15}
            colors={confettiColors}
          />
        </div>
      )}

      <MusicPlayer />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: THE BREAK
      ═══════════════════════════════════════════════════════════════ */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center relative px-6 py-20">
        {/* Subtle crack pattern background */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 50 L30 48 L50 52 L70 49 L100 51" stroke="white" strokeWidth="0.1" fill="none"/>
            <path d="M20 0 L22 30 L18 50 L23 70 L19 100" stroke="white" strokeWidth="0.1" fill="none"/>
            <path d="M80 0 L78 25 L82 50 L77 75 L81 100" stroke="white" strokeWidth="0.1" fill="none"/>
          </svg>
        </div>

        <div className="max-w-3xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <h1 className="text-5xl md:text-8xl font-serif text-white/90 mb-6 tracking-wide">
              The Break
            </h1>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-8" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="text-lg md:text-2xl text-gray-400 font-light leading-relaxed"
          >
            "I shattered something precious. I walked away from the most beautiful thing 
            I've ever held, and the silence since has been deafening."
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 1.5 }}
            className="text-base md:text-lg text-gray-500 font-light leading-relaxed mt-6 italic"
          >
            But in Japan, they believe broken things can become more beautiful...
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-amber-500/50 text-sm flex flex-col items-center gap-2"
        >
          <span>Scroll to mend</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: KINTSUGI PHILOSOPHY - White Section with Pot Image
      ═══════════════════════════════════════════════════════════════ */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center relative px-6 py-24 bg-gradient-to-b from-[#f5f5f5] via-white to-[#f5f5f5]">
        
        {/* Subtle gold accent lines */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* The Kintsugi Pot Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex-shrink-0 relative"
          >
            <div className="relative">
              {/* Gold glow behind image */}
              <div className="absolute inset-0 bg-amber-400/20 blur-3xl rounded-full transform scale-75" />
              
              <img 
                src="/pot.jpg" 
                alt="Kintsugi Bowl - Broken pottery repaired with gold" 
                className="relative w-72 md:w-96 h-auto rounded-lg shadow-2xl"
              />
              
              {/* Decorative frame corners */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-amber-500" />
              <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-amber-500" />
              <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-amber-500" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-amber-500" />
            </div>
          </motion.div>

          <div className="text-center lg:text-left max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-5xl md:text-7xl font-serif text-gray-800 mb-2">
                金継ぎ
              </h2>
              <p className="text-2xl md:text-3xl text-amber-600 font-light mb-8 italic">
                Kintsugi
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-lg md:text-xl text-gray-700 font-light leading-relaxed mb-6"
            >
              "The Japanese art of repairing broken pottery with gold. 
              Instead of hiding the damage, it celebrates it — believing that 
              breakage and repair are part of the history of an object, 
              making it <span className="text-amber-600 font-medium">more beautiful</span> than before."
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-base md:text-lg text-gray-500 font-light leading-relaxed"
            >
              What was broken is not worthless. It can be mended with something precious, 
              becoming stronger at the broken places.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 1 }}
              className="mt-8 flex items-center gap-3 justify-center lg:justify-start"
            >
              <div className="w-12 h-[1px] bg-amber-400" />
              <span className="text-amber-600 text-sm tracking-widest uppercase">Our Story</span>
              <div className="w-12 h-[1px] bg-amber-400" />
            </motion.div>
          </div>
        </div>

        {/* Animated heart that repairs - moved below */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16"
        >
          <KintsugiHeart progress={currentHeartProgress} />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: THE GOLDEN REPAIR - Why I Came Back
      ═══════════════════════════════════════════════════════════════ */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-24 bg-gradient-to-b from-[#0a0a0f] via-[#1a1410] to-[#0a0a0f] relative overflow-hidden">
        
        {/* Gold vein decorations */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0 20 Q25 25, 50 20 T100 25" stroke="#d4af37" strokeWidth="0.2" fill="none"/>
            <path d="M0 80 Q25 75, 50 80 T100 75" stroke="#d4af37" strokeWidth="0.2" fill="none"/>
          </svg>
        </div>

        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-serif text-amber-100 mb-4 text-center"
        >
          The Golden Repair
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-amber-500/70 text-lg mb-16 text-center"
        >
          Why I came back
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
          {[
            { 
              title: "Your Light", 
              text: "In the darkness of my mistake, I realized you were never just a part of my life — you were the light that made sense of it all.",
              delay: 0.1 
            },
            { 
              title: "The Void", 
              text: "Living without you taught me that some emptiness cannot be filled. It can only be returned to.",
              delay: 0.2 
            },
            { 
              title: "My Promise", 
              text: "I am not the same man who left. Fear made me run, but love — real love — brought me back. Stronger.",
              delay: 0.3 
            },
            { 
              title: "Forever", 
              text: "I don't want a perfect love story. I want our story — cracks, gold, and all. Because that's what makes it ours.",
              delay: 0.4 
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: card.delay, duration: 0.8 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative bg-gradient-to-br from-[#151520] to-[#0d0d12] p-8 rounded-sm border border-amber-900/20 hover:border-amber-500/30 transition-all duration-500"
            >
              {/* Gold accent line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <h3 className="text-xl md:text-2xl font-serif text-amber-200 mb-4">
                {card.title}
              </h3>
              <p className="text-gray-400 font-light leading-relaxed">
                {card.text}
              </p>

              {/* Corner decoration */}
              <div className="absolute bottom-3 right-3 w-8 h-8 opacity-20 group-hover:opacity-40 transition-opacity">
                <svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: REBORN - Birthday Celebration
      ═══════════════════════════════════════════════════════════════ */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden bg-gradient-to-br from-[#1a1410] via-[#2a1f15] to-[#1a1410]">
        
        {/* Radial gold glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[100px]" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-amber-400/30 rounded-full"
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-400/80 font-sans tracking-[0.3em] uppercase text-sm mb-6"
          >
            December 17th
          </motion.p>
          
          <h1 className="text-5xl md:text-8xl font-serif text-white mb-4 leading-tight">
            Happy Birthday
          </h1>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-7xl font-serif mb-8"
          >
            <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent">
              Ammara
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light"
          >
            More beautiful now. Mended in gold. Stronger than before.
          </motion.p>
        </motion.div>

        {!wishMade ? (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 40px rgba(212, 175, 55, 0.4)" 
            }}
            whileTap={{ scale: 0.98 }}
            onClick={handleMakeWish}
            className="relative px-12 py-5 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-black font-serif text-xl md:text-2xl rounded-sm z-20 overflow-hidden group"
          >
            <span className="relative z-10">Make a Wish ✨</span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="mt-8 p-10 md:p-14 bg-gradient-to-br from-[#1a1510]/95 to-[#0d0a08]/95 backdrop-blur-md rounded-sm max-w-2xl text-center z-20 border border-amber-500/30 relative overflow-hidden"
            >
              {/* Gold corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-500/50" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-500/50" />
              
              <h3 className="text-3xl md:text-4xl font-serif bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent mb-6">
                Wish Granted
              </h3>
              
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light mb-6">
                Happy Birthday Meri Jaan ❤️
              </p>
              
              <p className="text-base md:text-lg text-gray-400 leading-relaxed font-light mb-4">
                I wanted to do soo much but I couldn't. Last birthday pe bhi I was not able to do anything.
              </p>
              
              <p className="text-base md:text-lg text-gray-400 leading-relaxed font-light mb-4">
                Happy Birthday — I am sorry if I made your mood bad within the time, but trust me, 
                I love you more than you can imagine, even I can't!!!
              </p>
              
              <p className="text-base md:text-lg text-gray-400 leading-relaxed font-light mb-6">
                So yeah, Enjoy your day. 🎂
              </p>
              
              <p className="text-xl md:text-2xl text-amber-400 font-serif italic mt-4">
                Tumhara only,<br />
                <span className="text-amber-300">Tumhara Alee</span> 💛
              </p>
              
              <motion.div 
                className="flex justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg width="48" height="48" viewBox="0 0 100 100" className="text-amber-500">
                  <defs>
                    <linearGradient id="heartGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f4d03f" />
                      <stop offset="50%" stopColor="#d4af37" />
                      <stop offset="100%" stopColor="#b8860b" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M50 88 C20 60, 5 40, 15 25 C25 10, 40 10, 50 25 C60 10, 75 10, 85 25 C95 40, 80 60, 50 88Z"
                    fill="url(#heartGold)"
                  />
                </svg>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      {/* Footer */}
      <footer className="py-8 text-center bg-[#0a0a0f] border-t border-amber-900/20">
        <p className="text-amber-500/40 text-sm font-light">
          Made with love, mended with gold 💛
        </p>
      </footer>
    </div>
  );
};

export default App;

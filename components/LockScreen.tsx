import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0 });
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Calculate time until Dec 17, 00:00 PKT (midnight tonight)
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      
      // Get current time in milliseconds (UTC)
      const nowUTC = now.getTime();
      
      // PKT is UTC+5, so to get PKT time we add 5 hours
      // Current PKT time = nowUTC + (5 * 60 * 60 * 1000)
      const pktOffset = 5 * 60 * 60 * 1000;
      const currentPKT = new Date(nowUTC + pktOffset);
      
      // Get current date in PKT
      const currentYear = currentPKT.getUTCFullYear();
      const currentMonth = currentPKT.getUTCMonth(); // 0-11
      const currentDay = currentPKT.getUTCDate();
      
      // Target: Dec 17, 00:00:00 PKT
      // To convert PKT to UTC: subtract 5 hours
      // Dec 17, 00:00:00 PKT = Dec 16, 19:00:00 UTC
      
      let targetYear = currentYear;
      
      // Check if we're past Dec 17, 00:00 PKT this year
      // If current month is December (11) and day is 17 or later, or month is after December
      if (currentMonth > 11 || (currentMonth === 11 && currentDay >= 17)) {
        targetYear = currentYear + 1;
      }
      
      // Create target: Dec 16, 19:00:00 UTC (which is Dec 17, 00:00:00 PKT)
      const targetUTC = new Date(Date.UTC(targetYear, 11, 16, 19, 0, 0, 0));
      const targetTime = targetUTC.getTime();
      
      // Calculate difference (both in UTC milliseconds)
      const diff = targetTime - nowUTC;
      
      if (diff <= 0) {
        setTimeRemaining({ hours: 0, minutes: 0, seconds: 0 });
        // Time has passed, check if password is correct
        if (success) {
          setIsUnlocked(true);
          setTimeout(() => onUnlock(), 1000);
        }
        return;
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeRemaining({ hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [success, onUnlock]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Check if timer has expired
    const timerExpired = timeRemaining.hours === 0 && timeRemaining.minutes === 0 && timeRemaining.seconds === 0;
    
    if (password.trim().toLowerCase() === 'ali') {
      setSuccess(true);
      // If timer has expired and password is correct, unlock immediately
      if (timerExpired) {
        setIsUnlocked(true);
        setTimeout(() => onUnlock(), 1500);
      }
    } else {
      setError('Sharam Karo, Joothi');
      setPassword('');
    }
  };

  const timerExpired = timeRemaining.hours === 0 && timeRemaining.minutes === 0 && timeRemaining.seconds === 0;
  const canUnlock = timerExpired && success;

  return (
    <div className="fixed inset-0 bg-[#0a0a0f] z-[100] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        {/* Timer Display */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={timerExpired ? "mb-8" : "mb-0"}
        >
          <h2 className="text-3xl md:text-4xl font-serif text-amber-200 mb-4">
            {timerExpired ? "Time's Up!" : "Almost There..."}
          </h2>
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/30 border border-amber-500/30 rounded-lg px-6 py-4 backdrop-blur-sm">
              <div className="text-4xl md:text-5xl font-mono text-amber-400 font-bold">
                {String(timeRemaining.hours).padStart(2, '0')}
              </div>
              <div className="text-xs text-amber-500/70 mt-1 uppercase tracking-wider">Hours</div>
            </div>
            <div className="text-amber-400 text-3xl">:</div>
            <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/30 border border-amber-500/30 rounded-lg px-6 py-4 backdrop-blur-sm">
              <div className="text-4xl md:text-5xl font-mono text-amber-400 font-bold">
                {String(timeRemaining.minutes).padStart(2, '0')}
              </div>
              <div className="text-xs text-amber-500/70 mt-1 uppercase tracking-wider">Minutes</div>
            </div>
            <div className="text-amber-400 text-3xl">:</div>
            <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/30 border border-amber-500/30 rounded-lg px-6 py-4 backdrop-blur-sm">
              <div className="text-4xl md:text-5xl font-mono text-amber-400 font-bold">
                {String(timeRemaining.seconds).padStart(2, '0')}
              </div>
              <div className="text-xs text-amber-500/70 mt-1 uppercase tracking-wider">Seconds</div>
            </div>
          </div>
          <p className="text-amber-500/60 text-sm mt-2">
            {timerExpired ? "Enter the password to unlock" : "Until December 17th, 00:00 PKT"}
          </p>
        </motion.div>

        {/* Password Form - Only show when timer expires */}
        <AnimatePresence>
          {timerExpired && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={handlePasswordSubmit} className="space-y-4 mt-8">
                <div>
                  <label className="block text-amber-300/80 text-sm mb-2 font-light">
                    Hint: The name of your favorite guy.
                  </label>
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter password..."
                    className="w-full px-4 py-3 bg-[#151520] border border-amber-500/30 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                    autoFocus
                    disabled={canUnlock}
                  />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-sm"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {success && (
                    <motion.p
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-amber-400 text-lg font-serif"
                    >
                      I knew it you love me. 💛
                    </motion.p>
                  )}
                </AnimatePresence>

                {canUnlock && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-amber-300 text-sm mt-4"
                  >
                    Unlocking...
                  </motion.p>
                )}

                <button
                  type="submit"
                  disabled={canUnlock}
                  className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-black font-serif text-lg rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:from-amber-500 hover:via-yellow-400 hover:to-amber-500 transition-all"
                >
                  {success ? 'Unlocking...' : 'Enter'}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password.trim().toLowerCase() === 'ali') {
      setSuccess(true);
      // Unlock immediately when password is correct
      setTimeout(() => {
        onUnlock();
      }, 1500);
    } else {
      setError('Sharam Karo, Joothi');
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0a0a0f] z-[100] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-amber-200 mb-4">
            Welcome
          </h2>
          <p className="text-amber-500/60 text-sm">
            Enter the password to unlock
          </p>
        </motion.div>

        {/* Password Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
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
                disabled={success}
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

            {success && (
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
              disabled={success}
              className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-black font-serif text-lg rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:from-amber-500 hover:via-yellow-400 hover:to-amber-500 transition-all"
            >
              {success ? 'Unlocking...' : 'Enter'}
            </button>
          </form>
        </motion.div>

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

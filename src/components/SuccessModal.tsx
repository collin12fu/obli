// Celebratory overlay with a customizable message

'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface SuccessModalProps {
  message: string;
}

export default function SuccessModal({ message }: SuccessModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gradient-to-br from-[#CBAA6F] via-[#9E7A44] to-[#5C4520] p-8 rounded-3xl shadow-2xl text-white text-center max-w-sm w-full"
          initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0.5, rotate: 20, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        >
          <h2 className="text-4xl font-bold mb-4 animate-pulse">{message}</h2>
          <p className="text-white/70">Hang tight, we’re moving you forward 🚀</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
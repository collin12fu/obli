"use client";

import { useEffect } from "react";
import { X, Settings } from "lucide-react"; // Icons
import { motion, AnimatePresence } from "framer-motion"; // For better animations

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: {
    id: string;
    displayName: string;
    bio: string;
    avatarUrl: string;
    activeContracts: number;
    pendingContracts: number;
    brokenContracts: number;
  };
  currentUserId: string; // Logged-in user id
}

export default function ProfileModal({ isOpen, onClose, user, currentUserId }: ProfileModalProps) {
  if (!user) return null; // Safety check for undefined user

  const isOwnProfile = user.id === currentUserId;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="relative bg-white dark:bg-zinc-900 rounded-2xl border-2 border-yellow-500 p-6 w-full max-w-sm shadow-xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center">
              <img
                src={user.avatarUrl}
                alt="User Avatar"
                className="w-24 h-24 rounded-full object-cover border-2 border-yellow-500 mb-4"
              />
              <h2 className="text-xl font-semibold text-center">{user.displayName}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">{user.bio}</p>

              <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                <div>
                  <p className="text-lg font-bold">{user.activeContracts}</p>
                  <p className="text-xs text-gray-500">Active</p>
                </div>
                <div>
                  <p className="text-lg font-bold">{user.pendingContracts}</p>
                  <p className="text-xs text-gray-500">Pending</p>
                </div>
                <div>
                  <p className="text-lg font-bold">{user.brokenContracts}</p>
                  <p className="text-xs text-gray-500">Broken</p>
                </div>
              </div>

              {isOwnProfile && (
                <button className="mt-6 flex items-center gap-2 text-yellow-600 hover:text-yellow-700">
                  <Settings size={20} />
                  <span>Manage Profile</span>
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Brain } from "lucide-react";

interface ToggleButtonProps {
  activeTab: string;
  toggleTab: () => void;
}

export default function ToggleButton({
  activeTab,
  toggleTab,
}: ToggleButtonProps) {
  return (
    <div className="absolute top-5 right-8 z-50 flex justify-center pt-2 pb-2">
      <div className="relative">
        {/* Create multiple layers of glowing effects */}
        <motion.div
          className="absolute -inset-3 rounded-full opacity-30"
          style={{
            background:
              "linear-gradient(45deg, #2563eb, #4f46e5, #7c3aed, #2563eb)",
            backgroundSize: "200% 200%",
            filter: "blur(15px)",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            scale: [1, 1.1, 1],
          }}
          transition={{
            backgroundPosition: {
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        <motion.div
          className="absolute -inset-1 rounded-full opacity-75"
          style={{
            background:
              "linear-gradient(45deg, #3b82f6, #6366f1, #8b5cf6, #3b82f6)",
            backgroundSize: "200% 200%",
            boxShadow: "0 0 12px rgba(79, 70, 229, 0.6)",
            filter: "blur(8px)",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            scale: [1, 1.05, 1],
          }}
          transition={{
            backgroundPosition: {
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            },
          }}
        />

        {/* Orbital particle effects */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-70"
              style={{
                top: "50%",
                left: "50%",
                margin: "-1px 0 0 -1px",
              }}
              animate={{
                x: [0, Math.cos((i * Math.PI) / 3) * 30, 0],
                y: [0, Math.sin((i * Math.PI) / 3) * 30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.button
          onClick={toggleTab}
          className="relative flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-1 rounded-full w-14 h-14 shadow-lg z-10 border-2 border-white/20"
          whileHover={{ scale: 1.07, rotate: 5 }}
          whileTap={{ scale: 0.92 }}
        >
          <motion.div
            initial={false}
            animate={{ rotate: activeTab === "chat" ? 0 : 180 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              {activeTab === "chat" ? (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <MessageSquare className="h-6 w-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="knowledge"
                  initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: -180 }}
                  transition={{ duration: 0.3 }}
                >
                  <Brain className="h-6 w-6 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}

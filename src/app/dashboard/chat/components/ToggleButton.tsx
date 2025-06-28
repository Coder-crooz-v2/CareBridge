"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleMore, MessageSquare, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ToggleButtonProps {
  activeTab: string;
  toggleTab: () => void;
}

export default function ToggleButton({
  activeTab,
  toggleTab,
}: ToggleButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="absolute right-12 top-10 z-20 rounded-full flex items-center justify-center">
      {activeTab === "chat" ? (
        <div
          className=" hover:cursor-pointer flex rounded-full items-center overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={toggleTab}
          style={{
            background: "linear-gradient(145deg, #4361ee, #3a0ca3)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            boxShadow: "0 4px 12px rgba(59, 12, 163, 0.4)",
          }}
        >
          <Stethoscope className="h-6 w-6 mx-3 text-white my-3" />

          <AnimatePresence mode="wait" initial={false}>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  width: "105px",
                }}
                exit={{
                  opacity: 0,
                  width: 0,
                  transition: { duration: 0.3 },
                }}
                transition={{ duration: 0.3 }}
                className="rounded-full py-1"
              >
                <span className="text-white whitespace-nowrap">Knowledge</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div
          className="hover:cursor-pointer flex rounded-full items-center overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={toggleTab}
          style={{
            background: "linear-gradient(145deg, #4361ee, #3a0ca3)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            boxShadow: "0 4px 12px rgba(59, 12, 163, 0.4)",
          }}
        >
          <MessageCircleMore className="h-6 w-6 mx-3 text-white my-3" />

          <AnimatePresence mode="wait" initial={false}>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  width: "55px",
                }}
                exit={{
                  opacity: 0,
                  width: 0,
                  transition: { duration: 0.3 },
                }}
                transition={{ duration: 0.3 }}
                className="rounded-full py-1"
              >
                <span className="text-white whitespace-nowrap">Chat</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      <div className="h-full w-full absolute rounded-full bg-blue-600 -z-10 blur-xl"></div>
    </div>
  );
}

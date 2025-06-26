"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ToggleButton from "./components/ToggleButton";
import ChatComponent from "./components/ChatComponent";
import KnowledgeComponent from "./components/KnowledgeComponent";

export default function ChatInterface() {
  const [activeTab, setActiveTab] = useState("knowledge");

  const toggleTab = () => {
    setActiveTab(activeTab === "chat" ? "knowledge" : "chat");
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col h-full overflow-hidden">
        {/* Toggle Button */}
        <ToggleButton activeTab={activeTab} toggleTab={toggleTab} />

        <AnimatePresence mode="wait">
          {activeTab === "chat" ? (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="h-full"
            >
              <ChatComponent />
            </motion.div>
          ) : (
            <motion.div
              key="knowledge"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="h-full"
            >
              <KnowledgeComponent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Copy, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import copy from "copy-to-clipboard";

type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
};

export default function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hello! I'm your CareBridge AI assistant. How can I help you with your health concerns today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to copy text to clipboard with visual feedback
  const copyToClipboard = (text: string, messageId: string) => {
    copy(text);
    setCopiedMessageId(messageId);
    setTimeout(() => {
      setCopiedMessageId(null);
    }, 2000);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputValue),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // Handle form submission with Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Placeholder function to simulate AI responses with markdown formatting and structured sections
  const getAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes("headache") || lowerInput.includes("head pain")) {
      return `## Here's what may be happening:
- Your description matches a tension headache.

### Common lifestyle links:
- High stress at work
- Skipping meals
- Poor posture during gaming

### Try this first (self-care):
- 10-minute mindfulness video
- Alternate hot/cold compress on neck
- OTC pain reliever as per package directions

### How to prevent repeats:
- Schedule 5-min stretch breaks every hour (tap to set)
- Aim for 7–9 h sleep

### Red-flag signs to seek care: 
Double vision, uncontrolled vomiting, pain intensity ≥ 8/10.

*This information is educational; share any concerns with a licensed clinician.*`;
    } else if (
      lowerInput.includes("fever") ||
      lowerInput.includes("temperature")
    ) {
      return `## Here's what may be happening:
- Your symptoms suggest a possible viral infection.

### Common causes:
- Seasonal flu
- Common cold
- COVID-19 (consider testing)
- Reaction to vaccination

### Try this first:
- Rest and hydrate frequently
- Take acetaminophen or ibuprofen per package instructions
- Use lightweight clothing and bedding
- Monitor temperature every 4 hours

### When to seek medical attention:
- Temperature exceeds 103°F (39.4°C) 
- Fever lasts more than three days
- Difficulty breathing
- Extreme fatigue or confusion

*This information is educational; share any concerns with a licensed clinician.*`;
    } else if (
      lowerInput.includes("appointment") ||
      lowerInput.includes("schedule")
    ) {
      return `## Appointment Scheduling

### Information needed:
- Preferred date and time
- Type of specialist needed
- Insurance information
- Reason for visit (brief summary)

### Available options:
- Primary care: Next available in 2 days
- Specialists: Typically 1-2 week wait
- Virtual visits: Available same-day

### How to proceed:
- Use the Appointments tab in this app
- Call our scheduling line at 555-123-4567
- Message directly through patient portal

*Your appointment details will be confirmed via email and text message.*`;
    } else if (
      lowerInput.includes("medication") ||
      lowerInput.includes("prescription")
    ) {
      return `## Medication Information

### Important reminders:
- Always follow your doctor's specific instructions
- Take medications at consistent times
- Check for potential food or drug interactions
- Store in appropriate conditions (away from heat/moisture)

### Prescription refills:
- Request 5-7 days before running out
- Most refills available through patient portal
- Some medications require doctor appointment before refill

### Common medication questions:
- Side effects usually decrease after 1-2 weeks
- Generic alternatives may be available (ask your pharmacist)
- Many insurers have preferred medication lists

*For specific medication advice, please provide the name of the medication you're asking about.*`;
    } else if (lowerInput.includes("thank")) {
      return `## You're Welcome!

I'm here to help with any health questions you might have. Your well-being is our priority at CareBridge.

### How else can I assist you today?
- Medical information
- Appointment scheduling
- Medication guidance
- Wellness tips
- Finding specialists

Just let me know what you need.`;
    } else {
      return `## How Can I Help You?

Thank you for your message. To provide you with the most accurate information, could you please provide more details about your health concern?

### I can help with:
- Symptom assessment and guidance
- General health information
- Wellness recommendations
- Appointment scheduling
- Medication information
- Finding healthcare resources

### For the best assistance, please share:
- Specific symptoms you're experiencing
- How long you've had these symptoms
- Any treatments you've already tried
- Any relevant medical history

*I'm here to help with general medical information, appointment scheduling, and more.*`;
    }
  };

  // Custom components for markdown rendering
  const MarkdownComponents = {
    h2: ({ node, ...props }: any) => (
      <h2 className="text-xl font-bold text-blue-700 mt-4 mb-2" {...props} />
    ),
    h3: ({ node, ...props }: any) => (
      <h3
        className="text-lg font-semibold text-blue-600 mt-3 mb-1"
        {...props}
      />
    ),
    ul: ({ node, ...props }: any) => (
      <ul className="my-2 space-y-1" {...props} />
    ),
    li: ({ node, ...props }: any) => (
      <li className="ml-4 mb-1 list-disc" {...props} />
    ),
    p: ({ node, ...props }: any) => <p className="mb-2" {...props} />,
    em: ({ node, ...props }: any) => (
      <em className="italic text-gray-700" {...props} />
    ),
    strong: ({ node, ...props }: any) => (
      <strong className="font-bold" {...props} />
    ),
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-64px)] relative">
      {/* Decorative animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, 10, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-2xl"
          animate={{
            x: [0, -20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Messages container with fixed height */}
      <div className="flex-grow overflow-hidden relative z-10">
        <ScrollArea className="h-full w-full px-4">
          <div className="max-w-4xl mx-auto w-full pt-4 space-y-6 pb-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  duration: 0.5,
                  bounce: 0.3,
                }}
                className="mb-8"
              >
                {message.sender === "user" ? (
                  <div className="mb-2 flex justify-end">
                    <motion.div
                      className="text-blue-900 px-4 py-2 max-w-[85%] text-right"
                      whileHover={{
                        scale: 1.01,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <p className="font-medium text-lg">{message.content}</p>
                      <p className="text-xs mt-1 text-blue-500">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </motion.div>
                  </div>
                ) : (
                  <div className="relative bg-white/80 backdrop-blur-sm border border-blue-100 rounded-lg shadow-sm p-6 mb-4 max-w-[95%]">
                    <div className="absolute -top-2 -left-2 h-8 w-8 bg-blue-600 rounded-lg opacity-10"></div>
                    <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-blue-600 rounded-lg opacity-10"></div>

                    <AnimatePresence>
                      {copiedMessageId === message.id ? (
                        <motion.div
                          className="absolute top-3 right-3 bg-green-50 text-green-600 px-2 py-1 rounded-md text-xs font-medium flex items-center"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <CheckCheck className="h-3 w-3 mr-1" />
                          Copied!
                        </motion.div>
                      ) : (
                        <motion.button
                          className="absolute top-3 right-3 cursor-pointer bg-blue-50 p-2 rounded-full hover:bg-blue-100 text-blue-600"
                          whileHover={{ scale: 1.1, opacity: 1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            copyToClipboard(message.content, message.id)
                          }
                          title="Copy response"
                          initial={{ opacity: 0.7 }}
                        >
                          <Copy className="h-4 w-4" />
                        </motion.button>
                      )}
                    </AnimatePresence>

                    <div className="prose prose-blue max-w-none text-gray-800 text-base">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={MarkdownComponents}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>

                    <p className="text-xs mt-4 text-gray-500">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Fixed Input area with enhanced design */}
      <div className="p-6 pt-2 flex-shrink-0 bg-transparent">
        <div className="max-w-4xl mx-auto bg-transparent">
          <motion.div
            className="relative flex gap-3 items-center border-2 border-blue-300 rounded-lg p-2 px-4 bg-white shadow-md"
            initial={false}
            whileHover={{
              boxShadow: "0 4px 12px rgba(37, 99, 235, 0.15)",
              borderColor: "rgba(59, 130, 246, 0.8)",
              transition: { duration: 0.3 },
            }}
            animate={{
              boxShadow: isTyping
                ? [
                    "0 0 0 rgba(37, 99, 235, 0)",
                    "0 0 15px rgba(37, 99, 235, 0.3)",
                    "0 0 0 rgba(37, 99, 235, 0)",
                  ]
                : "0 2px 8px rgba(37, 99, 235, 0.1)",
            }}
            transition={{
              boxShadow: {
                duration: isTyping ? 1.5 : 0.2,
                repeat: isTyping ? Infinity : 0,
              },
            }}
          >
            {/* Pulsing dot animation when AI is typing */}
            {isTyping && (
              <motion.div
                className="absolute -top-10 left-0 flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-t-lg shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <motion.div
                  className="h-2 w-2 rounded-full bg-blue-600"
                  animate={{ scale: [0.5, 1, 0.5] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="h-2 w-2 rounded-full bg-blue-600"
                  animate={{ scale: [0.5, 1, 0.5] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "easeInOut",
                    delay: 0.2,
                  }}
                />
                <motion.div
                  className="h-2 w-2 rounded-full bg-blue-600"
                  animate={{ scale: [0.5, 1, 0.5] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "easeInOut",
                    delay: 0.4,
                  }}
                />
                <span className="text-xs text-blue-600 font-medium ml-1">
                  AI is analyzing your question...
                </span>
              </motion.div>
            )}

            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your health question here..."
              className="border-0 shadow-none focus-visible:ring-0 pr-3 py-4 text-base"
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 rounded-lg h-11 px-5 shadow-md font-medium flex items-center gap-1"
              >
                Ask <Send className="h-4 w-4 ml-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

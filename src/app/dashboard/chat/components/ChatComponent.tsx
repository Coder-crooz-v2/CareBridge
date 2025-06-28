"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Copy, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import copy from "copy-to-clipboard";
import axiosInstance from "@/lib/axios/axiosInstance";
import { AxiosError } from "axios";
import { toast } from "sonner";
import WelcomeCard from "./WelcomeCard";

// Types for the API response based on the prompt format
interface ContentSection {
  sectionType: string;
  content: string;
}

interface DiagnosisResponse {
  queryType: "Diagnosis";
  content: ContentSection[];
  suggestedFollowUps: string[];
  disclaimer: string;
}

interface GeneralResponse {
  queryType: "General";
  content: string;
  suggestedFollowUps: string[];
  disclaimer: string;
}

type AIResponse = DiagnosisResponse | GeneralResponse;

type LegacyFormat = {
  message: string;
  suggestedFollowUps: string[];
  disclaimer: string | null;
};

type AIErrorResponse =
  "Sorry, I couldn't process your request at the moment. Please try again later.";

type Message = {
  id: string;
  content:
    | string
    | {
        isJson: boolean;
        isError: boolean; // Optional for error responses
        data: AIResponse | LegacyFormat | AIErrorResponse;
      };
  sender: "user" | "ai";
  timestamp: Date;
};

const sectionColour: { [key: string]: string } = {
  "Possible Cause":
    "text-blue-900 border-blue-100 border-2 shadow-[0px_0px_12px_3px] shadow-blue-100 bg-blue-50/30",
  "Likely Triggers":
    "text-yellow-700 border-yellow-100 border-2 shadow-[0px_0px_12px_3px] shadow-yellow-100 bg-yellow-50/30",
  "What You Can Do Now":
    "text-green-800 border-green-100 border-2 shadow-[0px_0px_12px_3px] shadow-green-100 bg-green-50/30",
  "Prevention Tips":
    "text-fuchsia-800 border-fuchsia-100 border-2 shadow-[0px_0px_12px_3px] shadow-fuchsia-100 bg-fuchsia-50/30",
  "See a Doctor If":
    "text-red-800 border-red-100 border-2 shadow-[0px_0px_12px_3px] shadow-red-100 bg-red-50/30",
  others:
    "text-blue-900 border-blue-100 border-2 shadow-[0px_0px_12px_3px] shadow-blue-100 bg-blue-50/30",
};

export default function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showWelcomeCard, setShowWelcomeCard] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only auto-scroll when a new message is added
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  // Check scroll position to determine if we need the scroll button
  useEffect(() => {
    const checkScrollPosition = () => {
      const scrollableArea = document.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (!scrollableArea) return;

      const isAtBottom =
        Math.abs(
          scrollableArea.scrollHeight -
            scrollableArea.scrollTop -
            scrollableArea.clientHeight
        ) < 50;
      setShowScrollButton(!isAtBottom);
    };

    const scrollableArea = document.querySelector(
      "[data-radix-scroll-area-viewport]"
    );
    if (scrollableArea) {
      scrollableArea.addEventListener("scroll", checkScrollPosition);
      // Run check initially
      checkScrollPosition();
      return () =>
        scrollableArea.removeEventListener("scroll", checkScrollPosition);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to copy text to clipboard with visual feedback
  const copyToClipboard = (messageId: string) => {
    const message = messages.find((msg) => msg.id === messageId);
    if (message && typeof message.content !== "string") {
      if (message.content.isJson) {
        const mergedContent = (
          (message.content.data as AIResponse).content as ContentSection[]
        )
          .map((section) => `${section.sectionType}: ${section.content}`)
          .join("\n\n");
        copy(mergedContent);
      }
      if (!message.content.isError && !message.content.isJson) {
        const legacyContent = [
          (message.content.data as LegacyFormat).message,
          (message.content.data as LegacyFormat).disclaimer,
        ].join("\n\n");
        copy(legacyContent);
      }
    }
    setCopiedMessageId(messageId);
    setTimeout(() => {
      setCopiedMessageId(null);
    }, 2000);
  };

  const parseResponse = (
    content: string
  ): {
    isJson: boolean;
    isError: boolean;
    data: AIResponse | LegacyFormat | AIErrorResponse;
  } => {
    // Try to parse the response as JSON
    if (
      content ===
      "Sorry, I couldn't process your request at the moment. Please try again later."
    ) {
      return {
        isJson: false,
        isError: true,
        data: content as AIErrorResponse,
      };
    }
    try {
      const parsedResponse = JSON.parse(content) as AIResponse;

      // Check if it's a valid AIResponse format
      if (parsedResponse) {
        return {
          isJson: true,
          isError: false,
          data: parsedResponse,
        };
      }
    } catch (e) {
      // Not valid JSON, use legacy format parser
    }

    // Legacy format parsing
    if (
      content.includes("sorry") &&
      content.includes("can only help") &&
      content.includes("healthcare-related questions")
    ) {
      return {
        isJson: false,
        isError: false,
        data: {
          message: content,
          disclaimer: "",
          suggestedFollowUps: [],
        },
      };
    }
    console.log("Legacy format detected:", content);
    const generalMessage = content.split("\n\n");
    console.log("General message:", generalMessage);
    const suggestions = generalMessage
      .filter((mes) => mes.includes("Suggested"))[0]
      .split("\n")
      .filter((mes) => !mes.includes("Suggested"))
      .map((s) => s.substring(2));
    return {
      isJson: false,
      isError: false,
      data: {
        message: generalMessage[0].substring(15),
        disclaimer: generalMessage[1],
        suggestedFollowUps: suggestions,
      },
    };
  };

  const handleSendMessage = async (input: string) => {
    if (input.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue(""); // Clear input after sending
    setIsTyping(true);

    // Hide welcome card if it's still showing
    if (showWelcomeCard) {
      setShowWelcomeCard(false);
    }

    const aiContent = await getAIResponse(input);
    const parsedResponse = parseResponse(aiContent);

    console.log("Parsed AI Response:", parsedResponse);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(), // Ensure unique ID
      content: parsedResponse,
      sender: "ai",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsTyping(false);
  };

  // Handle form submission with Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  // Placeholder function to simulate AI responses with markdown formatting and structured sections
  const getAIResponse = async (userInput: string) => {
    try {
      const response = await axiosInstance.post("/chat-response", {
        userInput,
      });
      response.data.content.replace(/\n/g, "");
      return response.data.content;
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          `Error: ${error.response?.data?.message || "Failed to get response"}`
        );
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      return "Sorry, I couldn't process your request at the moment. Please try again later.";
    }
  };

  // Custom components for markdown rendering
  const MarkdownComponents = {
    h2: ({ node, ...props }: any) => (
      <h2 className="text-xl font-bold mt-4 mb-2" {...props} />
    ),
    h3: ({ node, ...props }: any) => (
      <h3 className="text-lg font-semibold mt-3 mb-1" {...props} />
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
            {/* Welcome card */}
            {showWelcomeCard && messages.length === 0 && (
              <WelcomeCard
                onMoodSelect={(mood) => {
                  setShowWelcomeCard(false);
                  handleSendMessage(`I'm feeling ${mood} today`);
                }}
                onQuestionSelect={(question) => {
                  setShowWelcomeCard(false);
                  handleSendMessage(question);
                }}
              />
            )}

            {messages.map((message, index) => (
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
                    <div className="text-blue-900 px-4 py-2 max-w-[85%] text-right">
                      <p className="font-medium text-lg text-left">
                        {message.content as string}
                      </p>
                      <p className="text-xs mt-1 text-blue-500">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ) : (
                  typeof message.content !== "string" && (
                    <div className="relative backdrop-blur-sm rounded-lg mb-4 flex flex-col gap-4">
                      {/* AI response content */}
                      {message.content.isJson &&
                        (
                          (message.content.data as AIResponse)
                            .content as ContentSection[]
                        ).map((section, idx) => (
                          <div
                            key={idx}
                            className={`${
                              sectionColour[section.sectionType]
                            } p-4 rounded-xl`}
                          >
                            <h3 className="font-semibold text-lg mb-2">
                              {section.sectionType}
                            </h3>
                            <ReactMarkdown
                              components={MarkdownComponents}
                              remarkPlugins={[remarkGfm]}
                            >
                              {typeof section.content === "string"
                                ? section.content
                                : section.content[0]}
                            </ReactMarkdown>
                          </div>
                        ))}
                      {!message.content.isJson &&
                        (message.content.isError ? (
                          <div className="p-4 text-red-800 bg-red-50 border border-red-200 rounded-lg">
                            <p className="font-semibold">
                              {typeof message.content.data}
                            </p>
                          </div>
                        ) : (
                          <div
                            className={`${sectionColour.others} p-4 rounded-lg`}
                          >
                            <ReactMarkdown
                              components={MarkdownComponents}
                              remarkPlugins={[remarkGfm]}
                            >
                              {(message.content.data as LegacyFormat).message}
                            </ReactMarkdown>
                            <ReactMarkdown
                              components={MarkdownComponents}
                              remarkPlugins={[remarkGfm]}
                            >
                              {
                                (message.content.data as LegacyFormat)
                                  .disclaimer
                              }
                            </ReactMarkdown>
                          </div>
                        ))}
                      {/* Timestamp and copy button */}
                      <div className="w-full flex items-center gap-3">
                        <p className="text-xs text-gray-500">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        {!message.content.isError && (
                          <AnimatePresence>
                            {copiedMessageId === message.id ? (
                              <motion.div
                                className="bg-green-50 text-green-600 px-2 py-1 rounded-md text-xs font-medium flex items-center"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                              >
                                <CheckCheck className="h-3 w-3 mr-1" />
                                Copied!
                              </motion.div>
                            ) : (
                              <motion.button
                                className="cursor-pointer px-2 py-1 text-blue-600"
                                whileHover={{ scale: 1.1, opacity: 1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => copyToClipboard(message.id)}
                                title="Copy response"
                                initial={{ opacity: 0.7 }}
                              >
                                <Copy className="h-4 w-4" />
                              </motion.button>
                            )}
                          </AnimatePresence>
                        )}
                      </div>

                      {message.content.isJson && (
                        <em className="text-gray-700">
                          {(message.content.data as AIResponse).disclaimer}
                        </em>
                      )}

                      {/* Suggested follow-ups */}
                      <div className="w-full flex gap-3 flex-wrap">
                        {/* New format suggestions */}
                        {(
                          message.content.data as AIResponse | LegacyFormat
                        ).suggestedFollowUps?.map((suggestion, idx) => (
                          <Button
                            onClick={() => handleSendMessage(suggestion)}
                            className="bg-blue-200 border-1 rounded-full hover:bg-blue-300 hover:cursor-pointer text-blue-900 hover:scale-[102%] transition-all duration-200"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>

                      {/* Disclaimer */}
                    </div>
                  )
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
              onChange={(e) => {
                setInputValue(e.target.value);
                if (showWelcomeCard && e.target.value.trim() !== "") {
                  setShowWelcomeCard(false);
                }
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type your health question here..."
              className="border-0 shadow-none focus-visible:ring-0 pr-3 py-4 text-base"
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => handleSendMessage(inputValue)}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 rounded-lg h-11 px-5 shadow-md font-medium flex items-center gap-1"
              >
                Ask <Send className="h-4 w-4 ml-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating down arrow button */}
      <AnimatePresence mode="wait" initial={false}>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10, transition: { duration: 0.1 } }}
            onClick={() => {
              scrollToBottom();
            }}
            className="fixed bottom-24 right-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-lg z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

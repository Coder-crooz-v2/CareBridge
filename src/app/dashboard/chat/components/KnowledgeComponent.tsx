"use client";

import { motion } from "framer-motion";
import {
  Stethoscope,
  Calendar,
  User,
  Clock,
  BookOpen,
  Brain,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function KnowledgeComponent() {
  // We'll define animations directly in the components to avoid TypeScript errors

  // Common symptoms list
  const commonSymptoms = [
    "Headache",
    "Fever",
    "Fatigue",
    "Nausea",
    "Dizziness",
    "Chest Pain",
    "Cough",
    "Shortness of breath",
  ];

  // Health tips list
  const healthTips = [
    "Stay hydrated: Drink 8 glasses of water daily",
    "Get 7-9 hours of sleep each night",
    "Exercise at least 30 minutes daily",
    "Maintain a balanced diet with fruits and vegetables",
    "Practice mindfulness or meditation",
  ];

  // Suggested topics
  const suggestedTopics = [
    "Sleep Health",
    "Mental Wellness",
    "Diet & Nutrition",
    "Exercise Tips",
    "Stress Management",
    "Common Medications",
    "First Aid",
  ];

  // Seasonal health items
  const seasonalHealthItems = [
    "Allergy Prevention",
    "Sun Protection",
    "Hydration Tips",
    "Heat Stress Prevention",
  ];

  // Personal health recommendations
  const personalHealthRecommendations = [
    "Blood Pressure Management",
    "Regular Exercise Routine",
    "Sleep Improvement",
    "Stress Reduction",
  ];

  // Quick resource items
  const quickResourceItems = [
    "Find a Specialist",
    "Medication Reminder",
    "Emergency Contacts",
    "Health Tracker",
  ];

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-64px)] overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-600/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-green-600/30 rounded-full blur-2xl" />

        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-purple-600/30 rounded-full blur-xl"
          animate={{
            y: [0, 20, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-24 h-24 bg-amber-600/30 rounded-full blur-xl"
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <ScrollArea className="h-full pr-4">
        <div className="px-4 py-6 space-y-6 relative z-10">
          {/* Top row with main categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Common Symptoms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className=""
            >
              <Card className="shadow-sm h-full border border-blue-100 overflow-hidden backdrop-blur-md bg-white/70">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 p-3">
                  <CardTitle className="text-blue-900 text-lg flex items-center gap-2">
                    <div className="bg-blue-500 p-1.5 rounded-full">
                      <Stethoscope className="h-4 w-4 text-white" />
                    </div>
                    Common Symptoms
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-2 relative overflow-hidden bg-gradient-to-br from-transparent via-blue-100/30 to-transparent backdrop-blur-sm">
                  {/* Hover effect burst animation container */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{
                        scale: 1.3,
                        opacity: 1,
                        transition: {
                          duration: 0.5,
                        },
                      }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center"
                    >
                      <motion.div
                        className="absolute h-full w-full"
                        initial={{ opacity: 0, scale: 0 }}
                        whileHover={{
                          opacity: 1,
                          scale: 1,
                          transition: { duration: 0.4 },
                        }}
                      >
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2 h-2 rounded-full origin-left"
                            style={{
                              background: `linear-gradient(90deg, rgb(96,165,250) 0%, rgba(59,130,246,0) 100%)`,
                              width: "40%",
                              rotate: `${i * 45}deg`,
                              transformOrigin: "left center",
                            }}
                            initial={{ scaleX: 0, opacity: 0 }}
                            whileHover={{
                              scaleX: 1,
                              opacity: [0, 0.7, 0],
                              transition: {
                                delay: i * 0.05,
                                duration: 0.6,
                                opacity: {
                                  times: [0, 0.4, 1],
                                },
                              },
                            }}
                            transition={{ duration: 0.35 }}
                          />
                        ))}
                      </motion.div>
                      <motion.div
                        className="absolute rounded-full bg-blue-500/20"
                        initial={{ width: 0, height: 0, opacity: 0 }}
                        whileHover={{
                          width: "150%",
                          height: "150%",
                          opacity: 0.1,
                          transition: { duration: 0.6 },
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Dynamic background patterns */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-blue-100/20 to-transparent" />
                  <div
                    className="absolute -right-4 top-0 w-32 h-32 text-blue-100/30"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                      backgroundRepeat: "repeat",
                    }}
                  />

                  {/* Two column layout for symptoms */}
                  <motion.div
                    className="grid grid-cols-2 gap-x-2 gap-y-1"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: { transition: { staggerChildren: 0.05 } },
                      hidden: {},
                    }}
                  >
                    {commonSymptoms.map((symptom, index) => (
                      <motion.div
                        key={symptom}
                        className="flex items-center gap-2 p-2 rounded-lg backdrop-blur-sm"
                        variants={{
                          visible: { opacity: 1, x: 0 },
                          hidden: { opacity: 0, x: -10 },
                        }}
                        whileHover={{
                          scale: 1.03,
                          y: -2,
                          backgroundColor: "rgba(255, 255, 255, 0.7)",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="h-3 w-3 rounded-full bg-blue-500 flex-shrink-0"></div>
                        <span className="text-sm font-medium">{symptom}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Health Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className=""
            >
              <Card className="shadow-sm h-full border border-green-100 overflow-hidden backdrop-blur-md bg-white/70">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 p-3">
                  <CardTitle className="text-green-900 text-lg flex items-center gap-2">
                    <div className="bg-green-500 p-1.5 rounded-full">
                      <BookOpen className="h-4 w-4 text-white" />
                    </div>
                    Health Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-2 relative overflow-hidden bg-gradient-to-br from-transparent via-green-200/30 to-transparent backdrop-blur-sm">
                  {/* Hover effect burst animation container */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{
                        scale: 1.3,
                        opacity: 1,
                        transition: {
                          duration: 0.5,
                          ease: [0.2, 0.65, 0.3, 0.9],
                        },
                      }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center"
                    >
                      {/* Multi-layered burst effect */}
                      <motion.div
                        className="absolute h-1/2 w-1/2 rounded-full"
                        style={{
                          background:
                            "radial-gradient(circle, rgb(34,197,94) 0%, rgba(22,163,74,0) 70%)",
                          filter: "blur(10px)",
                        }}
                        animate={{
                          scale: [0, 1.5, 1],
                          opacity: [0, 0.2, 0],
                        }}
                        transition={{
                          repeat: Infinity,
                          repeatType: "mirror",
                          duration: 3,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.div
                        className="absolute h-full w-full"
                        initial={{ opacity: 0, scale: 0 }}
                        whileHover={{
                          opacity: 1,
                          scale: 1,
                          transition: { duration: 0.4 },
                        }}
                      >
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2 h-2 rounded-full origin-left"
                            style={{
                              background: `linear-gradient(90deg, rgb(74,222,128) 0%, rgba(34,197,94,0) 100%)`,
                              width: "40%",
                              rotate: `${i * 45}deg`,
                              transformOrigin: "left center",
                            }}
                            initial={{ scaleX: 0, opacity: 0 }}
                            whileHover={{
                              scaleX: 1,
                              opacity: [0, 0.7, 0],
                              transition: {
                                delay: i * 0.05,
                                duration: 0.6,
                                opacity: {
                                  times: [0, 0.4, 1],
                                },
                              },
                            }}
                            transition={{ duration: 0.35 }}
                          />
                        ))}
                      </motion.div>
                      <motion.div
                        className="absolute rounded-full bg-green-500/20"
                        initial={{ width: 0, height: 0, opacity: 0 }}
                        whileHover={{
                          width: "150%",
                          height: "150%",
                          opacity: 0.1,
                          transition: { duration: 0.6 },
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Dynamic background patterns */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-green-100/20 to-transparent" />
                  <div
                    className="absolute -right-4 top-0 w-32 h-32 text-green-100/30"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                      backgroundRepeat: "repeat",
                    }}
                  />

                  <motion.div
                    className="space-y-1"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.1,
                        },
                      },
                      hidden: {},
                    }}
                  >
                    {healthTips.map((tip, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-2 p-2 rounded-lg backdrop-blur-sm"
                        variants={{
                          visible: { opacity: 1, x: 0 },
                          hidden: { opacity: 0, x: -10 },
                        }}
                        whileHover={{
                          scale: 1.03,
                          y: -2,
                          backgroundColor: "rgba(255, 255, 255, 0.7)",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="h-3 w-3 rounded-full bg-green-500 flex-shrink-0"></div>
                        <span className="text-sm font-medium">{tip}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Suggested Topics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            className=""
          >
            <Card className="shadow-sm border border-indigo-100 backdrop-blur-md bg-white/70">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-3 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-300/20 rounded-full blur-xl" />
                  <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-200/20 rounded-full blur-xl" />
                </div>
                <CardTitle className="text-indigo-900 text-lg flex items-center gap-2 relative z-10">
                  <div className="bg-indigo-500 p-1.5 rounded-full shadow-md shadow-indigo-200">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  Suggested Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="py-2 relative overflow-hidden bg-gradient-to-br from-transparent via-indigo-50/30 to-transparent backdrop-blur-md">
                {/* Background image for visual interest */}
                <div
                  className="absolute inset-0 opacity-10 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1000&auto=format&fit=crop')",
                  }}
                />

                {/* Hover effect burst animation container */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{
                      scale: 1.3,
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        ease: [0.2, 0.65, 0.3, 0.9],
                      },
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center"
                  >
                    {/* Multi-layered burst effect */}
                    <motion.div
                      className="absolute h-1/2 w-1/2 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, rgb(99,102,241) 0%, rgba(79,70,229,0) 70%)",
                        filter: "blur(10px)",
                      }}
                      animate={{
                        scale: [0, 1.5, 1],
                        opacity: [0, 0.2, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "mirror",
                        duration: 3,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute h-full w-full"
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.4 },
                      }}
                    >
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute top-1/2 left-1/2 h-2 rounded-full origin-left"
                          style={{
                            background: `linear-gradient(90deg, rgb(129,140,248) 0%, rgba(99,102,241,0) 100%)`,
                            width: "40%",
                            rotate: `${i * 30}deg`,
                            transformOrigin: "left center",
                          }}
                          initial={{ scaleX: 0, opacity: 0 }}
                          whileHover={{
                            scaleX: 1,
                            opacity: [0, 0.7, 0],
                            transition: {
                              delay: i * 0.03,
                              duration: 0.5,
                              opacity: {
                                times: [0, 0.4, 1],
                              },
                            },
                          }}
                          transition={{ duration: 0.35 }}
                        />
                      ))}
                    </motion.div>
                    <motion.div
                      className="absolute rounded-full bg-indigo-500/20"
                      initial={{ width: 0, height: 0, opacity: 0 }}
                      whileHover={{
                        width: "150%",
                        height: "150%",
                        opacity: 0.1,
                        transition: { duration: 0.6 },
                      }}
                    />
                  </motion.div>
                </div>

                {/* Dynamic background patterns */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-indigo-100/20 to-transparent" />
                <div
                  className="absolute -right-4 top-0 w-32 h-32"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236366f1' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
                    backgroundRepeat: "repeat",
                  }}
                />
                <motion.div
                  className="flex flex-wrap gap-2 relative z-10"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.3,
                      },
                    },
                    hidden: {},
                  }}
                >
                  {/* Floating decorative elements */}
                  <motion.div
                    className="absolute -left-6 -top-6 w-12 h-12 rounded-full bg-indigo-300/30 backdrop-blur-sm"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.5, 0.8, 0.5],
                      rotate: [0, 45, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute -right-3 bottom-0 w-8 h-8 rounded-full bg-blue-300/40 backdrop-blur-sm"
                    animate={{
                      y: [0, 10, 0],
                      opacity: [0.3, 0.7, 0.3],
                      rotate: [0, -30, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />

                  {suggestedTopics.map((topic) => (
                    <motion.div
                      key={topic}
                      variants={{
                        visible: { opacity: 1, scale: 1 },
                        hidden: { opacity: 0, scale: 0.8 },
                      }}
                      className="rounded-md overflow-hidden" // Added to ensure the background respects border radius
                      whileHover={{
                        scale: 1.1,
                        y: -2,
                        boxShadow: "0 4px 8px rgba(79, 70, 229, 0.3)",
                        transition: {
                          duration: 0.2,
                          type: "spring",
                          stiffness: 400,
                        },
                      }}
                      whileTap={{
                        scale: 0.95,
                        boxShadow: "0 0 0 rgba(79, 70, 229, 0)",
                      }}
                    >
                      <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 cursor-pointer px-3 py-1.5 text-sm relative overflow-hidden group rounded-md">
                        <span className="relative z-10">{topic}</span>
                        <motion.span
                          className="absolute inset-0 bg-indigo-200/80 opacity-0 group-hover:opacity-100 rounded-md"
                          initial={false}
                          whileHover={{
                            opacity: 1,
                            transition: { duration: 0.2 },
                          }}
                        />
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bottom row with three cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.4 },
              },
              hidden: {},
            }}
          >
            {/* Seasonal Health Card */}
            <motion.div
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 },
              }}
              whileHover={{ scale: 1.03, y: -5 }}
              className=""
            >
              <Card className="shadow-sm h-full border border-amber-100 backdrop-blur-md bg-white/70">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 p-4">
                  <CardTitle className="text-amber-900 text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-amber-700" />
                    Seasonal Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 relative overflow-hidden backdrop-blur-sm">
                  {/* Hover effect splash container */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 z-0"
                    initial={false}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    layoutId="splash-seasonal"
                  >
                    <div className="absolute -inset-2">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                        <motion.div
                          className="w-full h-full rounded-xl opacity-10"
                          style={{
                            background:
                              "radial-gradient(circle, rgba(245,158,11,0.5) 0%, rgba(217,119,6,0.3) 40%, rgba(254,243,199,0.1) 70%, transparent 100%)",
                            boxShadow:
                              "0 0 80px 15px rgba(245,158,11,0.5) inset",
                          }}
                          animate={{
                            scale: [0.8, 1.15, 1],
                          }}
                          transition={{
                            duration: 1,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>

                  <p className="text-sm text-gray-700 mb-2">
                    Current seasonal health concerns:
                  </p>
                  <div className="space-y-1">
                    {seasonalHealthItems.map((item) => (
                      <motion.div
                        key={item}
                        className="flex items-center gap-2 cursor-pointer hover:bg-amber-50 p-2 rounded transition-all"
                        whileHover={{
                          x: 3,
                          transition: { duration: 0.1 },
                        }}
                      >
                        <div className="h-3 w-3 rounded-full bg-amber-500 flex-shrink-0"></div>
                        <span className="text-sm font-medium">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* For You Card */}
            <motion.div
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 },
              }}
              whileHover={{ scale: 1.03, y: -5 }}
              className=""
            >
              <Card className="shadow-sm h-full border border-purple-100 backdrop-blur-md bg-white/70">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 p-4">
                  <CardTitle className="text-purple-900 text-lg flex items-center gap-2">
                    <User className="h-5 w-5 text-purple-700" />
                    For You
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 relative overflow-hidden backdrop-blur-sm">
                  {/* Hover effect splash container */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 z-0"
                    initial={false}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    layoutId="splash-personal"
                  >
                    <div className="absolute -inset-2">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                        <motion.div
                          className="w-full h-full rounded-xl opacity-10"
                          style={{
                            background:
                              "radial-gradient(circle, rgba(168,85,247,0.5) 0%, rgba(126,34,206,0.3) 40%, rgba(243,232,255,0.1) 70%, transparent 100%)",
                            boxShadow:
                              "0 0 80px 15px rgba(168,85,247,0.5) inset",
                          }}
                          animate={{
                            scale: [0.8, 1.15, 1],
                          }}
                          transition={{
                            duration: 1,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>

                  <p className="text-sm text-gray-700 mb-2">
                    Personalized health recommendations:
                  </p>
                  <div className="space-y-1">
                    {personalHealthRecommendations.map((item) => (
                      <motion.div
                        key={item}
                        className="flex items-center gap-2 cursor-pointer hover:bg-purple-50 p-2 rounded transition-all"
                        whileHover={{
                          x: 3,
                          transition: { duration: 0.1 },
                        }}
                      >
                        <div className="h-3 w-3 rounded-full bg-purple-500 flex-shrink-0"></div>
                        <span className="text-sm font-medium">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Resources Card */}
            <motion.div
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 },
              }}
              whileHover={{ scale: 1.03, y: -5 }}
              className=""
            >
              <Card className="shadow-sm h-full border border-blue-100 backdrop-blur-md bg-white/70">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 p-4">
                  <CardTitle className="text-blue-900 text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-700" />
                    Quick Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 relative overflow-hidden backdrop-blur-sm">
                  {/* Hover effect splash container */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 z-0"
                    initial={false}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    layoutId="splash-resources"
                  >
                    <div className="absolute -inset-2">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                        <motion.div
                          className="w-full h-full rounded-xl opacity-10"
                          style={{
                            background:
                              "radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(37,99,235,0.3) 40%, rgba(219,234,254,0.1) 70%, transparent 100%)",
                            boxShadow:
                              "0 0 80px 15px rgba(59,130,246,0.5) inset",
                          }}
                          animate={{
                            scale: [0.8, 1.15, 1],
                          }}
                          transition={{
                            duration: 1,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>

                  <p className="text-sm text-gray-700 mb-2">
                    Fast access to health resources:
                  </p>
                  <div className="space-y-1">
                    {quickResourceItems.map((item) => (
                      <motion.div
                        key={item}
                        className="flex items-center gap-2 cursor-pointer hover:bg-blue-50 p-2 rounded transition-all"
                        whileHover={{
                          x: 3,
                          transition: { duration: 0.1 },
                        }}
                      >
                        <div className="h-3 w-3 rounded-full bg-blue-500 flex-shrink-0"></div>
                        <span className="text-blue-700 underline font-medium">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </ScrollArea>
    </div>
  );
}

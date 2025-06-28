import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

// WelcomeCard Component for initial interaction
interface WelcomeCardProps {
  onMoodSelect: (mood: string) => void;
  onQuestionSelect: (question: string) => void;
}

export default function WelcomeCard({
  onMoodSelect,
  onQuestionSelect,
}: WelcomeCardProps) {
  const moods = [
    {
      text: "Good",
      emoji: "😊",
      color: "bg-green-100 border-green-300 hover:bg-green-200",
    },
    {
      text: "Energetic",
      emoji: "⚡",
      color: "bg-yellow-100 border-yellow-300 hover:bg-yellow-200",
    },
    {
      text: "Tired",
      emoji: "😴",
      color: "bg-blue-100 border-blue-300 hover:bg-blue-200",
    },
    {
      text: "Stressed",
      emoji: "😰",
      color: "bg-orange-100 border-orange-300 hover:bg-orange-200",
    },
    {
      text: "Sick",
      emoji: "🤒",
      color: "bg-red-100 border-red-300 hover:bg-red-200",
    },
  ];

  const commonQuestions = [
    "What are common cold remedies?",
    "How to relieve a headache naturally?",
    "What causes seasonal allergies?",
    "Tips for better sleep",
    "How to boost immunity?",
  ];

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto my-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-gradient-to-br from-white to-blue-50 border border-blue-200 shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          How are you feeling today?
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {moods.map((mood, index) => (
            <motion.button
              key={index}
              className={`px-4 py-3 rounded-xl w-28 hover:cursor-pointer text-center border ${mood.color} transition-all flex flex-col items-center`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onMoodSelect(mood.text)}
            >
              <span className="text-2xl mb-1">{mood.emoji}</span>
              <span className="font-medium">{mood.text}</span>
            </motion.button>
          ))}
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap justify-center gap-2">
            {commonQuestions.map((question, index) => (
              <motion.button
                key={index}
                className="bg-white border border-blue-300 hover:bg-blue-50 text-blue-700 px-3 py-2 rounded-full text-sm"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onQuestionSelect(question)}
              >
                {question}
              </motion.button>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

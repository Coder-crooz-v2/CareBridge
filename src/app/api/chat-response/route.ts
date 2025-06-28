import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { AxiosError } from "axios";
import { getChatbotPrompt } from "@/prompts/chatbot";

export async function POST(request: Request) {
  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY, // Changed from NEXT_PUBLIC_GROQ_API_KEY
    });

    const { userInput } = await request.json();

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: getChatbotPrompt(),
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: userInput,
            },
          ],
        },
      ],
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
    });

    return NextResponse.json({
      content: chatCompletion.choices[0]?.message?.content || "",
      model: chatCompletion.model,
    });
  } catch (error) {
    console.error("Error with Groq API:", error);
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error instanceof AxiosError ? error.message : error,
      },
      { status: 500 }
    );
  }
}

// Remove the main() call - not needed for API routes

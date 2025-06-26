import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { AxiosError } from "axios";

export async function POST(request: Request) {
  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY, // Changed from NEXT_PUBLIC_GROQ_API_KEY
    });

    const { messages } = await request.json();

    const chatCompletion = await groq.chat.completions.create({
      messages: messages || [
        {
          role: "user",
          content: "Explain the importance of fast language models",
        },
      ],
      model: "llama-3.3-70b-versatile",
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

import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
export const generateSummaryFromGemini = async (pdfText: string) => {
  try {
    const model = genAi.getGenerativeModel({
      model: "gemini-1.0-pro",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });
    const prompt = {
      contents: [
        {
          role: "user",
          parts: [
            { text: SUMMARY_SYSTEM_PROMPT },
            {
              text: `Transform this document into an engaging, easey-to-read summary with contextually relevant and proper markdown formatting:\n\n${pdfText}`,
            },
          ],
        },
      ],
    };

    const result = await model.generateContent(prompt);
    console.log(result);

    const response = await result.response;
    if (!response.text()) {
      throw new Error("Empty response from Gemini API");
    }
    return response.text();
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

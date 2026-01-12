import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSummaryFromOpenAi(pdfText: string) {
  try {
    // Optional: Truncate text if too long
    const maxLength = 100000; // Adjust based on model context
    const truncatedText =
      pdfText.length > maxLength
        ? pdfText.substring(0, maxLength) + "... [text truncated]"
        : pdfText;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // Or your preferred model
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that creates engaging summaries with emojis and markdown formatting.",
        },
        {
          role: "user",
          content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${truncatedText}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return response.choices[0].message.content;
  } catch (error: any) {
    if (error?.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    if (error?.status === 401) {
      throw new Error("Invalid API key. Please check your OPENAI_API_KEY.");
    }
    console.error("OpenAI API Error:", error);
    throw error;
  }
}

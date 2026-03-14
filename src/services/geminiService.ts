import { GoogleGenAI, Modality } from "@google/genai";
import { Emotion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function predictEmotionFromAudio(base64Audio: string, mimeType: string): Promise<{ emotion: Emotion; confidence: number }> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            {
              inlineData: {
                data: base64Audio,
                mimeType: mimeType
              }
            },
            {
              text: "Analyze the emotional tone of this speech. Return ONLY a JSON object with 'emotion' (one of: happy, angry, sad, neutral, fear, surprise) and 'confidence' (a number between 0 and 1)."
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json"
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      emotion: (result.emotion?.toLowerCase() as Emotion) || 'neutral',
      confidence: result.confidence || 0.5
    };
  } catch (error) {
    console.error("Prediction Error:", error);
    throw error;
  }
}

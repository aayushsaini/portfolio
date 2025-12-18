import { GoogleGenAI } from '@google/genai'
import { SYSTEM_INSTRUCTION } from '../constants'

const apiKey = process.env.API_KEY || ''

// Initialize client only if key exists to avoid runtime crashes on init
// We will check for key existence before making calls.
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null

/**
 * Sends a message to the Gemini AI model and retrieves the response.
 * 
 * @param {Array<{role: string, parts: Array<{text: string}>}>} history - The chat history.
 * @param {string} message - The current message to send.
 * @returns {Promise<string>} The response text from Gemini or an error message.
 */
export const sendMessageToGemini = async (history: { role: string, parts: { text: string }[] }[], message: string): Promise<string> => {
  if (!ai) {
    return "I'm currently offline (API Key missing). Please check back later."
  }

  try {
    // Construct the full prompt context
    // Since the SDK chat management is robust, we can also use a simple single-turn generation with history as context 
    // or use the Chat API. Let's use the Chat API for stateful conversation simulation if needed, 
    // but for this stateless service function, we'll create a new chat instance each time or pass history.

    // Better approach for this simplified app: Use chat.
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    })

    const result = await chat.sendMessage({ message })
    return result.text || "I didn't catch that. Could you rephrase?"
  } catch (error) {
    console.error("Gemini API Error:", error)
    return "I'm having a bit of trouble connecting to my neural network right now."
  }
}
import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: ReturnType<GoogleGenerativeAI['getGenerativeModel']>;

  constructor() {
    this.genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: import.meta.env.GEMINI_MODEL });
  }
  
  async generateResponse(prompt: string): Promise<string> {
    const result = await this.model.generateContent(prompt)
    return result.response.text();
  }
}

export const geminiService = new GeminiService();

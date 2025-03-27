import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config/env';

class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
  }
  
  async generateResponse(prompt: string): Promise<string> {
    const result = await this.model.generateContent(prompt)
    return result.response.text();
  }
}

export const geminiService = new GeminiService();

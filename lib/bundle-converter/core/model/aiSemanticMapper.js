/**
 * AI Semantic Mapper - Uses Gemini API for semantic section & complex widget classification
 */
import { GoogleGenerativeAI } from "@google/generative-ai";

export class AiSemanticMapper {
  constructor(apiKey = process.env.GEMINI_API_KEY) {
    this.apiKey = apiKey;
    this.genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
  }

  /**
   * Refines section classification using AI
   * @param {Object} nodeSummary 
   * @returns {Promise<string>}
   */
  async classifySectionWithAi(nodeSummary) {
    if (!this.genAI) return null;

    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Analyze this HTML component summary and classify it into one of: header, hero, services, features, testimonials, pricing, team, faq, cta, contact, footer, content. Return ONLY the category word.\n\nComponent summary: ${JSON.stringify(nodeSummary)}`;
      const result = await model.generateContent(prompt);
      const text = result.response.text().trim().toLowerCase();
      return text;
    } catch (e) {
      return null;
    }
  }
}

import { GoogleGenAI, Type, GenerateContentResponse, Content } from "@google/genai";
import { Part, ChartData } from '../types';
import { SYSTEM_INSTRUCTION } from './systemPrompt';

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable not set. Please check your .env file.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = ai.models;

const chartSchema = {
  type: Type.OBJECT,
  properties: {
    chartType: { type: Type.STRING, enum: ['bar', 'line', 'pie'], description: 'Type of chart to display.' },
    title: { type: Type.STRING, description: 'Title of the chart.' },
    data: {
      type: Type.ARRAY,
      description: 'Data points for the chart.',
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: 'Label for the data point (e.g., month, category).' },
          value: { type: Type.NUMBER, description: 'Value for the data point.' },
        },
        required: ['name', 'value'],
      },
    },
    dataKey: { type: Type.STRING, description: 'The key in the data object that represents the value.' },
    nameKey: { type: Type.STRING, description: 'The key in the data object that represents the name/label.' },
  },
  required: ['chartType', 'title', 'data', 'dataKey', 'nameKey'],
};

const fileToPart = async (file: File): Promise<Part> => {
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
  return {
    inlineData: {
      mimeType: file.type,
      data: base64,
    },
  };
};

export const generateResponse = async (
  prompt: string,
  history: Content[],
  files: File[]
): Promise<{ text: string, chartData?: ChartData, chartSuggestion?: string }> => {
  try {
    const fileParts = await Promise.all(files.map(fileToPart));
    const fullPrompt = {
      role: 'user',
      parts: [{ text: prompt }, ...fileParts],
    };

    const isChartRequest = /chart|graph|diagram|visual|plot/i.test(prompt);

    if (isChartRequest) {
      try {
        const result: GenerateContentResponse = await model.generateContent({
          model: 'gemini-2.5-flash',
          contents: [...history, fullPrompt],
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
            responseSchema: chartSchema,
          },
        });
        
        const jsonText = result.text.trim();
        const chartData = JSON.parse(jsonText) as ChartData;
        
        return { 
          text: `Here is the visualization you requested: ${chartData.title}`, 
          chartData 
        };

      } catch (e) {
        // Fallback to text if JSON generation fails
        console.warn("Chart generation failed, falling back to text.", e);
      }
    }

    // Standard text generation
    const result = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: [...history, fullPrompt],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    
    let text = result.text.trim();
    let chartSuggestion: string | undefined = undefined;
    const suggestionRegex = /CHART_SUGGESTION:\s*(.*)/im;
    const match = text.match(suggestionRegex);

    if (match && match[1]) {
        chartSuggestion = match[1].trim();
        text = text.replace(suggestionRegex, '').trim();
    }
    
    return { text, chartSuggestion };
  } catch (error) {
    console.error("Error generating response:", error);
    return { text: "Sorry, I encountered an error. Please try again." };
  }
};
import { GoogleGenAI, Type, GenerateContentResponse, Content } from "@google/genai";
import { Part, ChartData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = ai.models;

const SYSTEM_INSTRUCTION = `You are 'FinBot', an advanced AI financial analyst for a payment and finance team. Your primary function is to provide insights from automated reports and user-uploaded documents.
**Core Capabilities:**
1.  **Automated Reporting:** You have real-time access to automatically generated daily, weekly, and monthly financial reports. These reports are compiled from various data sources, including a connected Google Drive folder.
2.  **Natural Language Queries:** You can answer complex questions about the data contained in these reports.
3.  **Data Visualization:** When a user asks for a chart, diagram, graph, or any visual representation, you MUST respond with ONLY a valid JSON object conforming to the provided schema. Do not include any other text or markdown.
4.  **File Analysis:** You can analyze data from uploaded files (PDF, DOCX, XLSX, CSV).

**Simulated Data Access:** To fulfill requests, act as if you have access to the following reports from Google Drive:
-   \`daily_transactions_YYYY-MM-DD.csv\`: (TransactionID, Timestamp, Amount, Currency, Status, PaymentMethod)
-   \`weekly_revenue_summary_YYYY-W##.pdf\`: A summary document with key revenue metrics.
-   \`monthly_expense_report_YYYY-MM.xlsx\`: (Date, Category, Vendor, Amount, ApprovedBy)
-   \`quarterly_profit_loss.docx\`: A narrative report on P&L.

For all non-visual queries, provide clear, concise, and helpful answers in Markdown format.
**Chart Suggestions:** After providing a text-based analysis or summary, if a relevant visualization is possible, you MUST suggest it on a new line using the format: \`CHART_SUGGESTION: [A concise, user-friendly prompt to generate the chart, e.g., 'Chart the monthly expenses by category']\`. Do not add any other text to this line.`;

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
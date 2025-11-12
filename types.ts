export interface ChartData {
  chartType: 'bar' | 'line' | 'pie';
  data: Record<string, string | number>[];
  dataKey: string;
  nameKey: string;
  title: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  chart?: ChartData;
  chartSuggestion?: string;
}

export interface Part {
  inlineData?: {
    mimeType: string;
    data: string;
  };
  text?: string;
}
import React, { useState, useCallback } from 'react';
import ChatInterface from './components/ChatInterface';
import ChatHistoryPanel from './components/ChatHistoryPanel';
import VisualizationPanel from './components/VisualizationPanel';
import { Bot } from 'lucide-react';
import { Message, ChartData } from './types';
import { generateResponse } from './services/geminiService';
import { Content } from '@google/genai';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      sender: 'ai',
      text: "Hello! I am FinBot, your AI financial analyst. I have access to your team's latest daily, weekly, and monthly reports from Google Drive. How can I help you today? You can ask a question, upload a file, or try one of the suggestions below.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeChart, setActiveChart] = useState<ChartData | null>(null);

  const handleNewChat = () => {
    setMessages([
      {
        id: 'init',
        sender: 'ai',
        text: "Hello! I am FinBot, your AI financial analyst. I have access to your team's latest daily, weekly, and monthly reports from Google Drive. How can I help you today? You can ask a question, upload a file, or try one of the suggestions below.",
      },
    ]);
    setActiveChart(null);
  };

  const handleSendMessage = useCallback(async (prompt: string, files: File[]) => {
    if (!prompt.trim() && files.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const history: Content[] = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
    }));

    const { text: aiText, chartData, chartSuggestion } = await generateResponse(prompt, history, files);

    const aiMessage: Message = {
      id: Date.now().toString() + 'ai',
      sender: 'ai',
      text: aiText,
      chart: chartData,
      chartSuggestion: chartSuggestion,
    };
    
    setMessages((prev) => [...prev, aiMessage]);
    if (chartData) {
      setActiveChart(chartData);
    }
    setIsLoading(false);
  }, [messages]);

  return (
    <div className="flex h-screen font-sans bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <ChatHistoryPanel onNewChat={handleNewChat} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex items-center border-b border-gray-200 dark:border-gray-700 z-10">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
            <Bot className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">FinBot AI Analyst</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Your intelligent financial reporting assistant</p>
          </div>
        </header>
        <main className="flex-1 overflow-hidden">
          <ChatInterface 
            messages={messages}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
          />
        </main>
      </div>
      {activeChart && (
        <VisualizationPanel 
          chart={activeChart}
          onClose={() => setActiveChart(null)}
        />
      )}
    </div>
  );
};

export default App;

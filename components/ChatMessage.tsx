import React from 'react';
import { Message } from '../types';
import { User, BrainCircuit, BarChartHorizontalBig } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  onVisualizeClick: (prompt: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onVisualizeClick }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? 'bg-blue-500' : 'bg-indigo-500'
        }`}
      >
        {isUser ? <User className="w-5 h-5 text-white" /> : <BrainCircuit className="w-5 h-5 text-white" />}
      </div>
      <div
        className={`max-w-xl p-3 rounded-lg shadow-sm ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
        
        {message.chartSuggestion && !message.chart && (
            <div className="mt-3">
                <button
                    onClick={() => onVisualizeClick(message.chartSuggestion!)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200 text-sm font-medium rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-900 transition-colors"
                >
                    <BarChartHorizontalBig size={16} />
                    Visualize Data
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;

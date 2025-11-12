import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, SendHorizonal, FileText, X, BrainCircuit } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { Message } from '../types';

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (prompt: string, files: File[]) => Promise<void>;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, isLoading, onSendMessage }) => {
  const [input, setInput] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  const suggestions = [
      "Summarize today's transaction report",
      "Show me a chart of weekly revenue",
      "What were the top 5 expenses last month?",
      "Compare Q1 revenue to Q4 of last year",
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(event.target.files!)]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };
  
  const handleSuggestionClick = (suggestion: string) => {
      setInput(suggestion);
      inputRef.current?.focus();
  };

  const handleSendMessageWrapper = async (promptOverride?: string) => {
    const messageToSend = typeof promptOverride === 'string' ? promptOverride : input;
    const filesForRequest = typeof promptOverride === 'string' ? [] : files;

    if (!messageToSend.trim() && filesForRequest.length === 0) return;
    
    // Call the parent sender function
    await onSendMessage(messageToSend, filesForRequest);

    // Clear local input state after sending
    if (typeof promptOverride !== 'string') {
      setInput('');
      setFiles([]);
    }
  };


  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800/50">
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} onVisualizeClick={(prompt) => handleSendMessageWrapper(prompt)}/>
          ))}
          {isLoading && (
             <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white dark:bg-gray-700 p-3 rounded-lg rounded-tl-none shadow-sm flex items-center space-x-2">
                <span className="font-medium">FinBot is thinking</span>
                <div className="flex space-x-1">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {!isLoading && messages.length <= 2 && (
          <div className="px-4 pb-2 border-t border-gray-200 dark:border-gray-700 pt-4">
              <h4 className="text-sm font-semibold mb-3 text-gray-500 dark:text-gray-400">Suggestions:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {suggestions.map((s) => (
                      <button 
                        key={s} 
                        onClick={() => handleSuggestionClick(s)}
                        className="text-left p-2.5 bg-white dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-indigo-700 dark:text-indigo-300 shadow-sm"
                      >
                        {s}
                      </button>
                  ))}
              </div>
          </div>
      )}
      
      {files.length > 0 && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold mb-2">Attachments:</h4>
          <div className="flex flex-wrap gap-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 text-sm font-medium px-2 py-1 rounded-full">
                <FileText size={14} className="mr-1" />
                <span>{file.name}</span>
                <button onClick={() => removeFile(index)} className="ml-2 text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-100">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessageWrapper()}
            placeholder="Ask about your reports or upload a file..."
            className="w-full pl-12 pr-12 py-3 rounded-full bg-gray-100 dark:bg-gray-700 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            disabled={isLoading}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            <Paperclip size={20} />
          </button>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => handleSendMessageWrapper()}
            disabled={isLoading || (!input.trim() && files.length === 0)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed transition"
          >
            <SendHorizonal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

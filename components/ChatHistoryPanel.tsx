import React from 'react';
import { Plus, MessageSquare } from 'lucide-react';

interface ChatHistoryPanelProps {
  onNewChat: () => void;
}

const ChatHistoryPanel: React.FC<ChatHistoryPanelProps> = ({ onNewChat }) => {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col p-4">
      <button
        onClick={onNewChat}
        className="flex items-center justify-center w-full px-4 py-2 mb-4 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
      >
        <Plus size={16} className="mr-2" />
        New Chat
      </button>
      <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
        Chat History
      </h2>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* For now, this is a placeholder. In a real app, you'd map over chat sessions. */}
        <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50">
          <a href="#" className="flex items-center text-sm font-medium text-indigo-800 dark:text-indigo-200">
            <MessageSquare size={16} className="mr-2 flex-shrink-0" />
            <span className="truncate">Current Financial Analysis</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChatHistoryPanel;

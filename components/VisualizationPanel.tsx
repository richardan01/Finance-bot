import React from 'react';
import { X, BarChart2 } from 'lucide-react';
import ChartRenderer from './ChartRenderer';
import { ChartData } from '../types';

interface VisualizationPanelProps {
  chart: ChartData | null;
  onClose: () => void;
}

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({ chart, onClose }) => {
  return (
    <aside className="w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
          <BarChart2 size={20} className="mr-2 text-indigo-500" />
          Visualization
        </h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Close visualization panel"
        >
          <X size={20} />
        </button>
      </div>
      <div className="flex-1 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-2 overflow-hidden">
        {chart ? (
          <ChartRenderer chartData={chart} />
        ) : (
          <div className="flex items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
            <p>Your generated charts will appear here.</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default VisualizationPanel;

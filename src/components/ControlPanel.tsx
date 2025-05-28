import React from 'react';
import { Play, RotateCcw } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { ExecutionStatus } from '../types';

interface ControlPanelProps {
  selectedLanguage: string;
  onLanguageSelect: (languageId: string) => void;
  onRun: () => void;
  onReset: () => void;
  status: ExecutionStatus;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  selectedLanguage,
  onLanguageSelect,
  onRun,
  onReset,
  status,
}) => {
  const isRunning = status === 'running';
  
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex items-center space-x-2">
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onSelect={onLanguageSelect}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={onReset}
          disabled={isRunning}
          className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Reset"
          title="Reset terminal"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
        
        <button
          onClick={onRun}
          disabled={isRunning}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 ${
            isRunning
              ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
        >
          <Play className="h-4 w-4" />
          <span>{isRunning ? 'Running...' : 'Run'}</span>
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
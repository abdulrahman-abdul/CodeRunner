import React, { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Terminal from './Terminal';
import ControlPanel from './ControlPanel';
import Resizer from './Resizer';
import { useTheme } from '../context/ThemeContext';
import { useCodeExecution } from '../hooks/useCodeExecution';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../constants/languages';
import { DEFAULT_CODE_SNIPPETS } from '../constants/snippets';

const CodeContainer: React.FC = () => {
  const { theme } = useTheme();
  const [editorPercentage, setEditorPercentage] = useState(60);
  const [selectedLanguage, setSelectedLanguage] = useState(DEFAULT_LANGUAGE.id);
  const [code, setCode] = useState(DEFAULT_CODE_SNIPPETS[DEFAULT_LANGUAGE.id]);
  const { result, executeCode, resetExecution } = useCodeExecution();

  // Update code when language changes
  useEffect(() => {
    setCode(DEFAULT_CODE_SNIPPETS[selectedLanguage] || '');
  }, [selectedLanguage]);

  const handleLanguageChange = (languageId: string) => {
    setSelectedLanguage(languageId);
  };

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const handleRunCode = () => {
    // Get the language object from the ID
    const language = SUPPORTED_LANGUAGES.find(lang => lang.id === selectedLanguage);
    if (!language) return;
    
    executeCode(code, language.name);
  };

  const handleReset = () => {
    resetExecution();
  };

  const handleResize = (percentage: number) => {
    setEditorPercentage(percentage);
  };

  const getLanguageFromId = (id: string) => {
    return SUPPORTED_LANGUAGES.find(lang => lang.id === id)?.monacoLanguage || 'javascript';
  };

  return (
    <div 
      id="code-container"
      className="flex flex-col h-full bg-white dark:bg-gray-900 transition-colors duration-200"
    >
      <ControlPanel
        selectedLanguage={selectedLanguage}
        onLanguageSelect={handleLanguageChange}
        onRun={handleRunCode}
        onReset={handleReset}
        status={result.status}
      />
      
      <div className="flex-1 overflow-hidden flex flex-col">
        <div 
          style={{ height: `${editorPercentage}%` }}
          className="transition-height duration-200 ease-in-out p-4"
        >
          <CodeEditor
            code={code}
            language={getLanguageFromId(selectedLanguage)}
            onChange={handleCodeChange}
            theme={theme}
          />
        </div>
        
        <Resizer onResize={handleResize} />
        
        <div 
          style={{ height: `${100 - editorPercentage}%` }}
          className="transition-height duration-200 ease-in-out p-4"
        >
          <Terminal
            output={result.output}
            status={result.status}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeContainer;
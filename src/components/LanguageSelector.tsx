import React from 'react';
import { SUPPORTED_LANGUAGES } from '../constants/languages';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onSelect: (languageId: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  selectedLanguage, 
  onSelect 
}) => {
  return (
    <div className="relative">
      <select
        value={selectedLanguage}
        onChange={(e) => onSelect(e.target.value)}
        className="block w-full rounded-md border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200 appearance-none pr-8 border border-gray-300 dark:border-gray-600"
        aria-label="Select programming language"
      >
        {SUPPORTED_LANGUAGES.map((language) => (
          <option key={language.id} value={language.id}>
            {language.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSelector;
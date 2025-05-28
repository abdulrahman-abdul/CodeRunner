import React from 'react';
import Header from './components/Header';
import CodeContainer from './components/CodeContainer';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Header />
        <main className="flex-1 overflow-hidden">
          <CodeContainer />
        </main>
        <footer className="py-3 px-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <p>CodeRunner &copy; {new Date().getFullYear()} - Powered by Docker and Monaco Editor</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
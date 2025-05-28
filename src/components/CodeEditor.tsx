import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';
import { ThemeType } from '../types';

interface CodeEditorProps {
  code: string;
  language: string;
  onChange: (value: string | undefined) => void;
  theme: ThemeType;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, language, onChange, theme }) => {
  const editorRef = useRef<any>(null);
  
  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    // Focus the editor when it mounts
    editor.focus();
  };

  const monacoTheme = theme === 'dark' ? 'vs-dark' : 'vs';

  return (
    <div className="h-full w-full overflow-hidden rounded-md shadow-code">
      <Editor
        height="100%"
        width="100%"
        language={language}
        value={code}
        theme={monacoTheme}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
          },
        }}
        className="rounded-md"
      />
    </div>
  );
};

export default CodeEditor;
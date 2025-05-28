export type Language = {
  id: string;
  name: string;
  extension: string;
  monacoLanguage: string;
};

export type ThemeType = 'light' | 'dark';

export type ExecutionStatus = 'idle' | 'running' | 'success' | 'error';

export type ExecutionResult = {
  status: ExecutionStatus;
  output: string;
};
import { Language } from '../types';

export const SUPPORTED_LANGUAGES: Language[] = [
  {
    id: 'javascript',
    name: 'JavaScript',
    extension: 'js',
    monacoLanguage: 'javascript',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    extension: 'ts',
    monacoLanguage: 'typescript',
  },
  {
    id: 'python',
    name: 'Python',
    extension: 'py',
    monacoLanguage: 'python',
  },
  {
    id: 'java',
    name: 'Java',
    extension: 'java',
    monacoLanguage: 'java',
  },
  {
    id: 'go',
    name: 'Go',
    extension: 'go',
    monacoLanguage: 'go',
  },
  {
    id: 'rust',
    name: 'Rust',
    extension: 'rs',
    monacoLanguage: 'rust',
  },
];

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES[0];
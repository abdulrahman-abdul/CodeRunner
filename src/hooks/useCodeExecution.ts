import { useState, useCallback } from 'react';
import { ExecutionResult, ExecutionStatus } from '../types';

// This is a mock implementation since we don't have a real backend
// In a real app, this would connect to your backend service
export const useCodeExecution = () => {
  const [result, setResult] = useState<ExecutionResult>({
    status: 'idle',
    output: '',
  });

  const executeCode = useCallback(async (code: string, language: string) => {
    // Set status to running
    setResult({
      status: 'running',
      output: 'Connecting to execution service...\n',
    });

    // Simulate a delay and progressive output
    const updateOutput = (newOutput: string) => {
      setResult(prev => ({
        ...prev,
        output: prev.output + newOutput,
      }));
    };

    // Mock execution - in a real app, this would send the code to a backend
    try {
      // Simulate connection
      await new Promise(resolve => setTimeout(resolve, 500));
      updateOutput('Connected to execution service\n');
      
      // Simulate setup
      await new Promise(resolve => setTimeout(resolve, 700));
      updateOutput(`Setting up ${language} environment...\n`);
      
      // Simulate Docker pulling
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateOutput('Pulling Docker image...\n');
      
      // Simulate Docker container starting
      await new Promise(resolve => setTimeout(resolve, 800));
      updateOutput('Starting container...\n');
      
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 1500));
      updateOutput('Executing code...\n\n');
      
      // Simulate output based on language
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock output based on the code
      let output;
      if (code.includes('console.log') || code.includes('print')) {
        output = 'Hello, World!\nFactorial of 5: 120\n';
      } else if (code.includes('error') || code.includes('throw')) {
        throw new Error('Execution failed: Runtime error');
      } else {
        output = 'Program executed successfully with no output\n';
      }
      
      updateOutput(output);
      
      // Simulate container cleanup
      await new Promise(resolve => setTimeout(resolve, 800));
      updateOutput('\nStopping container...\n');
      
      // Set final success status
      await new Promise(resolve => setTimeout(resolve, 500));
      setResult(prev => ({
        status: 'success',
        output: prev.output + 'Execution completed successfully!\n',
      }));
      
    } catch (error) {
      // Handle errors
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setResult(prev => ({
        status: 'error',
        output: prev.output + `\nError: ${errorMessage}\n`,
      }));
    }
  }, []);

  const resetExecution = useCallback(() => {
    setResult({
      status: 'idle',
      output: '',
    });
  }, []);

  return {
    result,
    executeCode,
    resetExecution,
  };
};
import React, { useEffect, useRef, useState } from 'react';
import { Terminal as XTerminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { ExecutionStatus } from '../types';

interface TerminalProps {
  output: string;
  status: ExecutionStatus;
}

const Terminal: React.FC<TerminalProps> = ({ output, status }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const [isTerminalReady, setIsTerminalReady] = useState(false);

  // Initialize terminal
  useEffect(() => {
    let mounted = true;

    const initializeTerminal = () => {
      if (!terminalRef.current || !mounted) return;

      // Clean up any previous terminal
      if (xtermRef.current) {
        xtermRef.current.dispose();
      }

      try {
        // Create new terminal instance
        const terminal = new XTerminal({
          cursorBlink: true,
          theme: {
            background: '#1e1e1e',
            foreground: '#f8f8f8',
          },
          fontSize: 14,
          fontFamily: 'monospace',
          scrollback: 1000,
          convertEol: true,
        });

        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);

        // Ensure the terminal element is visible and has dimensions
        const terminalElement = terminalRef.current;
        if (terminalElement.offsetWidth === 0 || terminalElement.offsetHeight === 0) {
          return;
        }

        terminal.open(terminalElement);
        
        // Wait for next frame to ensure terminal is properly rendered
        requestAnimationFrame(() => {
          if (mounted) {
            fitAddon.fit();
            setIsTerminalReady(true);
          }
        });

        xtermRef.current = terminal;
        fitAddonRef.current = fitAddon;
      } catch (error) {
        console.error('Failed to initialize terminal:', error);
      }
    };

    // Initialize with a slight delay to ensure DOM is ready
    setTimeout(initializeTerminal, 100);

    // Handle window resize with debouncing
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (fitAddonRef.current && xtermRef.current && mounted) {
          try {
            fitAddonRef.current.fit();
          } catch (error) {
            console.error('Failed to fit terminal:', error);
          }
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      mounted = false;
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      if (xtermRef.current) {
        try {
          xtermRef.current.dispose();
        } catch (error) {
          console.error('Failed to dispose terminal:', error);
        }
      }
    };
  }, []);

  // Update terminal output when it changes
  useEffect(() => {
    if (!isTerminalReady || !xtermRef.current) return;

    try {
      // Clear terminal
      xtermRef.current.clear();
      
      // Write output
      if (output) {
        // Color coding based on status
        let formattedOutput = output;
        if (status === 'error') {
          // Add ANSI color codes for error text (red)
          formattedOutput = formattedOutput.replace(
            /Error:.*$/gm, 
            '\x1b[31m$&\x1b[0m'
          );
        } else if (status === 'success') {
          // Add ANSI color codes for success text (green)
          formattedOutput = formattedOutput.replace(
            /Execution completed successfully!/, 
            '\x1b[32m$&\x1b[0m'
          );
        }
        
        xtermRef.current.write(formattedOutput);
      }
      
      // Fit the terminal after writing output
      if (fitAddonRef.current) {
        requestAnimationFrame(() => {
          if (fitAddonRef.current && xtermRef.current) {
            try {
              fitAddonRef.current.fit();
            } catch (error) {
              console.error('Failed to fit terminal after output:', error);
            }
          }
        });
      }
    } catch (error) {
      console.error('Failed to update terminal output:', error);
    }
  }, [output, status, isTerminalReady]);

  return (
    <div className="h-full w-full rounded-md overflow-hidden bg-terminal-background shadow-code">
      <div className="h-full w-full" ref={terminalRef} />
    </div>
  );
};

export default Terminal;
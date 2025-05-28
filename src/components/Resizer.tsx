import React, { useState, useEffect, useCallback } from 'react';

interface ResizerProps {
  onResize: (editorPercentage: number) => void;
  initialPercentage?: number;
}

const Resizer: React.FC<ResizerProps> = ({ 
  onResize, 
  initialPercentage = 50 
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const container = document.getElementById('code-container');
      if (!container) return;

      const { top, height } = container.getBoundingClientRect();
      const y = e.clientY - top;
      const percentage = Math.min(Math.max((y / height) * 100, 20), 80);

      onResize(percentage);
    },
    [isDragging, onResize]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      className={`h-2 w-full bg-gray-200 dark:bg-gray-700 cursor-row-resize transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-gray-600 ${
        isDragging ? 'bg-primary-400 dark:bg-primary-600' : ''
      }`}
      onMouseDown={handleMouseDown}
    />
  );
};

export default Resizer;
import React from 'react';
import { Theme } from '../../hooks/useTheme';

interface LoadingOverlayProps {
  theme: Theme;
  isLoading: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  theme, 
  isLoading,
  message = 'Loading...' 
}) => {
  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center"
      aria-live="assertive"
      role="alert"
      aria-busy={isLoading}
    >
      <div className={`${theme.cardBg} p-8 rounded-lg shadow-xl max-w-sm w-full flex flex-col items-center`}>
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-blue-500"></div>
        </div>
        <p className={`text-center ${theme.text} font-medium`}>{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
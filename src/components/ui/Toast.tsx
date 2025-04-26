import React, { useEffect, useState } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { Theme } from '../../hooks/useTheme';

interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  onClose: (id: string) => void;
  duration?: number;
  theme: Theme;
}

const Toast: React.FC<ToastProps> = ({ id, type, message, onClose, duration = 4000, theme }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 10);

    // Auto-dismiss toast if duration is provided
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(id), 300); // Wait for exit animation to complete
  };

  // Define styles based on notification type
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 dark:bg-green-900 border-green-500';
      case 'error':
        return 'bg-red-100 dark:bg-red-900 border-red-500 font-semibold';
      case 'warning':
        return 'bg-yellow-100 dark:bg-yellow-900 border-yellow-500';
      case 'info':
      default:
        return 'bg-blue-100 dark:bg-blue-900 border-blue-500';
    }
  };

  // Get icon based on notification type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500 dark:text-green-400" />;
      case 'error':
        return <AlertCircle className="text-red-500 dark:text-red-400 w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500 dark:text-yellow-400" />;
      case 'info':
      default:
        return <Info className="text-blue-500 dark:text-blue-400" />;
    }
  };

  return (
    <div
      className={`
        fixed flex items-center shadow-lg transition-all duration-300
        ${getTypeStyles()}
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}
        ${type === 'error' 
          ? 'z-[100] py-2 px-4 rounded-md border-l-4 w-[600px] min-h-[40px]' 
          : 'z-50 p-4 mb-4 rounded-lg border-l-4'}
      `}
      role="alert"
      aria-live="assertive"
      style={{
        position: 'fixed',
        [type === 'error' ? 'top' : 'bottom']: '1rem',
        [type === 'error' ? 'left' : 'right']: type === 'error' ? '50%' : '1rem',
        transform: type === 'error' ? 'translateX(-50%)' : 'none',
      }}
    >
      <div className={`inline-flex items-center justify-center flex-shrink-0 ${type === 'error' ? 'w-5 h-5' : 'w-8 h-8'}`}>
        {getIcon()}
      </div>
      <div className={`ml-3 font-medium mr-8 ${type === 'error' ? 'text-sm' : 'max-w-xs text-sm'}`}>{message}</div>
      <button
        type="button"
        className={`
          ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center 
          hover:bg-gray-100 hover:dark:bg-gray-800 focus:ring-2 focus:ring-gray-300
        `}
        aria-label="Close"
        onClick={handleClose}
      >
        <X size={type === 'error' ? 16 : 18} />
      </button>
    </div>
  );
};

export default Toast;
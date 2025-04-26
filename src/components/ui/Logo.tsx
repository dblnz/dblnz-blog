import React from 'react';
import { Theme } from '../../hooks/useTheme';

interface LogoProps {
  theme: Theme;
  size?: 'small' | 'medium' | 'large';
  displayText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ theme, size = 'medium', displayText = true }) => {
  // Size configurations
  const sizes = {
    small: {
      container: 'w-6 h-6',
      text: 'text-xs',
      braces: 'text-sm',
      nameText: 'text-sm'
    },
    medium: {
      container: 'w-8 h-8',
      text: 'text-sm',
      braces: 'text-lg',
      nameText: 'text-lg'
    },
    large: {
      container: 'w-10 h-10',
      text: 'text-base',
      braces: 'text-xl',
      nameText: 'text-2xl'
    }
  };

  const currentSize = sizes[size];

  return (
    <a href="/" className="flex items-center space-x-1 cursor-pointer hover:opacity-80 transition-opacity">
      <div className="flex items-center">
        <span className={`${currentSize.braces} font-bold ${theme.text}`}>{"{"}</span>
        <div className={`${currentSize.container} mx-1 ${theme.accent} rounded-full flex items-center justify-center text-white font-bold`}>
          <span className={currentSize.text}>SW</span>
        </div>
        <span className={`${currentSize.braces} font-bold ${theme.text}`}>{"}"}</span>
      </div>
      {displayText && <h1 className={`font-bold tracking-tight ${currentSize.nameText}`}>SwTales</h1>}
    </a>
  );
};

export default Logo;
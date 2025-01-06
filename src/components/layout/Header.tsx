import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Theme } from '../../hooks/useTheme';

interface HeaderProps {
  theme: Theme;
  darkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, darkMode, toggleTheme }) => {
  return (
    <header className={`sticky top-0 z-10 ${theme.headerBg} ${theme.cardShadow} transition-colors duration-200`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <span className={`text-lg font-bold ${theme.text}`}>{"{"}</span>
            <div className={`w-8 h-8 mx-1 ${theme.accent} rounded-full flex items-center justify-center text-white font-bold`}>
              <span>SW</span>
            </div>
            <span className={`text-lg font-bold ${theme.text}`}>{"}"}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">SwTales</h1>
        </div>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full ${theme.themeToggleBg} ${theme.themeToggleColor} transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
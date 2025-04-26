import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Theme } from '../../hooks/useTheme';
import Logo from '../ui/Logo';

interface HeaderProps {
  theme: Theme;
  darkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, darkMode, toggleTheme }) => {
  return (
    <header className={`sticky top-0 z-10 ${theme.headerBg} ${theme.cardShadow} transition-colors duration-200`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo theme={theme} size="medium" />
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
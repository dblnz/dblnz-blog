import React from 'react';
import { Theme } from '../../hooks/useTheme';

interface FooterProps {
  theme: Theme;
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  return (
    <footer className={`py-8 ${theme.footerBg} mt-16 transition-colors duration-200`} aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className={`w-8 h-8 ${theme.accent} rounded-full flex items-center justify-center text-white font-bold text-sm mr-2`}>
              C
            </div>
            <span className="font-medium">CodeChronicles</span>
          </div>
          <div className={theme.muted}>
            © 2025 CodeChronicles. All rights reserved.
          </div>
          <div className={`mt-4 md:mt-0 text-sm ${theme.muted}`}>
            Built with React, TypeScript, and a passion for clean code.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
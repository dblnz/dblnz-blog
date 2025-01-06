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
            <div className="flex items-center">
              <span className={`text-sm font-bold ${theme.text}`}>{"{"}</span>
              <div className={`w-6 h-6 mx-1 ${theme.accent} rounded-full flex items-center justify-center text-white font-bold text-xs`}>
                <span>SW</span>
              </div>
              <span className={`text-sm font-bold ${theme.text}`}>{"}"}</span>
            </div>
            <span className="font-medium ml-1">SwTales</span>
          </div>
          <div className={theme.muted}>
            © 2025 SwTales. All rights reserved.
          </div>
          <div className={`mt-4 md:mt-0 text-sm ${theme.muted}`}>
            Built with Copilot.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
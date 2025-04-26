import React from 'react';
import { Theme } from '../../hooks/useTheme';
import Logo from '../ui/Logo';

interface FooterProps {
  theme: Theme;
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  return (
    <footer className={`py-8 ${theme.footerBg} mt-16 transition-colors duration-200`} aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Logo theme={theme} size="small" />
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
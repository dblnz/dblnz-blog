import React from 'react';
import { Theme } from '../../hooks/useTheme';

interface SkipLinkProps {
  theme: Theme;
}

/**
 * A skip link component that allows keyboard users to bypass repetitive navigation
 * and jump directly to the main content
 */
const SkipLink: React.FC<SkipLinkProps> = ({ theme }) => {
  return (
    <a
      href="#main-content"
      className={`
        sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50
        px-4 py-2 ${theme.buttonFilled} focus:ring-2 focus:ring-offset-2 focus:ring-blue-600
        rounded focus:outline-none transition
      `}
    >
      Skip to main content
    </a>
  );
};

export default SkipLink;
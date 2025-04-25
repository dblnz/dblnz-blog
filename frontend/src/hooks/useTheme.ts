import { useState, useEffect } from 'react';

// Light theme styles
export const lightTheme = {
  background: "bg-gray-50",
  text: "text-gray-900",
  primary: "text-blue-600",
  primaryHover: "text-blue-800",
  secondary: "text-gray-700",
  accent: "bg-blue-600",
  accentHover: "bg-blue-700",
  surface: "bg-white",
  surfaceHover: "bg-gray-100",
  border: "border-gray-200",
  muted: "text-gray-500",
  link: "text-blue-600 hover:text-blue-800",
  cardBg: "bg-white",
  cardShadow: "shadow-lg",
  buttonFilled: "bg-blue-600 hover:bg-blue-700 text-white",
  buttonOutline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
  headerBg: "bg-white border-b border-gray-200",
  footerBg: "bg-gray-100",
  iconBg: "bg-gray-100 hover:bg-gray-200",
  iconColor: "text-gray-700",
  themeToggleBg: "bg-gray-200",
  themeToggleColor: "text-gray-700",
};

// Dark theme styles (Catppuccin-inspired)
export const darkTheme = {
  background: "bg-[#1e1e2e]", // Catppuccin base
  text: "text-[#cdd6f4]", // Catppuccin text
  primary: "text-[#89b4fa]", // Catppuccin blue
  primaryHover: "text-[#b4befe]", // Catppuccin lavender
  secondary: "text-[#a6adc8]", // Catppuccin subtext0
  accent: "bg-[#89b4fa]", // Catppuccin blue
  accentHover: "bg-[#74c7ec]", // Catppuccin sapphire
  surface: "bg-[#313244]", // Catppuccin surface0
  surfaceHover: "bg-[#45475a]", // Catppuccin surface1
  border: "border-[#45475a]", // Catppuccin surface1
  muted: "text-[#a6adc8]", // Catppuccin subtext0
  link: "text-[#89b4fa] hover:text-[#b4befe]", // Blue to lavender
  cardBg: "bg-[#313244]", // Catppuccin surface0
  cardShadow: "shadow-xl shadow-black/20",
  buttonFilled: "bg-[#89b4fa] hover:bg-[#74c7ec] text-[#1e1e2e]",
  buttonOutline: "border border-[#89b4fa] text-[#89b4fa] hover:bg-[#313244]",
  headerBg: "bg-[#313244] border-b border-[#45475a]",
  footerBg: "bg-[#313244]",
  iconBg: "bg-[#45475a] hover:bg-[#585b70]", // Surface1 to surface2
  iconColor: "text-[#cdd6f4]", // Catppuccin text
  themeToggleBg: "bg-[#45475a]", // Catppuccin surface1
  themeToggleColor: "text-[#f9e2af]", // Catppuccin yellow
};

export type Theme = typeof lightTheme;

export const useTheme = () => {
  // Initialize theme from localStorage or default to light theme
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    // Check if saved theme exists or if user prefers dark mode
    return savedTheme ? savedTheme === 'dark' : 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  // Get active theme
  const theme = darkMode ? darkTheme : lightTheme;
  
  // Toggle dark/light mode
  const toggleTheme = (): void => {
    setDarkMode(prevMode => !prevMode);
  };
  
  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    document.body.className = darkMode ? 'bg-[#1e1e2e] text-[#cdd6f4]' : 'bg-gray-50 text-gray-900';
  }, [darkMode]);
  
  return { theme, darkMode, toggleTheme };
};
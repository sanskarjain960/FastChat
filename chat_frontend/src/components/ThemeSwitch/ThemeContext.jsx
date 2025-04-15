// ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    color: 'default',
    isDark: true
  });

  // On first load, check localStorage for saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('appTheme');
    
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // If no saved theme but system prefers dark mode
      setTheme({ color: '', isDark: true });
    }
  }, []);

  // Apply theme whenever it changes
  useEffect(() => {
    // Remove all color classes first
    const colorThemes = ['default','red', 'yellow', 'blue', 'orange', 'green', 'violet', 'rose'];
    document.documentElement.classList.remove(...colorThemes);
    document.documentElement.classList.remove('dark');
    
    // Add selected color class
    document.documentElement.classList.add(theme.color);
    
    // Add dark class if needed
    if (theme.isDark) {
      document.documentElement.classList.add('dark');
    }
    
    // Save to localStorage for persistence
    localStorage?.setItem('appTheme', JSON.stringify(theme));
  }, [theme]);

  const updateTheme = (newTheme) => {
    setTheme(prev => ({ ...prev, ...newTheme }));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

export const ConfigContext = createContext(null);

export function useConfig() {
  return useContext(ConfigContext);
}

// Theme context for dark/light mode
export const ThemeContext = createContext();

export function ThemeProviderCustom({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem('themeMode') || 'light');

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  const value = useMemo(() => ({ mode, toggleTheme }), [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeMode() {
  return useContext(ThemeContext);
}

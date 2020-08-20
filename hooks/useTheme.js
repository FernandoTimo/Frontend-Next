import { useContext, useEffect } from 'react';
import ThemeContext from 'context/ThemeContext';
export const useTheme = () => {
  const { Theme, setTheme, isTheme } = useContext(ThemeContext);
  return {
    Theme,
    setTheme,
    isTheme,
  };
};

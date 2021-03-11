import { useContext } from 'react';
import ThemeContext from 'context/ThemeContext';

/**
 * @typedef {Object} Colores
 * @property {string} Valor en hexadecimal
 */
/**
 * Hook creado para cambiar la paleta de colores del documento, devuelve { Theme: Array 🌴 setTheme: Function 🌴 isTheme: Boolean }
 * @returns {{Theme: Colores[], setTheme: Function, isTheme: Boolean}} {Theme, setTheme, isTheme}
 */
export const useTheme = () => {
  const { Theme, setTheme } = useContext(ThemeContext);
  return {
    Theme,
    setTheme,
  };
};

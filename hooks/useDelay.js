import { useEffect } from 'react';
/**
 * ⚡ Hoook useDelay ⚡ Ejecuta acciones después de transcurrir el tiempo establecido
 * @param {Function} funcion Acciones que se ejecutarán después del tiempo establecido
 * @param {Number} delay Tiempo de retraso en milisegundos
 */
export default function useDelay(funcion, delay = 3000) {
  useEffect(() => {
    const retraso = setTimeout(() => {
      funcion();
    }, delay);
    console.log('-----   delay   -----');
    return () => {
      clearTimeout(retraso);
    };
  }, []);
}

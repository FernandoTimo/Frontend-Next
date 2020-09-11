import { useEffect } from 'react';
/**
 * ⚡ Hoook useDelay ⚡ Ejecuta acciones después de transcurrir el tiempo establecido
 * @param {Function} funcion Acciones que se ejecutarán después del tiempo establecido
 * @param {Number} delay Tiempo de retraso en milisegundos
 * @param {Boolean} [start] True o False, funcionará cuando el valor sea true 🔥 default = true
 */
export default function useDelay(funcion, delay = 3000, start = true) {
  useEffect(() => {
    if (start) {
      const retraso = setTimeout(() => {
        funcion();
      }, delay);
      return () => {
        clearTimeout(retraso);
      };
    }
  }, [start]);
}

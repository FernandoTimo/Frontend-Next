import { useEffect, useState } from 'react';
/**
 * ⚡ Hoook useDelay ⚡ Ejecuta acciones después de transcurrir el tiempo establecido
 * @param {Number} delay Tiempo de retraso en milisegundos
 * @param {Boolean} [start] True o False, funcionará cuando el valor sea true 🔥 default = true
 */
export default function useDelay(delay = 3000, start = true) {
  const [Finish, setFinish] = useState(false);
  useEffect(() => {
    if (start) {
      const retraso = setTimeout(() => {
        setFinish(true);
      }, delay);
      return () => {
        clearTimeout(retraso);
      };
    }
  }, [start]);
  return Finish;
}

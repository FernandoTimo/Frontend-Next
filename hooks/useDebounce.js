import { useState, useEffect } from 'react';
/**
 * ⚡ Hoook useDebounce ⚡ Devuelve el estado del string que no cambió durante el tiempo establecido
 * @param {string} value String que se suscribirá al escuchador de cambios.
 * @param {number} [delay] Tiempo en el que el String deberá permanecer en en mismo estado.
 */
export default function useDebounce(value, delay = 600) {
  const [DebouncedValue, setDebouncedValue] = useState('');
  if (!value && value !== '') {
    throw new Error(
      '⚡ useDebounce => Proporcionar un valor de tipo string como parámetro, ejemplo: useDebounce("Timoideas") ⚡'
    );
  }
  useEffect(() => {
    let debounce = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(debounce);
  }, [value]);
  return DebouncedValue;
}

import { useEffect, useState } from 'react';
/**
 * ⚡ Hoook useSessionStorage ⚡ Maneja el sessionStorage del navegador
 * @param {String} key Key del sessionStorage 🔥 requiered = true
 * @param {(String|Number|Array)} [value] Valor con el que se actualizará el item
 * @returns {String}
 */
export default function useSessionStorage(key, value = '') {
  if (!key || typeof key != 'string' || !!!key.trim()) {
    throw new Error(
      '⚡ useSessionStorage => Proporciona un valor de tipo string como parámetro, ejemplo: useSessionStorage("Theme") ⚡'
    );
  }
  const [Value, setValue] = useState('');
  // Esteblece valores de inicio
  useEffect(() => {
    // La key no existe en el sessionStorage
    if (!!!sessionStorage[key]) {
      sessionStorage[key] = value;
      setValue(value);
    }
    // La key existe en el sessionStorage
    else {
      setValue(sessionStorage[key]);
    }
  }, []);
  // Cambia el valor del sessionStorage
  useEffect(() => {
    sessionStorage[key] = Value;
  }, [Value]);

  return [Value, setValue];
}

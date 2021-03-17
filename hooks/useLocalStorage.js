import { useEffect, useState } from 'react';
/**
 * ⚡ Hoook useLocalStorage ⚡ Maneja el localStorage del navegador
 * @param {String} key Key del localStorage 🔥 requiered = true
 * @param {(String|Number|Array)} [value] Valor con el que se actualizará el item
 * @returns {String}
 */
export default function useLocalStorage(key, value = '') {
  if (!key || typeof key != 'string' || !!!key.trim()) {
    throw new Error(
      '⚡ useLocalStorage => Proporciona un valor de tipo string como parámetro, ejemplo: useLocalStorage("Theme") ⚡'
    );
  }
  const [Value, setValue] = useState('');
  // Esteblece valores de inicio
  useEffect(() => {
    // La key no existe en el localStorage
    if (!!!localStorage[key]) {
      localStorage[key] = value;
      setValue(value);
    }
    // La key existe en el localStorage
    else {
      setValue(localStorage[key]);
    }
  }, []);
  // Cambia el valor del localStorage
  useEffect(() => {
    localStorage[key] = Value;
  }, [Value]);

  return [Value, setValue];
}

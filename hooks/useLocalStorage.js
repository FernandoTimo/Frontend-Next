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
  const [State, setState] = useState('');
  // Esteblece valores de inicio
  useEffect(() => {
    // La key no existe en el localStorage
    if (!!!localStorage[key]) {
      localStorage[key] = value;
      setState(value);
    }
    // La key existe en el localStorage
    else {
      setState(localStorage[key]);
    }
  }, []);
  // Cambia el valor del localStorage
  useEffect(() => {
    localStorage[key] = State;
  }, [State]);

  return [State, setState];
}

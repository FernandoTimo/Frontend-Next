import { useEffect, useState } from 'react';
/**
 * ⚡ Hoook useLocalStorage ⚡ Maneja el localStorage del navegador
 * @param {String} key Key del localStorage 🔥 requiered = true
 * @param {(String|Number|Array)} [value] Valor con el que se actualizará el item
 * @returns {String}
 */
export default function useLocalStorage(key, value) {
  const [StorageValue, setStorageValue] = useState();
  if (!key && key !== '') {
    throw new Error(
      '⚡ useLocalStorage => Proporciona un valor de tipo string como parámetro, ejemplo: useLocalStorage("Theme") ⚡'
    );
  }
  useEffect(() => {
    if (!value) {
      setStorageValue(localStorage.getItem(key));
    } else {
      localStorage.setItem(key, value);
      setStorageValue(localStorage.getItem(key));
    }
  }, [key, value]);
  return StorageValue;
}

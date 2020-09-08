import { useEffect, useState } from 'react';
/**
 * ⚡ Hoook useSessionStorage ⚡ Maneja el sessionStorage del navegador
 * @param {String} key Key del sessionStorage 🔥 requiered = true
 * @param {(String|Number|Array)} [value] Valor con el que se actualizará el item
 * @returns {String}
 */
export default function useSessionStorage(key, value) {
  const [StorageValue, setStorageValue] = useState();
  if (!key && key !== '') {
    throw new Error(
      '⚡ useSessionStorage => Proporciona un valor de tipo string como parámetro, ejemplo: useSessionStorage("Theme") ⚡'
    );
  }
  useEffect(() => {
    if (!value) {
      setStorageValue(window.sessionStorage.getItem(key));
    } else {
      window.sessionStorage.setItem(key, value);
      setStorageValue(window.sessionStorage.getItem(key));
    }
  }, [key, value]);
  return StorageValue;
}

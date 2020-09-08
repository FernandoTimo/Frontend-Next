import { useState, useEffect } from 'react';
/**
 * ⚡ Hoook UseCounter ⚡ Devuelve los valores intermedios de el min-max en un intervalo de tiempo
 * @param {number} max Valor final del contador
 * @param {number} [min] Valor inicial del contador 🔥 default value = 0
 */
export default function useCounter(max, min) {
  const [Counter, setCounter] = useState(min ? min : 0);
  useEffect(() => {
    var currentCounter;
    if (Counter < max) {
      currentCounter = setInterval(() => {
        setCounter(Counter + max / (14 * max.toString().length));
      }, 14);
    }
    return () => {
      clearInterval(currentCounter);
    };
  }, [Counter]);

  return Math.round(Counter);
}

import { useState, useEffect } from 'react';
/**
 * ⚡ Hoook UseCounter ⚡ Devuelve los valores intermedios de el min-max en un intervalo de tiempo
 * @param {number} min Valor inicial del contador
 * @param {number} max Valor final del contador
 * @param {number} speed Valor del intérvalo-tiempo en milisegundos
 */
export default function useCounter(min, max, speed) {
  const [Counter, setCounter] = useState(min);
  useEffect(() => {
    var currentCounter;
    if (Counter < max) {
      currentCounter = setInterval(() => {
        setCounter(Counter + speed * max.toString().length);
      }, speed);
    }
    return () => {
      clearInterval(currentCounter);
    };
  }, [Counter]);

  return Counter;
}

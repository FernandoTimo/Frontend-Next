import { useState, useEffect } from 'react';
/**
 * ⚡ Hoook UseCounter ⚡ Devuelve los valores intermedios de el min-max en un intérvalo de tiempo
 * @param {number} max Valor final del contador 🔥 requiered = true
 * @param {number} [min] Valor inicial del contador 🔥 default value = 0
 * @param {boolean} [start]  🔥 default value = true
 */
export default function useCounter(
  max,
  min = 0,
  start = true,
  speed = 14,
  increment = (max - min) / (14 * max.toString().length)
) {
  const [Counter, setCounter] = useState(min);
  if (
    !max ||
    typeof max !== 'number' ||
    typeof min !== 'number' ||
    typeof start !== 'boolean' ||
    typeof speed !== 'number' ||
    typeof increment !== 'number'
  ) {
    throw new Error(
      '⚡ useCounter => Proporcionar valores válidos: (number, number, boolean, number, number) como parámetros, ejemplo completo: useCounter(4286, 0, true, 14, 14) ⚡'
    );
  }
  useEffect(() => {
    if (start) {
      var currentCounter;
      if (Counter !== max) {
        currentCounter = setInterval(() => {
          setCounter(
            max < 0
              ? Counter -
                  (increment > max - Counter ? -increment : Counter - max)
              : Counter +
                  (increment < max - Counter ? increment : max - Counter)
          );
        }, speed);
      }
      return () => {
        clearInterval(currentCounter);
      };
    } else {
      setCounter(min);
    }
  }, [Counter, start]);

  return Math.round(Counter);
}

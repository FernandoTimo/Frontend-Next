import { useState, useEffect } from 'react';

export default function useCounter(min, max, speed) {
  const [Counter, setCounter] = useState(min);
  // console.log(max.toString()[3]);
  useEffect(() => {
    var currentCounter;
    if (Counter < max) {
      currentCounter = setInterval(() => {
        setCounter(Counter + 1);
      }, speed);
    }
    console.log(Counter);
    return () => {
      clearInterval(currentCounter);
    };
  }, [Counter]);

  return Counter;
}

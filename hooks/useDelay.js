import { useState, useEffect } from 'react';

export default function useDelay(delay = 1000) {
  const [Active, setActive] = useState(false);
  useEffect(() => {
    const retraso = setTimeout(() => {
      setActive(true);
    }, delay);
    return () => {
      clearTimeout(retraso);
    };
  }, [Active]);

  return Active;
}

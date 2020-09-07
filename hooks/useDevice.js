import { useEffect, useState } from 'react';

export const useDevice = () => {
  const [device, setDevice] = useState();

  useEffect(() => {
    const handlerDevice = () => {
      if (window.innerWidth < 600) {
        setDevice('Phone');
      } else if (window.innerWidth < 768) {
        setDevice('Tablet');
      } else if (window.innerWidth < 1200) {
        setDevice('Desktop');
      }
    };

    handlerDevice();

    window.addEventListener('resize', handlerDevice);
    return () => {
      window.removeEventListener('resize', handlerDevice);
    };
  }, []);

  return device;
};

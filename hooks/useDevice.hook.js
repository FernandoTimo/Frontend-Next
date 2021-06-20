import { useEffect, useState } from 'react';

/**
 * ⚡ Hoook useDevice ⚡ Reconoce el dispositivo y la plataforma del cliente final
 */
export const useDevice = () => {
  const [Device, setDevice] = useState('');
  const [Platform, setPlatform] = useState('');

  useEffect(() => {
    const handlerDevice = () => {
      if (window.innerWidth < 380) {
        setPlatform('Watch');
      } else if (window.innerWidth < 600) {
        setPlatform('Phone');
      } else if (window.innerWidth < 768) {
        setPlatform('Tablet');
      } else if (window.innerWidth < 1200) {
        setPlatform('Laptop');
      } else if (window.innerWidth >= 1200) {
        setPlatform('Desktop');
      }
    };
    setDevice(navigator.platform);
    handlerDevice();
    window.addEventListener('resize', handlerDevice);
    return () => {
      window.removeEventListener('resize', handlerDevice);
    };
  }, []);

  return { Device, Platform };
};

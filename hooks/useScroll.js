import { useEffect, useState } from 'react';
export default function useScroll(funcion, limits = [0, 0]) {
  const [XScroll, setXScroll] = useState(0);
  const [YScroll, setYScroll] = useState(0);

  useEffect(() => {
    const handlerScroll = (e) => {
      e.preventDefault();
      setXScroll(Math.round(window.scrollX));
      console.log(window.scrollY);
      setYScroll(Math.round(window.scrollY));
    };
    window.addEventListener('scroll', handlerScroll, { passive: false });
    return () => {
      window.removeEventListener('scroll', handlerScroll);
    };
  }, []);
  // YScroll < limits[0]
  //   ? console.log('descendiendo')
  //   : console.log('ascendiendo');
  // ? limits[0] < YScroll && funcion()
  // : limits[0] > YScroll && funcion();

  return { XScroll, YScroll };
}

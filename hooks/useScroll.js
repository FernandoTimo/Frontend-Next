import { useEffect, useState } from 'react';
export default function useScroll() {
  const [XScroll, setXScroll] = useState();
  const [YScroll, setYScroll] = useState();
  useEffect(() => {
    const handlerScroll = (e) => {
      setXScroll(Math.round(window.scrollX));
      setYScroll(Math.round(window.scrollY));
    };
    window.addEventListener('scroll', handlerScroll);

    return () => {
      window.removeEventListener('scroll', handlerScroll);
    };
  }, []);
  return { XScroll, YScroll };
}

// let getPosition = () => ({
//   x: window.pageXOffset,
//   y: window.pageYOffset,
// });

// function useWindowScrollPosition(options) {
//   let opts = Object.assign({}, defaultOptions, options);

//   let [position, setPosition] = useState(getPosition());

//   useEffect(() => {
//     let handleScroll = _throttle(() => {
//       setPosition(getPosition());
//     }, opts.throttle);

//     window.addEventListener(
//       'scroll',
//       handleScroll,
//       supportsPassive ? { passive: true } : false
//     );

//     return () => {
//       handleScroll.cancel();
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return position;
// }

// export default useWindowScrollPosition;

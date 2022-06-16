import { useEffect } from 'react';
import style from './Theme.module.css';
import Ligth from 'public/theme/Ligth.json';
import Dark from 'public/theme/Dark.json';
export default function Theme() {
  useEffect(() => {
    !!localStorage.Theme
      ? setRoot(localStorage.Theme === 'Dark' ? Dark : Ligth)
      : setSystem();
  }, []);
  const setRoot = (obj) => {
    Object.keys(obj).map((key) => {
      document.documentElement.style.setProperty(key, obj[key]);
    });
  };
  const setDark = () => {
    localStorage.Theme = 'Dark';
    setRoot(Dark);
  };
  const setLigth = () => {
    localStorage.Theme = 'Ligth';
    setRoot(Ligth);
  };
  const setSystem = () => {
    let sysPref = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      e.matches ? setDark() : setLigth();
    };
    sysPref.removeEventListener('change', handler);
    sysPref.addEventListener('change', handler);
    handler(sysPref);
  };
  useEffect(() => {
    const toggleTheme = (e) => {
      if (e.keyCode === 220 && e.altKey) {
        localStorage.Theme === 'Dark' ? setLigth() : setDark();
      }
    };
    window.addEventListener('keydown', toggleTheme);
    return () => {
      window.removeEventListener('keydown', toggleTheme);
    };
  }, []);
  return (
    <div className={style.Container}>
      <span onClick={setSystem}>💻</span>
      <span onClick={setLigth}>🌖</span>
      <span onClick={setDark}>🌒</span>
    </div>
  );
}

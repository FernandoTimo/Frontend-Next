import { useState, useEffect } from 'react';

const Context = React.createContext({});

export function ThemeContextProvider({ children }) {
  useEffect(() => {
    if (localStorage.Theme === false) {
      localStorage.Theme = 'Dark';
    }
  }, []);

  const Light = {
    _00: '#ffffff',
    _01: '#fafafa',
    _02: '#f3f3f3',
    _03: '#ededed',
    _04: '#e3e3e3',
    _05: '#ddd',
    _06: '#ccc',
    _07: '#bbb',
    _08: '#aaa',
    _09: '#999',
    _10: '#777',
    _11: '#666',
    _12: '#555',
    _13: '#444',
    _14: '#333',
    _15: '#222',
    _16: '#1f1f1f',
    _17: '#141414',
    _18: '#0f0f0f',
    _19: '#070707',
    _20: '#000000',
  };
  const Dark = {
    _00: '#000000',
    _01: '#070707',
    _02: '#0f0f0f',
    _03: '#141414',
    _04: '#1f1f1f',
    _05: '#222',
    _06: '#333',
    _07: '#444',
    _08: '#555',
    _09: '#666',
    _10: '#777',
    _11: '#999',
    _12: '#aaa',
    _13: '#bbb',
    _14: '#ccc',
    _15: '#ddd',
    _16: '#e3e3e3',
    _17: '#ededed',
    _18: '#f3f3f3',
    _19: '#fafafa',
    _20: '#ffffff',
  };
  const [Theme, setMode] = useState(Light);
  const [isTheme, setIsTheme] = useState(true);
  const setTheme = () => {
    isTheme
      ? ((localStorage.Theme = 'Dark'), setMode(Dark), setIsTheme(false))
      : ((localStorage.Theme = 'Light'), setMode(Light), setIsTheme(true));
    console.log(localStorage.Theme);
  };
  return (
    <Context.Provider value={{ Theme, setTheme, isTheme }}>
      {children}
    </Context.Provider>
  );
}

export default Context;

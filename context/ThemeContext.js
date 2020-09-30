import useLocalStorage from 'hooks/useLocalStorage';
import { useState, useEffect } from 'react';

const Context = React.createContext({});

export function ThemeContextProvider({ children }) {
  //            <--=========================================================== [ Light Theme Palette ]
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
  //            <--=========================================================== [ Dark Theme Palette ]
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
  //            <--=========================================================== [ useLocalStorage ]
  //            <--=========================================================== [ useStates ]
  const [Theme, setMode] = useState(Dark);
  //            <--=========================================================== [ useEffects ]
  useEffect(() => {
    if (!localStorage.Theme) {
      localStorage.Theme = 'Light';
    }

    localStorage.Theme === 'Light' ? setMode(Light) : setMode(Dark);
  }, []);
  //            <--=========================================================== [ Handler Functions ]
  const setTheme = () => {
    localStorage.Theme === 'Light'
      ? ((localStorage.Theme = 'Dark'), setMode(Dark))
      : ((localStorage.Theme = 'Light'), setMode(Light));
  };

  //            <==***************************************************************************** [ JSX COMPONENT = THEME ]
  return (
    <Context.Provider value={{ Theme, setTheme }}>{children}</Context.Provider>
  );
}

export default Context;

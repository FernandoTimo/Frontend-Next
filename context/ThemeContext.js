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
    _05: '#dddddd',
    _06: '#cccccc',
    _07: '#bbbbbb',
    _08: '#aaaaaa',
    _09: '#999999',
    _10: '#777777',
    _11: '#666666',
    _12: '#555555',
    _13: '#444444',
    _14: '#333333',
    _15: '#222222',
    _16: '#1f1f1f',
    _17: '#141414',
    _18: '#0f0f0f',
    _19: '#070707',
    _20: '#000000',
    primario: '#987284',
    secundario: '#75B9BE',
    terceario: '#D0D6B5',
    botones: '#F9B5AC',
    bordes: '#EE7674',
    color_principal: '#F5E6E8',
    color_secundario: '#D5C6E0',
    color_terceario: '#AAA1C8',
    color_alternativo: '#967AA1',
    contraste: '#192A51',
  };
  //            <--=========================================================== [ Dark Theme Palette ]
  const Dark = {
    _00: '#000000',
    _01: '#070707',
    _02: '#0f0f0f',
    _03: '#141414',
    _04: '#1f1f1f',
    _05: '#222222',
    _06: '#333333',
    _07: '#444444',
    _08: '#555555',
    _09: '#666666',
    _10: '#777777',
    _11: '#999999',
    _12: '#aaaaaa',
    _13: '#bbbbbb',
    _14: '#cccccc',
    _15: '#dddddd',
    _16: '#e3e3e3',
    _17: '#ededed',
    _18: '#f3f3f3',
    _19: '#fafafa',
    _20: '#ffffff',
    primario: '#515A47',
    secundario: '#D7BE82',
    terceario: '#755C1B',
    botones: '#7A4419',
    bordes: '#400406',
    color_principal: '#266DD3',
    color_secundario: '#344055',
    color_terceario: '#888098',
    color_alternativo: '#CFB3CD',
    contraste: '#DFC2F2',
  };
  //            <--=========================================================== [ useStates ]
  const [Theme, setMode] = useState(Dark);
  //            <--=========================================================== [ useEffects ]
  useEffect(() => {
    localStorage.Theme && localStorage.Theme === 'Light'
      ? setMode(Light)
      : setMode(Dark);
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

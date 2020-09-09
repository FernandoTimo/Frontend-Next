import { createContext, useState, useEffect, useLayoutEffect } from 'react';
const Context = createContext();
export const StoreContextProvider = ({ children }) => {
  const [Store, setListStore] = useState([]);
  const [isStore, setinStore] = useState(false);

  // useEffect(() => {
  //   const storeLocal = [];
  //   let data = {
  //     asd: 'asd',
  //     precio: 'precio',
  //   };
  //   storeLocal.push(data);
  //   setListStore(storeLocal);
  // }, []);

  const setStore = (data) => {
    const storeLocal = [
      {
        _id: '8q42SdaW13sd84tW5Fe8az3TsD',
        precio: '12.98',
      },
      {
        _id: '8q42SdaW13sd84tW5Fe8az3TsD',
        precio: '12.98',
      },
      {
        _id: '8q42SdaW13sd84tW5Fe8az3TsD',
        precio: '12.98',
      },
    ];
    let listStore = Store;
    listStore.push(data);
    // localStorage.Store = listStore;
    setListStore(storeLocal);
    // setListStore(listStore);
    // console.log(localStorage.Store);
    console.log(data);
  };
  const setIsStore = (value) => {
    setinStore(typeof value === Boolean ? value : !isStore);
  };
  return (
    <Context.Provider value={{ Store, setStore, isStore, setIsStore }}>
      {children}
    </Context.Provider>
  );
};
export default Context;

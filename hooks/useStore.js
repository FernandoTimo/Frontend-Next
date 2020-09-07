import StoreContext from 'context/StoreContext';
import { useState, useContext, useEffect } from 'react';
export const useStore = () => {
  const { Store, setStore, isStore, setIsStore } = useContext(StoreContext);

  useEffect(() => {
    if (isStore) {
      const storeLocal = [
        {
          asd: 'asd',
          qwe: 'qwe',
        },
        {
          asd: 'asd',
          asdqwe: 'qwe',
        },
      ];
      localStorage.Store = JSON.stringify(storeLocal);
    }
  }, []);
  // localStorage.Store = 'asd';
  // setStore(localStorage.Store);
  // console.log(localStorage.Store);

  return {
    Store,
    setStore,
    isStore,
    setIsStore,
  };
};

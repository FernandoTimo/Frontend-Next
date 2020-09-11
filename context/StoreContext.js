import { createContext, useState, useEffect } from 'react';
const Context = createContext();
export const StoreContextProvider = ({ children }) => {
  const [ListStore, setStore] = useState([1, 8, 4, 7, 5, 5, 8]);
  const [isStore, setinStore] = useState(true);
  const [ShowStore, setToggleStore] = useState(true);
  const [StepStore, setStep] = useState(0);
  useEffect(() => {
    if (ListStore.length > 0) {
      setToggleStore(true);
    }
  }, []);
  const setShowStore = () => {
    setToggleStore(!ShowStore);
  };

  const removeItem = (index) => {
    if (ListStore.length < 1) {
      setShowStore(false);
    }
    console.log(index, 'index');
    console.log(ListStore.length);
    let currentList = ListStore;
    currentList.splice(index, 1);
    setStore(currentList.length > 0 ? currentList : []);
    console.log(ListStore, 'ListStore');
    console.log(currentList, 'currentList');
  };
  const setIsStore = (value) => {
    setinStore(typeof value === Boolean ? value : !isStore);
  };
  const setListStore = {
    removeItem,
  };
  const setStepStore = (step) => {
    setStep(step);
  };
  return (
    <Context.Provider
      value={{
        ListStore,
        setListStore,
        isStore,
        setIsStore,
        ShowStore,
        setShowStore,
        StepStore,
        setStepStore,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default Context;
// Prueba git

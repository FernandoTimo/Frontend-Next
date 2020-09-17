import { createContext, useState, useEffect } from 'react';
const Context = createContext();
export const StoreContextProvider = ({ children }) => {
  const [ListStore, setStore] = useState([1, 8, 4, 7, 5, 5, 8]);
  const [isStore, setinStore] = useState(true);
  const [ShowStore, setToggleStore] = useState(true);
  const [StepStore, setStep] = useState(0);
  //            <--=========================================================== [ UseEffect ]
  //             -----------------------------  [ UseEffect ]  -----------------------------
  //            <--=========================================================== [ UseEffect ]
  const handleWindowVisibility = () => {
    document.hidden && setStep(Number(localStorage.Step));
  };
  useEffect(() => {
    if (ListStore.length > 0) {
      setToggleStore(true);
    }
    // ? setStep(Number(localStorage.Step))
    localStorage.Step ? setStep(0) : (localStorage.Step = 0);
    document.addEventListener('visibilitychange', handleWindowVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleWindowVisibility);
    };
  }, []);
  //            <--=========================================================== [ ShowStore ]
  //             -----------------------------  [ ShowStore ]  -----------------------------
  //            <--=========================================================== [ ShowStore ]
  const setShowStore = () => {
    setToggleStore(!ShowStore);
  };
  //            <--=========================================================== [ ListItems ]
  //             -----------------------------  [ ListItems ]  -----------------------------
  //            <--=========================================================== [ ListItems ]
  // ----------------------------- <--=============== Remove ===============--> -----------------------------
  const removeItem = (index) => {
    if (ListStore.length < 1) {
      setShowStore(false);
    }
    let currentList = ListStore;
    currentList.splice(index, 1);
    setStore(currentList.length > 0 ? currentList : []);
  };
  const setIsStore = (value) => {
    setinStore(typeof value === Boolean ? value : !isStore);
  };
  const setListStore = {
    removeItem,
  };
  const setStepStore = (step) => {
    localStorage.Step = step;
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

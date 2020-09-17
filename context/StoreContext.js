import { createContext, useState, useEffect, useReducer } from 'react';
const Context = createContext();
const InvoiceReducer = () => {};
export const StoreContextProvider = ({ children }) => {
  const [InvoiceStore, setInvoice] = useReducer(InvoiceReducer, {
    usuario: '',
    boleta: '',
    productos: [],
    telefono,
    direccion: {
      ciudad: 'Arequipa',
      distrito,
      calle: '',
      referencia: '',
    },
    turno,
    date,
    total,
  });
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
    if (InvoiceStore.length > 0) {
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
    if (InvoiceStore.length < 1) {
      setShowStore(false);
    }
    let currentList = InvoiceStore;
    currentList.splice(index, 1);
    setInvoice(currentList.length > 0 ? currentList : []);
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
        ListStore: InvoiceStore,
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

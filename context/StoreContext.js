import { createContext, useState, useEffect, useReducer } from 'react';
const Context = createContext();

//            <--=========================================================== [ Reducer Handler ]
//             -----------------------------  [ Reducer Handler ]  -----------------------------
//            <--=========================================================== [ Reducer Handler ]
const InvoiceReducer = (state, action) => {
  switch (action.type) {
    case 'PRODUCTS':
      return {
        ...state,
      };
    case 'INFORMACION':
      const { usuario, comprobante, telefono, direccion, turno } = action;
      return {
        ...state,
        usuario,
        comprobante,
        telefono,
        direccion,
        turno,
      };
    default:
      return state;
  }
};
//            <--=========================================================== [ StoreContextProviderComponent ]
//            <--=========================================================== [ StoreContextProviderComponent ]
//             -----------------------------  [ StoreContextProviderComponent ]  -----------------------------
//            <--=========================================================== [ StoreContextProviderComponent ]
//            <--=========================================================== [ StoreContextProviderComponent ]
export const StoreContextProvider = ({ children }) => {
  const [InvoiceStore, setInvoice] = useReducer(InvoiceReducer, {
    productos: [5, 4, 78, 4, 6, 4],
  });
  const [isStore, setinStore] = useState(true);
  const [ShowStore, setToggleStore] = useState(true);
  const [StepStore, setStep] = useState(0);
  // ----------------------------- <--=============== Remove ===============--> -----------------------------
  const removeItem = (index) => {
    if (InvoiceStore.productos.length < 1) {
      setShowStore(false);
    }
    let currentList = InvoiceStore;
    currentList.splice(index, 1);
    setInvoice(currentList.length > 0 ? currentList : []);
  };
  const setListStore = {
    removeItem,
  };
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

  const setIsStore = (value) => {
    setinStore(typeof value === Boolean ? value : !isStore);
  };
  const setStepStore = (step) => {
    localStorage.Step = step;
    setStep(step);
  };
  return (
    <Context.Provider
      value={{
        InvoiceStore,
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

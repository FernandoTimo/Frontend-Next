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
    total: '15.20',
    productos: [
      {
        producto: {
          _id: '46sad1v8we411f6a5',
          cover:
            'https://instagram.faqp2-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/119116454_189674869217927_7047784010468374661_n.jpg?_nc_ht=instagram.faqp2-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=n3skGTyw1n0AX-Lft7s&_nc_tp=15&oh=7a8515001e0f40db5e3f26cc73b8662d&oe=5F8E58B3',
        },
        cantidad: 1,
        precio: 1.2,
        total: 1.2,
      },
      {
        producto: {
          _id: '46sad1v8we411f6a5',
          cover:
            'https://instagram.faqp2-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/119116454_189674869217927_7047784010468374661_n.jpg?_nc_ht=instagram.faqp2-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=n3skGTyw1n0AX-Lft7s&_nc_tp=15&oh=7a8515001e0f40db5e3f26cc73b8662d&oe=5F8E58B3',
        },
        cantidad: 1,
        precio: 2.2,
        total: 2.2,
      },
      {
        producto: {
          _id: '46sad1v8we411f6a5',
          cover:
            'https://instagram.faqp2-2.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/119069827_144475513993840_4126164594597294050_n.jpg?_nc_ht=instagram.faqp2-2.fna.fbcdn.net&_nc_cat=104&_nc_ohc=7KRRdtI7_aAAX-OMGxf&_nc_tp=15&oh=7ce57a395737044c73e06c20fd458443&oe=5F912746',
        },
        cantidad: 1,
        precio: 6.2,
        total: 6.2,
      },
      {
        producto: {
          _id: '46sad1v8we411f6a5',
          cover:
            'https://instagram.faqp2-2.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/118980999_1252077021824762_1652005059307647734_n.jpg?_nc_ht=instagram.faqp2-2.fna.fbcdn.net&_nc_cat=102&_nc_ohc=tBkQhfDfHikAX-gsmOW&_nc_tp=15&oh=6bc031a6e684b5e26f647e68a52911c5&oe=5F8FA3E0',
        },
        cantidad: 1,
        precio: 4.2,
        total: 4.2,
      },
      {
        producto: {
          _id: '46sad1v8we411f6a5',
          cover:
            'https://instagram.faqp2-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/119116454_189674869217927_7047784010468374661_n.jpg?_nc_ht=instagram.faqp2-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=n3skGTyw1n0AX-Lft7s&_nc_tp=15&oh=7a8515001e0f40db5e3f26cc73b8662d&oe=5F8E58B3',
        },
        cantidad: 1,
        precio: 2.2,
        total: 2.2,
      },
    ],
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

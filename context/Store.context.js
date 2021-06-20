import { createContext, useState, useEffect, useReducer } from 'react';
const Context = createContext();

//            <--=========================================================== [ Reducer Handler ]}

const InvoiceReducer = (state, action) => {
  let productos, producto, total;
  switch (action.type) {
    case 'FIRST_PRODUCT':
      productos = [{ producto: action.product, cantidad: 1 }];
      total = action.product.precio;
      return {
        ...state,
        productos,
        total,
      };
    case 'ADD_PRODUCT':
      producto = state.productos.filter(
        (product) => action.product.id === product.producto._id
      );
      total = state.total + producto[0].producto.precio;
      return {
        ...state,
        productos,
        total,
      };

    case 'REST_PRODUCT':
      producto = state.productos.filter(
        (product) => action.product.id === product.producto._id
      );
      total = state.total - producto[0].producto.precio;

      console.log(typeof producto[0].producto.precio);
      console.log(typeof state.total);
      return {
        ...state,
        total,
      };
    case 'REMOVE_PRODUCT':
      productos = state.productos.filter(
        (product) => action.product.id !== product.producto._id
      );
      return {
        ...state,
        productos,
        total: state.total - action.product.precio,
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
export const StoreContextProvider = ({ children }) => {
  const [InvoiceStore, setInvoice] = useReducer(InvoiceReducer, {
    productos: [
      {
        _id: '46sad1v8we411f6a5',
        cover:
          'https://instagram.faqp2-2.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/118643918_184506266418940_2231398615849041907_n.jpg?_nc_ht=instagram.faqp2-2.fna.fbcdn.net&_nc_cat=104&_nc_ohc=Ux0iWVhkmjMAX_2W8zC&_nc_tp=15&oh=234703c007ca5859b1c643573c3c2c2c&oe=5F8FE2FC',
        precio: 1.2,
      },
      {
        _id: '46sad1v8we411f6a5',
        cover:
          'https://instagram.faqp2-2.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/118643918_184506266418940_2231398615849041907_n.jpg?_nc_ht=instagram.faqp2-2.fna.fbcdn.net&_nc_cat=104&_nc_ohc=Ux0iWVhkmjMAX_2W8zC&_nc_tp=15&oh=234703c007ca5859b1c643573c3c2c2c&oe=5F8FE2FC',
        precio: 1.2,
      },
      {
        _id: '46sad1v8we411f6a5',
        cover:
          'https://instagram.faqp2-2.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/118643918_184506266418940_2231398615849041907_n.jpg?_nc_ht=instagram.faqp2-2.fna.fbcdn.net&_nc_cat=104&_nc_ohc=Ux0iWVhkmjMAX_2W8zC&_nc_tp=15&oh=234703c007ca5859b1c643573c3c2c2c&oe=5F8FE2FC',
        precio: 1.2,
      },
      {
        _id: '46sad1v8we411f6a5',
        cover:
          'https://instagram.faqp2-2.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/118643918_184506266418940_2231398615849041907_n.jpg?_nc_ht=instagram.faqp2-2.fna.fbcdn.net&_nc_cat=104&_nc_ohc=Ux0iWVhkmjMAX_2W8zC&_nc_tp=15&oh=234703c007ca5859b1c643573c3c2c2c&oe=5F8FE2FC',
        precio: 1.2,
      },
      {
        _id: '46sad1v8we411f6a5',
        cover:
          'https://instagram.faqp2-2.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/118643918_184506266418940_2231398615849041907_n.jpg?_nc_ht=instagram.faqp2-2.fna.fbcdn.net&_nc_cat=104&_nc_ohc=Ux0iWVhkmjMAX_2W8zC&_nc_tp=15&oh=234703c007ca5859b1c643573c3c2c2c&oe=5F8FE2FC',
        precio: 1.2,
      },
      {
        _id: '46sad1v8we411f6a5',
        cover:
          'https://instagram.faqp2-2.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/118643918_184506266418940_2231398615849041907_n.jpg?_nc_ht=instagram.faqp2-2.fna.fbcdn.net&_nc_cat=104&_nc_ohc=Ux0iWVhkmjMAX_2W8zC&_nc_tp=15&oh=234703c007ca5859b1c643573c3c2c2c&oe=5F8FE2FC',
        precio: 1.2,
      },
    ],
  });
  //            <--=========================================================== [ States ]
  const [isStore, setinStore] = useState(true);
  const [ShowStore, setToggleStore] = useState(true);
  const [StepStore, setStep] = useState(0);
  //            <--=========================================================== [ UseEffects ]
  const handleWindowVisibility = () => {
    document.hidden && setStep(Number(localStorage.Step));
  };
  useEffect(() => {
    // Step ? setStep(0)
    localStorage.Step ? setStep(0) : (localStorage.Step = 0);
    document.addEventListener('visibilitychange', handleWindowVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleWindowVisibility);
    };
  }, []);
  //            <--=========================================================== [ Handler Functions ]
  //                                   1 ==> setListStore
  const addProduct = (product) => {
    if (InvoiceStore.productos.length === 0) {
      setInvoice({ type: 'FIRST_PRODUCT', product });
      setShowStore(true);
    } else {
      setInvoice({ type: 'ADD_PRODUCT', product });
    }
  };
  const restProduct = (product) => {
    setInvoice({ type: 'REST_PRODUCT', product });
  };
  const removeProduct = (product) => {
    setTimeout(() => {
      setInvoice({ type: 'REMOVE_PRODUCT', product });
      InvoiceStore.productos.length === 1 && setShowStore(false);
    }, 300);
  };
  const setInvoiceStore = {
    addProduct,
    restProduct,
    removeProduct,
  };
  //                                    2 ==> ShowStore
  const setShowStore = (value = true) => {
    setToggleStore(value);
  };
  //                                    3 ==> SetIsStore
  const setIsStore = (value) => {
    setinStore(typeof value === Boolean ? value : !isStore);
  };
  //                                    4 ==> SetStepStore
  const setStepStore = (step) => {
    localStorage.Step = step;
    setStep(step);
  };

  return (
    <Context.Provider
      value={{
        InvoiceStore,
        setInvoiceStore,
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

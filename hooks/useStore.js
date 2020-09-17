import StoreContext from 'context/StoreContext';
import { useState, useContext, useEffect, useRef } from 'react';
import {
  Controls,
  Content,
  Spinner_Rainbow,
} from 'components/Resources/Timoideas';
import { useSockets } from './useSockets';
import useDelay from './useDelay';
import { socket } from 'sockets/socket';
export const useStore = (Yape) => {
  const {
    InvoiceStore,
    setInvoiceStore,
    isStore,
    setIsStore,
    ShowStore,
    setShowStore,
    StepStore,
    setStepStore,
  } = useContext(StoreContext);
  return {
    InvoiceStore,
    setInvoiceStore,
    isStore,
    setIsStore,
    ShowStore,
    setShowStore,
    StepStore,
    setStepStore,
  };
};
//            <--=========================================================== [ Client Component ]
//            <--=========================================================== [ Client Component ]
//             -----------------------------  [ Client Component ]  -----------------------------
//            <--=========================================================== [ Client Component ]
//            <--=========================================================== [ Client Component ]
export function StoreClient({ Yape }) {
  const {
    InvoiceStore,
    ShowStore,
    StepStore,
    setStepStore,
    isStore,
    setIsStore,
  } = useStore(Yape);
  const [isHelp, setisHelp] = useState(false);

  //            <--=========================================================== [ Socket ]
  //             -----------------------------  [ Socket ]  -----------------------------
  //            <--=========================================================== [ Socket ]
  const [Codigo, setCodigo] = useState('');
  const socket = useSockets(() => {
    socket.on('store-comprobante_recivido', (ComprobanteTimestamp) => {
      console.log(ComprobanteTimestamp);
      setStepStore(3);
    });
    socket.on('store-comprobante_validado', (StoreCodigo) => {
      setCodigo(StoreCodigo);
      setStepStore(6);
    });
  });
  //            <--=========================================================== [ Boton Top ]
  //             -----------------------------  [ Boton Top ]  -----------------------------
  //            <--=========================================================== [ Boton Top ]
  const handlerButtonStore = (e) => {
    switch (StepStore) {
      case 0:
        setStepStore(StepStore + 1);
        break;
      case 1:
        break;
      case 2:
        socket.emit('store-comprobante', 'Nuevo Comprobante');
        setStepStore(StepStore + 1);
        break;
      case 4:
        setStepStore(StepStore + 1);

      default:
        break;
    }
  };
  console.log(StepStore);
  return (
    <Controls top>
      <div className="Help">
        <div
          className="HelpContainer"
          style={{ display: isHelp ? 'flex' : 'none' }}
        >
          ¿No sé pagar con Yape!
        </div>
      </div>
      <div className="Store">
        {ShowStore && (
          <>
            {/*//                        <--************************************************************************************************ [ Store CONTAINER ]
            //                 <--************************************************************************************************** [ Store CONTAINER ]
            //            <--************************************************************************************************** [ Store CONTAINER ]
            //         <===                                                        [ Store CONTAINER ]
            //            <--************************************************************************************************** [ Store CONTAINER ]
            //                 <--************************************************************************************************** [ Store CONTAINER ]
            //                        <--************************************************************************************************ [ Store CONTAINER ]*/}

            <div className="StoreHeaderContainer">
              {StepStore < 2 && (
                <>
                  <label
                    className={`StoreButtonCheckProductsCounter ${
                      StepStore === 1 && 'YapeInfoTitle'
                    }`}
                    onClick={(e) => {
                      setStepStore(0);
                    }}
                    // style={{
                    // }}
                  >
                    S/{InvoiceStore.total}
                  </label>
                  {StepStore === 0 && (
                    <button
                      className="StoreButton"
                      onClick={handlerButtonStore}
                      style={{
                        pointerEvents: StepStore < 3 ? 'visible' : 'none',
                      }}
                    >
                      {/*                               <--=============== Label MID ===============-->  */}
                      <label className={`StoreButtonStateLabelMid`}>
                        Yapear
                      </label>
                    </button>
                  )}
                </>
              )}
              {StepStore > 0 && (
                <label className="StoreButtonStateLabelTop">
                  <div className="StoreButtonCheckContainer">
                    {StepStore === 2 && <Spinner_Rainbow />}
                    <img
                      alt="Check"
                      className="StoreButtonCheck"
                      src="assets/Check.png"
                      style={{
                        display: StepStore === 2 ? 'none' : 'flex',
                        height: StepStore === 1 && '2.3vh',
                        filter: StepStore > 1 && 'grayScale(0)',
                        opacity: 0.8,
                      }}
                    />
                    {StepStore === 5 && <Spinner_Rainbow />}
                    <img
                      alt="Check"
                      className="StoreButtonCheck"
                      src="assets/Check.png"
                      style={{
                        display: StepStore === 5 ? 'none' : 'flex',
                        height: (StepStore === 3 || StepStore === 4) && '2.3vh',
                        filter: StepStore > 3 && 'grayScale(0)',
                        opacity: StepStore > 2 && 0.8,
                      }}
                    />
                    <img
                      alt="Check"
                      className="StoreButtonCheck"
                      src="assets/Check.png"
                      style={{
                        height: StepStore === 6 && '2.3vh',
                        filter: StepStore === 6 && 'grayScale(0)',
                        opacity: StepStore > 2 && 0.8,
                      }}
                    />
                  </div>
                </label>
              )}
              {/*                               <--=============== Label TOP ===============-->    */}
            </div>
            {/*//                        <--************************************************************************************************ [ Store CONTAINER ]
            //                 <--************************************************************************************************** [ Store CONTAINER ]
            //            <--************************************************************************************************** [ Store CONTAINER ]
            //         <===                                                        [ Store CONTAINER ]
            //            <--************************************************************************************************** [ Store CONTAINER ]
            //                 <--************************************************************************************************** [ Store CONTAINER ]
            //                        <--************************************************************************************************ [ Store CONTAINER ]*/}
            <div className="StoreContainer">
              <Content center flex={1}>
                {/*                                <--=============== StepsStoreComponents ===============-->                                */}
                <Content
                  flex={StepStore === 0 ? 0.1 : 9}
                  center
                  className="StoreStep"
                >
                  {StepStore === 0 && <div></div>}
                  {(StepStore === 1 || StepStore === 2) && (
                    <FirstStepStore>{Yape}</FirstStepStore>
                  )}
                  {StepStore === 3 && <SecondStepStore />}
                  {StepStore > 3 && <SecondStepStore codigo={Codigo} />}
                </Content>
                {/*                                <--=============== StoreProductsListCards ===============-->                                */}
                <Content
                  className={`StoreList ${
                    StepStore === 1 && 'StoreListReduced'
                  }`}
                  row
                  flex={1}
                >
                  {InvoiceStore.productos.map((ItemList, index) => (
                    <ProductList key={index} index={index}>
                      {ItemList}
                    </ProductList>
                  ))}
                </Content>
              </Content>
            </div>
          </>
        )}
      </div>
    </Controls>
  );
}
//            <--=========================================================== [ Products List Cards Component  ]
//             -----------------------------  [ Products List Cards Component ]  -----------------------------
//            <--=========================================================== [ Products List Cards Component ]

const ProductList = ({ index, children }) => {
  const {
    InvoiceStore,
    setInvoiceStore,
    setShowStore,
    StepStore,
    setStepStore,
  } = useStore();
  const [Cantidad, setCantidad] = useState(1);
  const [_1000, set_1000] = useState(false);
  const handlerIncrement = () => {
    setCantidad(Cantidad + 1);
  };
  let D1000 = useDelay(300, _1000);
  const handlerDecrement = () => {
    Cantidad === 1 && (setInvoiceStore.removeItem(index), set_1000(true));
    setCantidad(Cantidad - 1);
    InvoiceStore.length === 0 && setShowStore(false);
  };
  return (
    <div
      className="ProductList"
      style={{
        animation: Cantidad === 0 && 'itemsStore .3s reverse forwards',
        display: D1000 ? 'none' : 'flex',
        cursor: StepStore < 2 && 'pointer',
        background: `url(${children.producto.cover})`,
      }}
      onClick={() => {
        StepStore === 1 && setStepStore(0);
      }}
    >
      <div
        className="ControlCantidad"
        style={{ display: StepStore > 0 ? 'none' : 'flex' }}
      >
        <div className="ItemCantidadContainer">
          <label
            className="ItemCantidad"
            style={{ animation: `rotate 0.${Cantidad}s` }}
          >
            x{Cantidad}
          </label>
        </div>
        <div onClick={handlerIncrement} />
        <div onClick={handlerDecrement} />
      </div>
    </div>
  );
};
//  ---------------------------------------------------------     ////////
//  ---------------------------------------------------------    /////////
//  ---------------------------------------------------------  ////  /////
//  ---------------------------------------------------------        /////
//  ---------------------------------------------------------        /////
//  ---------------------------------------------------------        /////
//  ---------------------------------------------------------        /////
//  ---------------------------------------------------------        /////
//  ---------------------------------------------------------        /////
const FirstStepStore = ({ children }) => {
  const { StepStore, setStepStore } = useStore();
  // ----------------------------- <--=============== Input type File ===============--> -----------------------------
  const [ComprobanteData, setComprobanteData] = useState();
  let refStoreCompobanteInput = useRef();
  const handlerComprobanteInput = (e) => {
    setStepStore(StepStore + 1);
    socket.emit('store-comprobante', 'Nuevo Comprobante');
  };

  return (
    <div className="YapeInfoContainer">
      {StepStore === 1 && (
        <>
          <p className="YapeInfoNumero">{children.numero}</p>
          <p className="YapeInfoNombre">{children.nombre}</p>
          <button
            className="YapeInfoAdd"
            onClick={() => {
              setStepStore(0);
            }}
          >
            Agregar +
          </button>
          <button
            className="YapeInfoVoucher"
            onClick={() => {
              refStoreCompobanteInput.current.click();
            }}
          >
            Adjuntar Voucher
          </button>
          <input
            type="file"
            accept=".png,.jpeg,.jpg"
            className="StoreCompobanteInput"
            ref={refStoreCompobanteInput}
            onChange={handlerComprobanteInput}
          />
        </>
      )}
      {StepStore == 2 && <div className="EnviandoDatos">Enviando Datos...</div>}
    </div>
  );
};
//  ---------------------------------------------------------      ///////
//  ---------------------------------------------------------    //////////
//  ---------------------------------------------------------  ////   /////
//  ---------------------------------------------------------          /////
//  ---------------------------------------------------------         /////
//  ---------------------------------------------------------        /////
//  ---------------------------------------------------------       /////
//  ---------------------------------------------------------     ////////////
//  ---------------------------------------------------------    /////////////
const SecondStepStore = ({ codigo = 'asd2' }) => {
  const { setStepStore } = useStore();
  const [CanSubmit, setCanSubmit] = useState(true);
  const handlerSubmit = (e) => {
    e.preventDefault();
    CanSubmit ? setStepStore(5) : alert('POr favor llena todos los espacios');
  };

  return (
    <div className="SecondStepStore">
      {/* <div className="SecondStepStoreTitle">¡Gracias por tu preferencia!</div> */}
      <div className="SecondStepStoreMessage">
        Por favor, brindanos la siguiente información
      </div>
      <div className="SecondStepStoreFormContainer">
        <form className="SecondStepStoreForm" onSubmit={handlerSubmit}>
          <button className={`SecondStepStoreSubmit`}>
            <img
              alt="Ok"
              // onMouseOver={() => alert('asd')}
              style={{
                pointerEvents: CanSubmit ? 'visible' : 'none',
                filter: CanSubmit ? 'grayScale(0)' : 'grayScale(1)',
              }}
              src="assets/Submit.png"
            />
          </button>
          <div>
            <div>
              <input type="text" />
              <label>Nombre</label>
            </div>
            <div>
              <input type="text" />
              <label>Teléfono</label>
            </div>
          </div>
          <div>
            <div>
              <input type="text" />
              <label>Hoy 15</label>
            </div>
            <div>
              <input type="text" />
              <label>10:30 am</label>
            </div>
          </div>
          <div>
            <div>
              <input type="text" />
              <label>Ciudad</label>
            </div>
            <div>
              <input type="text" />
              <label>Distrito</label>
            </div>
          </div>
          <div>
            <div>
              <input type="text" />
              <label>Calle</label>
            </div>
            <div>
              <input type="text" />
              <label>Numero</label>
            </div>
          </div>
        </form>
      </div>
      <div className="SecondStepStoreCodeContainer">
        <div className="SecondStepStoreCode">
          <label>Código</label>
          <b>:</b>
          <span>
            {codigo ? (
              <label className="SecondStepStoreCodeValue">
                {codigo.toUpperCase()}
              </label>
            ) : (
              <Spinner_Rainbow />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
//            <--=========================================================== [ ADMIN COMPONENT ]
//            <--=========================================================== [ ADMIN COMPONENT ]
//             -----------------------------  [ ADMIN COMPONENT ]  -----------------------------
//            <--=========================================================== [ ADMIN COMPONENT ]
//            <--=========================================================== [ ADMIN COMPONENT ]

export function StoreAdmin({ children }) {
  const [State, setState] = useState();
  const socket = useSockets(() => {
    socket.on('store-comprobante_recivido', (comprobante) => {
      console.log(comprobante);
      setState(comprobante);
    });
    socket.on('store-comprobante_validado', (codigo) => {
      console.log(codigo);
    });
  });
  const handlerComprobanteValidador = () => {
    socket.emit('store-comprobante_validado', 'X8S5DQ');
  };
  return (
    <div className="VerifyOrdersControlContainer">
      {State}
      <button onClick={handlerComprobanteValidador}>Validar</button>
    </div>
  );
}

//            <--================================================================================================ [ Card Verify Component ]
//            <--================================================================================================ [ Card Verify Component ]
//             --------=====================================---------------------  [ Card Verify Component ]  -----------------------------
//            <--================================================================================================ [ Card Verify Component ]
//            <--================================================================================================ [ Card Verify Component ]

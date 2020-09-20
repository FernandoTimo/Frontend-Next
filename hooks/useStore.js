import StoreContext from 'context/StoreContext';
import { useState, useContext, useEffect, useRef } from 'react';
import {
  Controls,
  Content,
  Spinner_Rainbow,
  Rainbow,
} from 'components/Resources/Timoideas';
import useDelay from './useDelay';
import { socket } from 'sockets/socket';
export const useStore = () => {
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
//                        <--************************************************************************************************ [ COMPONENTE|CLIENTE ]
//                 <--************************************************************************************************** [ COMPONENTE|CLIENTE ]
//            <--************************************************************************************************** [ COMPONENTE|CLIENTE ]
//         <===                                                        [ COMPONENTE|CLIENTE ]
//            <--************************************************************************************************** [ COMPONENTE|CLIENTE ]
//                 <--************************************************************************************************** [ COMPONENTE|CLIENTE ]
//                        <--************************************************************************************************ [ COMPONENTE|CLIENTE ]
export function StoreClient({ Yape }) {
  //            <--=========================================================== [ Hooks ]
  const {
    InvoiceStore,
    ShowStore,
    StepStore,
    setStepStore,
    isStore,
    setIsStore,
  } = useStore(Yape);

  //            <--=========================================================== [ useStates ]
  const [isHelp, setisHelp] = useState(false);
  const [Codigo, setCodigo] = useState('');
  //            <--=========================================================== [ Sockets Effect ]
  useEffect(() => {
    //                             2 ==>
    socket.on('store-comprobante_recivido', (ComprobanteTimestamp) => {
      console.log(ComprobanteTimestamp);
      console.log('Comprobante Recivido en el Server');
      setStepStore(3);
    });
    //                             2 ==>
    socket.on('store-comprobante_validado', (StoreCodigo) => {
      setCodigo(StoreCodigo);
      setStepStore(2);
    });
  }, []);
  //            <--=========================================================== [ Handlers]
  //                                   1 ==>
  const handlerButtonStore = (e) => {
    setStepStore(StepStore + 1);
    socket.emit('store-init', 'Nuevo Cliente');
  };
  //            <==***************************************************************************** [ JSX COMPONENT = TIENDA|CLIENTE|COMPONENT|CLIENTE ]
  return (
    <Controls top>
      {/*                                         (1) JSX [ AYUDA = Container [~ isHelp] ] */}
      <div className="Help">
        <div
          className="HelpContainer"
          style={{ display: isHelp ? 'flex' : 'none' }}
        >
          ¿No sé pagar con Yape!
        </div>
      </div>
      {/*                                         (1) JSX [ TIENDA === Container principal [~ showStore] ] */}
      <div className="Store">
        {ShowStore && (
          <>
            {/*                                            (2) JSX [ TIENDA|CABECERA === Container [! Steps] ] */}
            <div className="StoreHeaderContainer">
              {/*                                               (3) JSX [ TIENDA|CABECERA === Yapear-Precio [~ Steps: 0,1] ] */}
              {StepStore < 2 && (
                <>
                  {/*                                                  (4) JSX [ TIENDA|CABECERA === Precio [~ Steps: 0, 1] ] */}
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
                  {/*                                                  (4) JSX [ TIENDA|CABECERA === Yapear [~ Steps: 0] ]*/}
                  {StepStore === 0 && (
                    <button
                      className="StoreButton"
                      onClick={handlerButtonStore}
                      style={{
                        pointerEvents: StepStore < 3 ? 'visible' : 'none',
                      }}
                    >
                      <label className={`StoreButtonStateLabelMid`}>
                        Yapear
                      </label>
                    </button>
                  )}
                </>
              )}
              {/*                                               (3) JSX [ TIENDA|CABECERA === Check-Steps [~ Steps>0] ] */}
              {StepStore > 0 && (
                <label className="StoreButtonStateLabelTop">
                  <div className="StoreButtonCheckContainer">
                    {/*                                                  (4) JSX [ TIENDA|CABECERA|CHECKS === First-Step [~] ] */}
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
                    {/*                                                  (4) JSX [ TIENDA|CABECERA|CHECKS === Second-Step [~] ] */}
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
                  </div>
                </label>
              )}
            </div>
            {/*                                            (2) JSX [ TIENDA|PRODUCTOS = Container [! Siempre] ] */}
            <div className="StoreContainer">
              <Content center flex={1}>
                {/*                                               (3) JSX [ TIENDA|PRODUCTOS|TOP === Componentes-Indicaciones [~Steps] ] */}
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
                {/*                                               (3) JSX [ TIENDA|PRODUCTOS|BOT === Productos [!] ] */}
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

//            <--================================================================================================ [ TIENDA|PRODUCTOS|TOP-COMPONENTS ]
//            <--================================================================================================ [ TIENDA|PRODUCTOS|TOP-COMPONENTS ]
//             --------=====================================---------------------  [ TIENDA|PRODUCTOS|TOP-COMPONENTS ]  -----------------------------
//            <--================================================================================================ [ TIENDA|PRODUCTOS|TOP-COMPONENTS ]
//            <--================================================================================================ [ TIENDA|PRODUCTOS|TOP-COMPONENTS ]

//            <--=========================================================== [ FIRSTCOMPONENT ]
//             -----------------------------  [ FIRSTCOMPONENT ]  -----------------------------
//            <--=========================================================== [ FIRSTCOMPONENT ]
const FirstStepStore = ({ children }) => {
  //            <--=========================================================== [ useStates ]
  const { StepStore, setStepStore } = useStore();
  const [urlComprobante, seturlComprobante] = useState('');
  const [ComprobanteData, setComprobanteData] = useState();
  //            <--=========================================================== [ useRefs ]
  let refStoreCompobanteInput = useRef();
  //            <--=========================================================== [ Handlers ]
  //                                   1 ==>
  const handlerComprobanteInput = (e) => {
    // se abre ventana de adjuntar comprobante
    // se valida que tenga datos
    let comprobante = e.target.files[0];
    let srcComprobante = URL.createObjectURL(comprobante);
    seturlComprobante(srcComprobante);
    // se envia el comprobante
    socket.emit('store-comprobante', 'Nuevo Comprobante');
    setStepStore(2);
    // se espera una respuesta
  };
  //            <==************************************************************************************ [ JSX COMPONENT = FIRST-COMPONENT ]
  return (
    <div className="YapeInfoContainer">
      {urlComprobante ? (
        <>
          {/*                                         (1) JSX [ FIRST|IMG === Comprobante [~ urlComprobante] ] */}
          <img
            alt="Comprobante Yape"
            src={urlComprobante}
            className="YapeInfoComprobanteImg"
          />
          <h1 className="h5">Enviando</h1>
        </>
      ) : (
        <>
          {/*                                         (1) JSX [ FIRST|YAPE === Payment-Info [~ urlComprobante] ] */}
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
            name="comprobante"
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

//            <--=========================================================== [ FIRSTCOMPONENT ]
//             -----------------------------  [ FIRSTCOMPONENT ]  -----------------------------
//            <--=========================================================== [ FIRSTCOMPONENT ]

const SecondStepStore = ({ codigo = 'asd2' }) => {
  const { setStepStore } = useStore();
  const [CanSubmit, setCanSubmit] = useState(true);
  const handlerSubmit = (e) => {
    e.preventDefault();
    CanSubmit ? setStepStore(5) : alert('POr favor llena todos los espacios');
  };
  //            <==************************************************************************************ [ JSX COMPONENT = SECOND-COMPONENT ]
  return (
    <div className="SecondStepStore">
      {/* <div className="SecondStepStoreTitle">¡Gracias por tu preferencia!</div> */}
      {/*                                         (1) JSX [ TIENDA === Mensaje [!] ] */}
      <div className="SecondStepStoreMessage">
        Por favor, brindanos la siguiente información
      </div>
      {/*                                         (1) JSX [ TIENDA === Form [~ Steps] ] */}
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
      {/*                                         (1) JSX [ TIENDA === Verified-Sale-Code [~ verified] ] */}
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
//            <--================================================================================================ [ TIENDA|PRODUCTOS|BOT-COMPONENT ]
//            <--================================================================================================ [ TIENDA|PRODUCTOS|BOT-COMPONENT ]
//             --------=====================================---------------------  [ TIENDA|PRODUCTOS|BOT-COMPONENT ]  -----------------------------
//            <--================================================================================================ [ TIENDA|PRODUCTOS|BOT-COMPONENT ]
//            <--================================================================================================ [ TIENDA|PRODUCTOS|BOT-COMPONENT ]

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
  //            <==***************************************************************************** [ JSX COMPONENT = TIENDA|CLIENTE|CLIENTE|PRODUCTS|BOT-PRODUCTLIST ]
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

//                        <--************************************************************************************************ [ COMPONENTE|ADMIN ]
//                 <--************************************************************************************************** [ COMPONENTE|ADMIN ]
//            <--************************************************************************************************** [ COMPONENTE|ADMIN ]
//         <===                                                        [ COMPONENTE|ADMIN ]
//            <--************************************************************************************************** [ COMPONENTE|ADMIN ]
//                 <--************************************************************************************************** [ COMPONENTE|ADMIN ]
//                        <--************************************************************************************************ [ COMPONENTE|ADMIN ]

export function StoreAdmin({ children }) {
  //            <--=========================================================== [ useStates ]
  const [State, setState] = useState();
  //            <--=========================================================== [ Sockets Effect ]
  useEffect(() => {
    socket.on('store-comprobante_recivido', (comprobante) => {
      console.log(comprobante);
      setState(comprobante);
    });
    socket.on('store-comprobante_validado', (codigo) => {
      console.log(codigo);
    });
  }, []);
  //            <--=========================================================== [ Handlers ]
  //                                   1 ==>
  const handlerComprobanteValidador = () => {
    socket.emit('store-comprobante_validado', 'X8S5DQ');
  };
  //            <==***************************************************************************** [ JSX COMPONENT = TIENDA|CLIENTE|COMPONENT|ADMIN ]
  return (
    <div className="StoreVerifyOrdersContainer">
      <div className="VerifyOrdersControlContainer">
        {State}
        <StoreCardOrderVerify />
      </div>
      <div className="VerifyOrdersActivityContainer">
        <div>
          <label>An</label>
        </div>
        <div>
          <label>Va</label>
        </div>
        <div>
          <label>Po</label>
        </div>
      </div>
    </div>
  );
}

//            <--================================================================================================ [ TIENDA|ADMIN|STORE|CARD-SALE-VERIFY ]
//            <--================================================================================================ [ TIENDA|ADMIN|STORE|CARD-SALE-VERIFY ]
//             --------=====================================---------------------  [ TIENDA|ADMIN|STORE|CARD-SALE-VERIFY ]  -----------------------------
//            <--================================================================================================ [ TIENDA|ADMIN|STORE|CARD-SALE-VERIFY ]
//            <--================================================================================================ [ TIENDA|ADMIN|STORE|CARD-SALE-VERIFY ]
const StoreCardOrderVerify = () => {
  return (
    <div>
      <div className="StoreCardOrderVerifyContainer">
        <Rainbow>
          <label
            className="h12 StoreCardOrderVerifyContainerTitle"
            style={{ color: '#fafafa !important' }}
          >
            Fernando
          </label>
        </Rainbow>

        <label className="h7">S/14.20</label>
        <label className="h7">D6R1W</label>
        <label className="h9">96668218</label>
        <div>
          <label className="n6">Paucarpata</label>
          <label className="n6">Av. Jesus</label>
          <label className="n6">484</label>
        </div>
        <label>Mañana</label>
        <label>hace 2min</label>
        <button>Validar</button>
        <button
          onClick={() => {
            window.open(
              `https://api.whatsapp.com/send?phone=${'966682190'}&text=Hola%20${'Fernamdo'}%20Soy%20de%20Arequipa%20estoy%20interesado%20en%20la%20tableta,%20aun%20disponible?`,
              'newwindow',
              'width=700,height=800,menubar=no,scrollbars=no,titlebar=0, top=100,left=500'
            );
          }}
        >
          Whatsapp
        </button>
      </div>
    </div>
  );
};

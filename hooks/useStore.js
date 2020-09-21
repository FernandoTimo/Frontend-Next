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
  const [Recivied, setRecivied] = useState(false);
  //            <--=========================================================== [ useRefs ]
  const RefAudio = useRef();
  //            <--=========================================================== [ Sockets Effect ]
  useEffect(() => {
    //                             2 ==>
    socket.on('store-comprobante_recivido', (ComprobanteTimestamp) => {
      console.log(ComprobanteTimestamp);
      RefAudio.current.play();
      setRecivied(true);
      // setTimeout(() => {
      //   setStepStore(3);
      // }, 90000);
    });
    //                             2 ==>
    socket.on('store-comprobante_validado', (StoreCodigo) => {
      setCodigo(StoreCodigo);
      setStepStore(6);
    });
  }, []);
  //            <--=========================================================== [ Handlers]
  //                                   1 ==>
  const handlerButtonStore = () => {
    setStepStore(StepStore + 1);
    socket.emit('store-init', 'Nuevo Cliente');
  };
  //            <==***************************************************************************** [ JSX COMPONENT = TIENDA|CLIENTE|COMPONENT|CLIENTE ]
  return (
    <Controls top>
      <audio src="assets/pristine.mp3" ref={RefAudio}></audio>
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
            {/*                                            (2) JSX [ CABECERA === Container [! Steps] ] */}
            <div className="StoreHeaderContainer">
              {/*                                               (3) JSX [ CABECERA === Yapear-Precio [~ Steps: 0,1] ] */}
              {StepStore < 2 && (
                <>
                  {/*                                                  (4) JSX [ CABECERA === Precio [~ Steps: 0, 1] ] */}
                  <label
                    className={`YapeInit ${
                      StepStore === 1 && 'TotalPriceStore'
                    }`}
                    onClick={() => {
                      setStepStore(0);
                    }}
                  >
                    {StepStore === 0 ? '¡YAPEA!' : 'S/' + InvoiceStore.total}
                  </label>
                  {/*                                                  (4) JSX [ CABECERA === Yapear [~ Steps: 0] ]*/}
                  {StepStore === 0 && (
                    <button
                      className="StoreButton"
                      onClick={handlerButtonStore}
                      style={{
                        pointerEvents: StepStore < 3 ? 'visible' : 'none',
                      }}
                    >
                      <h2 className="h8 StoreButtonStateLabelMid">
                        {InvoiceStore.total}
                      </h2>
                    </button>
                  )}
                </>
              )}
              {/*                                               (3) JSX [ CABECERA === Check-Steps [~ Steps>0] ] */}
              {StepStore > 0 && (
                <label className="StoreButtonStateLabelTop">
                  <div
                    className="StoreButtonCheckContainer"
                    style={{
                      gap: (StepStore === 2 || StepStore >= 5) && '0.1vh',
                    }}
                  >
                    {/*                                                  (4) JSX [ CHECKS === First-Step [~] ] */}
                    {StepStore === 2 && !Recivied && (
                      <Spinner_Rainbow size={2.3} />
                    )}
                    <img
                      alt="Check"
                      className="StoreButtonCheck"
                      src="assets/Check.png"
                      style={{
                        display: StepStore === 2 && !Recivied ? 'none' : 'flex',
                        height:
                          (StepStore === 1 ||
                            StepStore === 6 ||
                            StepStore === 2) &&
                          '2.3vh',
                        filter: StepStore > 1 && 'grayScale(0)',
                        opacity: 0.8,
                      }}
                    />
                    {/*                                                  (4) JSX [ CHECKS === Second-Step [~] ] */}
                    {StepStore === 5 && <Spinner_Rainbow size={2.3} />}
                    <img
                      alt="Check"
                      className="StoreButtonCheck"
                      src="assets/Check.png"
                      style={{
                        display: StepStore === 5 ? 'none' : 'flex',
                        height: StepStore >= 3 && '2.3vh',
                        filter: StepStore > 3 && 'grayScale(0)',
                        opacity: StepStore > 2 && 0.8,
                      }}
                    />
                  </div>
                </label>
              )}
            </div>
            {/*                                            (2) JSX [ PRODUCTOS = Container [! Siempre] ] */}
            <div className="StoreContainer">
              <Content center flex={1}>
                {/*                                               (3) JSX [ PRODUCTLIST|TOP === Componentes-Indicaciones [~Steps] ] */}
                <Content
                  flex={StepStore === 0 ? 0.1 : 9}
                  center
                  className="StoreStep"
                >
                  {StepStore === 0 && <div></div>}
                  {(StepStore === 1 || StepStore === 2) && (
                    <FirstStepStore Recivied={Recivied}>{Yape}</FirstStepStore>
                  )}
                  {StepStore === 3 && <SecondStepStore />}
                  {StepStore > 3 && <SecondStepStore codigo={Codigo} />}
                </Content>
                {/*                                               (3) JSX [ PRODUCTLIST|BOT === Productos [!] ] */}
                <Content
                  className={`StoreList ${
                    StepStore >= 1 && Recivied
                      ? 'StoreListReducedRecived'
                      : 'StoreListReduced'
                  }`}
                  row
                  flex={1}
                  onClick={() => setStepStore(0)}
                  style={{ pointerEvents: StepStore < 2 ? 'visible' : 'none' }}
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
const FirstStepStore = ({ Recivied, children }) => {
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
        <div className="StepTwoState">
          {/*                                         (1) JSX [ FIRST|IMG === Comprobante [~ urlComprobante] ] */}
          <div className="ComprobanteCard">
            <img
              alt="Comprobante Yape"
              src={urlComprobante}
              className="YapeInfoComprobanteImg"
            />
          </div>
          <div className="StepTwoMessage">
            <label className="h4">¡Gracias por tu preferencia!</label>
            <label className="n2">
              {Recivied ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 0,
                  }}
                >
                  <b className="n5">
                    Perfecto, acabamos de recibir tu comprobante.
                  </b>
                  <b className="h4">
                    Ahora por favor necesitamos los siguientes datos
                  </b>
                </div>
              ) : (
                `Enviando Comprobante: Esto no tardará mas de 5min `
              )}
            </label>
          </div>
        </div>
      ) : (
        <>
          {/*                                         (1) JSX [ FIRST|YAPE === Payment-Info [~ urlComprobante] ] */}
          <div className="PaymentInfoContainer">
            <p className="YapeInfoNumero">{children.numero}</p>
            <p className="YapeInfoNombre">{children.nombre}</p>
            <img
              alt="Yape"
              src="assets/YapePayment.png"
              className="PaymentSvgBackground"
            />
          </div>
          <div className="SwitchStepsContainer">
            <label
              className="YapeInfoAdd"
              onClick={() => {
                setStepStore(0);
              }}
            >
              <img alt="Add" src="assets/Add.png" className="AddIcon" />
              <span className="SpanIcon">Añadir más</span>
            </label>
            <label
              className="YapeInfoVoucher"
              onClick={() => {
                refStoreCompobanteInput.current.click();
              }}
            >
              <img
                alt="Add"
                src="assets/Comprobante.png"
                className="CompobanteIcon"
              />
              <span className="SpanIcon">Adjuntar Voucher</span>
            </label>
          </div>
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
        background: `url('${children.producto.cover}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
        <div className="DecrementContainer" onClick={handlerDecrement} />
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
  const handlerComprobanteValidador = () => {
    socket.emit('store-comprobante_validado', 'X8S5DQ');
  };
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
        <button onClick={handlerComprobanteValidador}>Validar</button>
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

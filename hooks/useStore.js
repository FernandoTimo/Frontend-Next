import StoreContext from 'context/StoreContext';
import { useState, useContext, useEffect, useRef } from 'react';
import { Controls, Content } from 'components/Resources/Timoideas';
import { useSockets } from './useSockets';
import useDelay from './useDelay';
import { socket } from 'sockets/socket';
export const useStore = (Yape) => {
  const {
    ListStore,
    setListStore,
    isStore,
    setIsStore,
    ShowStore,
    setShowStore,
    StepStore,
    setStepStore,
  } = useContext(StoreContext);
  return {
    ListStore,
    setListStore,
    isStore,
    setIsStore,
    ShowStore,
    setShowStore,
    StepStore,
    setStepStore,
  };
};
// LADO DEL CLIENTE -------------------------
// LADO DEL CLIENTE -------------------------
// ------------------------------------------- LADO DEL CLIENTE -------------------------
// ------------------------------------------- LADO DEL CLIENTE -------------------------
// LADO DEL CLIENTE -------------------------
// LADO DEL CLIENTE -------------------------
export function StoreClient({ Yape }) {
  const {
    ListStore,
    ShowStore,
    StepStore,
    setStepStore,
    isStore,
    setIsStore,
  } = useStore(Yape);
  const ButtonMensaje = [
    'Yapear 0',
    'Adjuntar Comprobante 1',
    'Enviar Comprobante 2',
    'Enviando 3',
    'Comprobante Recivido 4',
    'Comprobante Validado 6',
  ];

  // SOOOOCKEEEEEETTTSSS ---------------------------------
  // SOOOOCKEEEEEETTTSSS ---------------------------------
  // SOOOOCKEEEEEETTTSSS ---------------------------------
  const [Codigo, setCodigo] = useState('');
  const socket = useSockets(() => {
    socket.on('store-comprobante_recivido', (ComprobanteTimestamp) => {
      console.log(ComprobanteTimestamp);
      setStepStore(4);
    });
    socket.on('store-comprobante_validado', (StoreCodigo) => {
      setCodigo(StoreCodigo);
      setStepStore(5);
    });
  });
  // BUTTTTOOOOONNNN
  // BUTTTTOOOOONNNN
  // BUTTTTOOOOONNNN
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

  return (
    <Controls top>
      <div className="Store">
        {ShowStore && (
          <div
            className="StoreContainer"
            style={{ marginTop: !isStore && '25vh' }}
          >
            {/* BotonPrincipal ------------------------ */}
            {/* -----------------  BotonPrincipal ------------------------ */}
            {/* BotonPrincipal ------------------------ */}

            <button
              className={`StoreButton ${StepStore === 0 && 'YapeStep'} ${
                StepStore === 1 && 'AdjuntarStep'
              } ${StepStore === 2 && 'EnviarStep'} 
                } `}
              onClick={handlerButtonStore}
              style={{ pointerEvents: StepStore < 3 ? 'visible' : 'none' }}
            >
              {/* Label TOP ---------------------------------------------------------- */}
              {/* --------------------- Label TOP ------------------------------------- */}
              {/* Label TOP ---------------------------------------------------------- */}
              <label className="StoreButtonStateLabelTop">
                {StepStore === 0 && (
                  <div
                    className="StoreButtonCheckProductsCounter"
                    onClick={(e) => {
                      setIsStore();
                    }}
                    style={{
                      transform: !isStore && 'scale(1.5)',
                      bottom: !isStore && '-.3vh',
                    }}
                  >
                    {ListStore.length}
                  </div>
                )}
                {StepStore > 0 && (
                  <div className="StoreButtonCheckContainer">
                    <img
                      alt="Check"
                      className="StoreButtonCheck"
                      src="assets/Check.png"
                      style={{
                        height: StepStore === 1 && '2.3vh',
                        filter: StepStore > 1 && 'grayScale(0)',
                        opacity: 0.8,
                      }}
                    />
                    {StepStore === 3 && <span>🔥</span>}
                    <img
                      alt="Check"
                      className="StoreButtonCheck"
                      src="assets/Check.png"
                      style={{
                        display: StepStore === 3 ? 'none' : 'flex',
                        height: (StepStore === 2 || StepStore === 3) && '2.3vh',
                        filter: StepStore > 3 && 'grayScale(0)',
                        opacity: StepStore > 1 && 0.8,
                      }}
                    />
                    {StepStore === 4 && <span>🔥</span>}
                    <img
                      alt="Check"
                      className="StoreButtonCheck"
                      src="assets/Check.png"
                      style={{
                        display: StepStore === 4 ? 'none' : 'flex',
                        height: StepStore === 3 && '1.5vh',
                        filter: StepStore === 5 && 'grayScale(0)',
                        opacity: StepStore > 2 && 0.8,
                      }}
                    />
                  </div>
                )}
                {/* {StepStore === 2 && ListStore.length}
                {StepStore === 3 && ListStore.length} */}
              </label>
              {/* Label MID ---------------------------------------------------------- */}
              {/* --------------------- Label MID ------------------------------------- */}
              {/* Label MID ---------------------------------------------------------- */}
              <label className={`StoreButtonStateLabelMid`}>
                {ButtonMensaje[StepStore]}
                {StepStore === 4 && <div>Validando</div>}
              </label>
              {/* Label BOT ---------------------------------------------------------- */}
              {/* --------------------- Label BOT ------------------------------------- */}
              {/* Label BOT ---------------------------------------------------------- */}
              {StepStore === 0 && (
                <label className={`StoreButtonStateLabelBot`}>
                  {'S/12.90'}
                </label>
              )}
            </button>
            <div className="StoreButtonContainer"></div>
            <Content center flex={1}>
              <Content
                flex={StepStore === 0 ? 0.1 : 9}
                center
                className="StoreStep"
              >
                {/* SSSSSSTTTTTTTTTTTTEEEEEEEEEEPPPPPPPPPSSSSSSSSSSSSSSSSSS --------------*/}
                {/* SSSSSSTTTTTTTTTTTTEEEEEEEEEEPPPPPPPPPSSSSSSSSSSSSSSSSSS --------------*/}
                {/* SSSSSSTTTTTTTTTTTTEEEEEEEEEEPPPPPPPPPSSSSSSSSSSSSSSSSSS --------------*/}
                {/* SSSSSSTTTTTTTTTTTTEEEEEEEEEEPPPPPPPPPSSSSSSSSSSSSSSSSSS --------------*/}

                {StepStore === 0 && <div></div>}
                {(StepStore === 1 || StepStore === 2) && (
                  <FirstStepStore>{Yape}</FirstStepStore>
                )}
                {StepStore === 3 && <SecondStepStore />}
                {StepStore === 4 && <SecondStepStore codigo={Codigo} />}
              </Content>

              <Content className="StoreList" row flex={1}>
                {ListStore.map((ItemList, index) => (
                  <ProductList key={index} index={index}>
                    {ItemList}
                  </ProductList>
                ))}
              </Content>
            </Content>
          </div>
        )}
      </div>
    </Controls>
  );
}
// LADO DEL ADMIN -------------------------
// LADO DEL ADMIN -------------------------
// ------------------------------------------- LADO DEL ADMIN -------------------------
// ------------------------------------------- LADO DEL ADMIN -------------------------
// LADO DEL ADMIN -------------------------
// LADO DEL ADMIN -------------------------
const ProductList = ({ index, children }) => {
  const { ListStore, setListStore, setShowStore, StepStore } = useStore();
  const [Cantidad, setCantidad] = useState(1);
  const [_1000, set_1000] = useState(false);
  const handlerIncrement = () => {
    setCantidad(Cantidad + 1);
  };
  let D1000 = useDelay(300, _1000);
  const handlerDecrement = () => {
    Cantidad === 1 && (setListStore.removeItem(index), set_1000(true));
    setCantidad(Cantidad - 1);
    ListStore.length === 0 && setShowStore(false);
  };
  return (
    <div
      className="ProductList"
      style={{
        animation: Cantidad === 0 && 'itemsStore .3s reverse forwards',
        display: D1000 ? 'none' : 'flex',
      }}
    >
      <div
        className="ControlCantidad"
        style={{ display: StepStore > 0 ? 'none' : 'flex' }}
      >
        <div className="ItemCantidadContainer">
          <label className="ItemCantidad">{Cantidad}</label>
        </div>
        <div onClick={handlerIncrement}></div>
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
      <p className="YapeInfoTitle">S/15.30</p>
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
const SecondStepStore = ({ codigo }) => {
  const [CanSubmit, setCanSubmit] = useState(false);
  const handlerSubmit = (e) => {
    e.preventDefault();
    CanSubmit ? alert('enviado') : alert('POr favor llena todos los espacios');
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
      {codigo && codigo}
    </div>
  );
};

// LADO DEL ADMINISTRADOR -------------------------|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// LADO DEL ADMINISTRADOR -------------------------|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// LADO DEL ADMINISTRADOR -------------------------|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// LADO DEL ADMINISTRADOR -------------------------|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// LADO DEL ADMINISTRADOR -------------------------|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// LADO DEL ADMINISTRADOR -------------------------|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
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
    <div className="">
      {State}
      <button onClick={handlerComprobanteValidador}>Validar</button>
    </div>
  );
}

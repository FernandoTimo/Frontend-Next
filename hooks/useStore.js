import StoreContext from 'context/StoreContext';
import { useState, useContext, useEffect, useRef } from 'react';
import { Controls, Content } from 'components/Resources/Timoideas';
import { useSockets } from './useSockets';
import useDelay from './useDelay';
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
  const { ListStore, ShowStore, StepStore, setStepStore } = useStore(Yape);
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
        refStoreCompobanteInput.current.click();
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

  // RRRRRRRREEEEEEEEEEEEEEEFFFFFFFFFFFFF   INNNNPUUUUUUTTT
  // RRRRRRRREEEEEEEEEEEEEEEFFFFFFFFFFFFF   INNNNPUUUUUUTTT
  // RRRRRRRREEEEEEEEEEEEEEEFFFFFFFFFFFFF   INNNNPUUUUUUTTT
  const [ComprobanteData, setComprobanteData] = useState();
  let refStoreCompobanteInput = useRef();
  const handlerComprobanteInput = (e) => {
    setStepStore(StepStore + 1);
  };

  return (
    <Controls top>
      <div className="Store">
        {ShowStore && (
          <div className="StoreContainer">
            {/* BotonPrincipal ------------------------ */}
            {/* -----------------  BotonPrincipal ------------------------ */}
            {/* BotonPrincipal ------------------------ */}
            <input
              type="file"
              accept="png,jpeg,jpg"
              className="StoreCompobanteInput"
              ref={refStoreCompobanteInput}
              onChange={handlerComprobanteInput}
            />
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
                  <div className="StoreButtonCheckProductsCounter">
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
                flex={StepStore > 0 ? 9 : 0.1}
                center
                className="StoreStep"
              >
                {/* SSSSSSTTTTTTTTTTTTEEEEEEEEEEPPPPPPPPPSSSSSSSSSSSSSSSSSS --------------*/}
                {/* SSSSSSTTTTTTTTTTTTEEEEEEEEEEPPPPPPPPPSSSSSSSSSSSSSSSSSS --------------*/}
                {/* SSSSSSTTTTTTTTTTTTEEEEEEEEEEPPPPPPPPPSSSSSSSSSSSSSSSSSS --------------*/}
                {/* SSSSSSTTTTTTTTTTTTEEEEEEEEEEPPPPPPPPPSSSSSSSSSSSSSSSSSS --------------*/}

                {StepStore === 0 && <div style={{}}></div>}
                {StepStore === 1 && <FirstStepStore>{Yape}</FirstStepStore>}
                {StepStore === 2 && <FirstStepStore>{Yape}</FirstStepStore>}
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
  const [ShowItem, setShowItem] = useState(true);
  const [Cantidad, setCantidad] = useState(1);
  const handlerIncrement = () => {
    setCantidad(Cantidad + 1);
  };
  useDelay(
    () => {
      setShowItem(false);
    },
    1000,
    ShowItem
  );
  const handlerDecrement = () => {
    Cantidad === 1 && setListStore.removeItem(index);
    setCantidad(Cantidad - 1);
    console.log(Cantidad, 'Cantidad');
    ListStore.length === 0 && setShowStore(false);
    console.log(ListStore.length, 'list');
  };
  return (
    <div
      className="ProductList"
      style={{
        animation: Cantidad === 0 && 'itemsStore .3s reverse forwards',
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
const FirstStepStore = ({ children }) => {
  const { setStepStore } = useStore();
  return (
    <div className="YapeInfoContainer">
      <p>{children.numero}</p>
      <p>{children.nombre}</p>
      <button
        onClick={() => {
          setStepStore(0);
        }}
      >
        Agregar más productos
      </button>
    </div>
  );
};
const SecondStepStore = ({ codigo }) => {
  return (
    <div>
      Datos CLiente
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

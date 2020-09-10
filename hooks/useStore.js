import StoreContext from 'context/StoreContext';
import { useState, useContext, useEffect } from 'react';
import { Controls, Content } from 'components/Timoideas';
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

export default function Store({ Yape }) {
  const { ListStore, ShowStore, StepStore, setStepStore } = useStore(Yape);
  const ButtonMensaje = [
    'Yapear',
    'Adjuntar Comprobante',
    'Enviar Comprobante',
    'Comprobante Recivido',
    'Comprobante Validado',
  ];
  useEffect(() => {}, ListStore);
  console.log(ListStore, 'ListStore');
  const handlerButtonStore = (e) => {
    StepStore < 3 && setStepStore(StepStore + 1);
  };
  return (
    <Controls top>
      <div className="Store">
        {ShowStore && (
          <div className="StoreContainer">
            <div className="StoreButtonContainer">
              <button className="StoreButton" onClick={handlerButtonStore}>
                {ButtonMensaje[StepStore]}
              </button>
            </div>
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

                {StepStore === 0 && <div style={{ height: 0 }}></div>}
                {StepStore === 1 && <FirstStepStore>{Yape}</FirstStepStore>}
                {StepStore === 2 && <FirstStepStore>{Yape}</FirstStepStore>}
                {StepStore === 3 && <SecondStepStore />}
                {StepStore === 4 && <ThirdStepStore />}
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
const ProductList = ({ index, children }) => {
  const { ListStore, setListStore, setShowStore, StepStore } = useStore();
  const [Cantidad, setCantidad] = useState(1);
  const handlerIncrement = () => {
    setCantidad(Cantidad + 1);
  };
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
const SecondStepStore = () => {
  return <div>Datos CLiente</div>;
};
const ThirdStepStore = () => {
  return <div>Codigo de compra</div>;
};

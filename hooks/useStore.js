import StoreContext from 'context/StoreContext';
import { useState, useContext, useEffect } from 'react';
export const useStore = (Yape) => {
  const { Store, setStore, isStore, setIsStore } = useContext(StoreContext);

  useEffect(() => {}, []);
  return {
    Store,
    setStore,
    isStore,
    setIsStore,
  };
};

function Store({ Yape }) {
  return (
    <div className="">
      <h2>Store</h2>
    </div>
  );
}
export default Store;

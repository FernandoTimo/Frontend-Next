import { createContext, useState, useEffect, useLayoutEffect } from 'react';
import { route } from 'next/dist/next-server/server/router';
const Context = createContext();
export const NavigationContextProvider = ({ children }) => {
  let routesHistory = [];
  useEffect(() => {
    !!localStorage.Routes !== false &&
      (routesHistory = localStorage.Routes.split(','));
  }, [routesHistory]);
  const [Routes, setRoute] = useState(routesHistory);
  const setRoutes = (route) => {
    let RoutesList = routesHistory;
    RoutesList.push(route);
    setRoute(RoutesList);
    localStorage.Routes = RoutesList;
  };
  return (
    <Context.Provider value={{ Routes, setRoutes }}>
      {children}
    </Context.Provider>
  );
};
export default Context;

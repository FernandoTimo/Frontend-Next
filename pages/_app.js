import 'styles/global/Global.css';
import 'styles/global/Timoideas.css';
import 'styles/global/Timoideas.min.css';
import { StoreContextProvider } from 'context/store.context';
import { Theme } from 'components/timoideas/Timoideas.components';
const App = ({ Component, pageProps }) => {
  return (
    <StoreContextProvider>
      <Theme />
      <Component {...pageProps} />
    </StoreContextProvider>
  );
};

export default App;

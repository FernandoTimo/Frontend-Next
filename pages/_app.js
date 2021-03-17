import 'styles/Global.css';
import 'styles/Timoideas.css';
import 'styles/Timoideas.min.css';
import { StoreContextProvider } from 'context/StoreContext';
import { Navigation } from 'components/Resources/Timoideas';
const App = ({ Component, pageProps }) => {
  return (
    <StoreContextProvider>
      <Navigation />
      <Component {...pageProps} />
    </StoreContextProvider>
  );
};

export default App;

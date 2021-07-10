import 'styles/global/Global.css';
import 'styles/global/Timoideas.css';
import 'styles/global/Timoideas.min.css';
import { ThemeContextProvider } from 'context/ThemeContext';
import { StoreContextProvider } from 'context/Store.context';
const App = ({ Component, pageProps }) => {
  return (
    <ThemeContextProvider>
      <StoreContextProvider>
        <Component {...pageProps} />
      </StoreContextProvider>
    </ThemeContextProvider>
  );
};

export default App;

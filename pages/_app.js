import "styles/Global.css";
import "styles/Timoideas.css";
import "styles/Timoideas.min.css";
import { ThemeContextProvider } from "context/ThemeContext";
import { StoreContextProvider } from "context/StoreContext";
import { Navigation } from "components/Resources/Timoideas";
const App = ({ Component, pageProps }) => {
  return (
    <ThemeContextProvider>
      <StoreContextProvider>
        <Navigation />
        <Component {...pageProps} />
      </StoreContextProvider>
    </ThemeContextProvider>
  );
};

export default App;

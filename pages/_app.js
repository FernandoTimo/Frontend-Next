import '../styles/Global.css';
import '../styles/Timoideas.css';
import '../styles/Timoideas.min.css';
import { ThemeContextProvider } from 'context/ThemeContext';
import { Navigation } from 'components/Timoideas';
const App = ({ Component, pageProps }) => {
  return (
    <ThemeContextProvider>
      <Navigation />
      <Component {...pageProps} />
    </ThemeContextProvider>
  );
};

export default App;

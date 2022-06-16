import 'styles/global/Fonts.css';
import 'styles/global/Global.css';
import 'styles/global/Timoideas.css';

import _Context_ from 'context/app.context';
import Theme from 'components/timoideas/Theme.component';

const App = ({ Component, pageProps }) => {
  return (
    <_Context_>
      <Theme />
      <Component {...pageProps} />
    </_Context_>
  );
};

export default App;

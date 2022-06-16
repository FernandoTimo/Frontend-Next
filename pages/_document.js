import Document, { Html, Head, Main, NextScript } from 'next/document';

class _Document extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel='preload'
            href='/fonts/lato/Lato-Black.ttf'
            as='font'
            crossOrigin=''
          />
          <link
            rel='preload'
            href='/fonts/lato/Lato-Bold.ttf'
            as='font'
            crossOrigin=''
          />
          <link
            rel='preload'
            href='/fonts/lato/Lato-Light.ttf'
            as='font'
            crossOrigin=''
          />
          <link
            rel='preload'
            href='/fonts/lato/Lato-Regular.ttf'
            as='font'
            crossOrigin=''
          />
          <link
            rel='preload'
            href='/fonts/lato/Lato-Thin.ttf'
            as='font'
            crossOrigin=''
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default _Document;

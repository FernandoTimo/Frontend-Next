import { useStore } from 'hooks/useStore';
import Head from 'next/head';
export function Header_Main() {
  const { StepStore } = useStore();
  const messages = [
    'Compra Iniciada',
    'Adjuntar Comprobante',
    '',
    '',
    '',
    'Enviando datos',
    '¡Felicidades!',
  ];
  return (
    <Head>
      <link rel="icon" href="icons/favicon.ico" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="mobile-web-app-capable" content="yes"></meta>
      <title>{`Captivant | ${messages[StepStore]}`}</title>
      <meta name="description" content="" />
    </Head>
  );
}

import style from 'styles/pages/Index.module.css';
import Head_Main from 'heads/Main.head';
import { Body } from 'components/timoideas/Timoideas.components';
import BienvenidaSockets from 'components/SocketsSaludo.component';

export default function Index() {
  return (
    <>
      <Head_Main />
      <Body>
        <h1 className={style.Title}>Frontend</h1>
        <BienvenidaSockets />
      </Body>
    </>
  );
}

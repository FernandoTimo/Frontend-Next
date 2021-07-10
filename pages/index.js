import style from 'styles/pages/Index.module.css';
import Head_Main from 'heads/Main.head';
import {
  Body,
  Section,
  Content,
  Poligon,
} from 'components/timoideas/Timoideas.components';
import BienvenidaSockets from 'components/SocketsSaludo.component';
import { useState } from 'react';

export default function Index() {
  const [A, setA] = useState(style.Left);
  const [B, setB] = useState(style.Mid);
  const [C, setC] = useState(style.Rigth);
  return (
    <>
      <Head_Main />
      <Body>
        <Section size={1}>
          <Content center flex={0.5}>
            <h1 className={style.Title}>Frontend</h1>
            <BienvenidaSockets />
          </Content>
        </Section>
      </Body>
    </>
  );
}

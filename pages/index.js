import style from 'styles/css/Index.module.css';
import { Header_Main } from 'heads/Header_Main';
import {
  Body,
  Section,
  Content,
  Poligon,
} from 'components/Resources/Timoideas';
import BienvenidaSockets from 'components/SocketsSaludo';
import { useState } from 'react';

export default function Index() {
  const [A, setA] = useState(style.Left);
  const [B, setB] = useState(style.Mid);
  const [C, setC] = useState(style.Rigth);
  return (
    <>
      <Header_Main />
      <Body>
        <Section size={1}>
          <Content center flex={0.5}>
            <h1 className={style.Title}>Frontend</h1>
            <div className={style.Carousel}>
              <div
                onClick={() => {
                  if (A !== style.Mid) {
                    B === style.Mid && setB(A);
                    C === style.Mid && setC(A);
                    setA(style.Mid);
                  }
                }}
                className={A}
              >
                <Poligon sides={8} bg={'#fa0'}>
                  A
                </Poligon>
              </div>
              <div
                onClick={() => {
                  if (B !== style.Mid) {
                    A === style.Mid && setA(B);
                    C === style.Mid && setC(B);
                    setB(style.Mid);
                  }
                }}
                className={B}
              >
                <Poligon sides={8} bg={'#fa0'}>
                  B
                </Poligon>
              </div>
              <div
                onClick={() => {
                  if (C !== style.Mid) {
                    A === style.Mid && setA(C);
                    B === style.Mid && setB(C);
                    setC(style.Mid);
                  }
                }}
                className={C}
              >
                <Poligon sides={8} bg={'#fa0'}>
                  C
                </Poligon>
              </div>
            </div>
            <BienvenidaSockets />
          </Content>
        </Section>
      </Body>
    </>
  );
}

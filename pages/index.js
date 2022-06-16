import style from 'styles/pages/index.module.css';
import Head from 'heads/main.head';
import {
  Body,
  Section,
  Content,
  SVG,
} from 'components/timoideas/Timoideas.components';
import BienvenidaSockets from 'components/sockets/SocketsSaludo.component';
import Timoideas from 'public/svg/global/timoideas.svg';

export default function Index() {
  return (
    <>
      <Head />
      <Body>
        <Section>
          <Content center flex={0.5}>
            <div className={style.Container}>
              <SVG
                heigth='5'
                width='5'
                icon={<Timoideas />}
                className={style.Icon}
              />
              <h1>Timoideas</h1>
              <h2>NEXT.JS TEMPLATE</h2>
            </div>
            <BienvenidaSockets />
          </Content>
        </Section>
      </Body>
    </>
  );
}

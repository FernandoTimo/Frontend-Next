import style from 'styles/pages/index.module.css';
import Head from 'heads/main.head';
import {
  Body,
  Section,
  Content,
} from 'components/timoideas/Timoideas.components';
import BienvenidaSockets from 'components/sockets/SocketsSaludo.component';

export default function Index() {
  return (
    <>
      <Head />
      <Body>
        <Section>
          <Content center flex={0.5}>
            <div className={style.Container}>
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

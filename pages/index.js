import style from 'styles/pages/Index.module.css';
import Head_Main from 'heads/Main.head';
import {
  Body,
  Section,
  Content,
} from 'components/timoideas/Timoideas.components';
import BienvenidaSockets from 'components/SocketsSaludo.component';

export default function Index() {
  return (
    <>
      <Head_Main />
      <Body>
        <Section>
          <Content center flex={0.5}>
            <h1 className={style.Title}>Frontend</h1>
            <BienvenidaSockets />
          </Content>
        </Section>
      </Body>
    </>
  );
}

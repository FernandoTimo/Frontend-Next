import style from 'styles/pages/index.module.css';
import Head_Main from 'heads/main.head';
import {
  Body,
  Section,
  Content,
} from 'components/timoideas/Timoideas.components';
import BienvenidaSockets from 'components/sockets/SocketsSaludo.component';

export default function Index() {
  useRouter;
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

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
import GitHub from 'public/svg/global/github.svg';

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
                className={style.Timoideas}
              />
              <h1>Timoideas</h1>
              <a
                className={style.Repo}
                href='https://github.com/FernandoTimo/Backend-Express'
                target='_blank'
                type='clean'
              >
                <SVG
                  heigth='3'
                  width='3'
                  icon={<GitHub />}
                  className={style.GitHub}
                />
                <h2>Frontend-Next</h2>
              </a>
            </div>
            <BienvenidaSockets />
          </Content>
        </Section>
      </Body>
    </>
  );
}

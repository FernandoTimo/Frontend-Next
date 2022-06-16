import style from 'styles/pages/index.module.css';
import Head from 'heads/main.head';
import { Body, Section, SVG } from 'components/timoideas/Timoideas.components';
import Sockets from 'components/timoideas/Sockets.component';
import Timoideas from 'public/svg/global/timoideas.svg';
import GitHub from 'public/svg/global/github.svg';
import { useState } from 'react';

export default function Index() {
  const [serverSockets, setserverSockets] = useState();

  return (
    <>
      <Head />
      <Body>
        <Section>
          <div
            className={`${style.Container} ${serverSockets && style.Sockets}`}
          >
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
          <Sockets state={[serverSockets, setserverSockets]} />
        </Section>
      </Body>
    </>
  );
}

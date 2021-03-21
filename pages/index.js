import style from 'styles/css/Index.module.css';
import { Header_Main } from 'heads/Header_Main';
import {
  Body,
  Section,
  Content,
  Emergente,
} from 'components/Resources/Timoideas';
import Prueba from 'components/emergentes/Prueba';
import { useState } from 'react';
// import BienvenidaSockets from 'components/BienvenidaSockets';

export default function Index() {
  const [Active, setActive] = useState(false);
  const toggleActive = () => {
    setActive(!Active);
  };
  return (
    <>
      <Header_Main />
      <Body>
        <Section size={1}>
          <Content center flex={0.5}>
            <button>asds</button>
            <Emergente
              child={<Prueba />}
              position={[1, null, null, 1]}
              active={[Active, toggleActive, true]}
            >
              <div className={style.Emergente} onClick={toggleActive}></div>
            </Emergente>
            {/* <h1 className={style.Title}>Frontend</h1>
            <BienvenidaSockets /> */}
          </Content>
        </Section>
      </Body>
    </>
  );
}

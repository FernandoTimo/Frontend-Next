import style from 'styles/css/Index.module.css';
import { Header_Main } from 'heads/Header_Main';
import {
  Body,
  Section,
  Content,
  Emergente,
} from 'components/Resources/Timoideas';
import Prueba from 'components/emergentes/Prueba';
// import BienvenidaSockets from 'components/BienvenidaSockets';

export default function Index() {
  return (
    <>
      <Header_Main />
      <Body>
        <Section size={1}>
          <Content center flex={0.5}>
            <Emergente child={<Prueba />}>
              <div>Hola</div>
            </Emergente>
            {/* <h1 className={style.Title}>Frontend</h1>
            <BienvenidaSockets /> */}
          </Content>
        </Section>
      </Body>
    </>
  );
}

import style from 'styles/css/Index.module.css';
import { Header_Main } from 'heads/Header_Main';
import { Body, Section, Content } from 'components/Resources/Timoideas';
import BienvenidaSockets from 'components/BienvenidaSockets';
import { useEffect } from 'react';
export default function Index() {
  return (
    <>
      <Header_Main />
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

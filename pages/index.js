import styleIndex from 'styles/css/Index.module.css';
import { Header_Main } from 'heads/Header_Main';
import {
  Body,
  Section,
  Content,
  Spinner_Rainbow,
} from 'components/Resources/Timoideas';
import { useEffect, useState } from 'react';
import { useDevice } from 'hooks/useDevice';
import useScroll from 'hooks/useScroll';
import { StoreClient, StoreAdmin } from 'hooks/useStore';
export default function Index() {
  return (
    <>
      <Header_Main />
      <Body>
        <StoreClient Yape={{ numero: '966682190', nombre: 'Captivant' }} />
        <Section size={1}>
          <Content center flex={0.5}>
            <Content center flex={0.5}>
              <Spinner_Rainbow></Spinner_Rainbow>
            </Content>
          </Content>
        </Section>
      </Body>
    </>
  );
}

import styleIndex from 'styles/css/Index.module.css';
import { Header_Main } from 'heads/Header_Main';
import { Body, Section, Content } from 'components/Resources/Timoideas';
import { useEffect, useState } from 'react';
import { useDevice } from 'hooks/useDevice';
import useScroll from 'hooks/useScroll';
import { StoreClient, StoreAdmin } from 'hooks/useStore';
export default function Index() {
  return (
    <>
      <Header_Main />
      <Body>
        <StoreClient Yape={{ numero: 966682190, nombre: 'Fernando Timo' }} />
        <Section size={3}></Section>
      </Body>
    </>
  );
}

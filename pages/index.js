import styleIndex from 'styles/css/Index.module.css';
import { GlobalHead } from 'heads/GlobalHead';
import { Body, Section, Content } from 'components/Timoideas';
import { useEffect, useState } from 'react';
import { useDevice } from 'hooks/useDevice';
import useScroll from 'hooks/useScroll';
import Store from 'hooks/useStore';
export default function Index() {
  return (
    <>
      <GlobalHead />
      <Body>
        <Store Yape={{ numero: 966682190, nombre: 'Fernando Timo' }} />
        <Section size={3}></Section>
      </Body>
    </>
  );
}

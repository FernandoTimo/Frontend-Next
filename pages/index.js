import styleIndex from 'styles/css/Index.module.css';
import { GlobalHead } from 'heads/GlobalHead';
import { Body, Section } from 'components/Timoideas';
import { useSockets } from 'hooks/useSockets';
import { useEffect } from 'react';
export default function Index() {
  useEffect();
  useSockets();
  return (
    <>
      <GlobalHead />
      <Body>
        <Section size={1}>Hola Mundo</Section>
      </Body>
    </>
  );
}

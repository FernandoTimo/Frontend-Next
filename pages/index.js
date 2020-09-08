import styleIndex from 'styles/css/Index.module.css';
import { GlobalHead } from 'heads/GlobalHead';
import { Body, Section, Content } from 'components/Timoideas';
import { useEffect, useState } from 'react';
import useDelay from 'hooks/useDelay';

export default function Index() {
  const [State, setState] = useState('Fernando Timo');
  useDelay(() => {
    setState('es');
  }, 1000);
  useDelay(() => {
    setState('Timoideas');
  }, 2000);
  return (
    <>
      <GlobalHead />
      <Body>
        <Section size={1}>
          <h1>{State}</h1>
        </Section>
      </Body>
    </>
  );
}

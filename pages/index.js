import styleIndex from 'styles/css/Index.module.css';
import { GlobalHead } from 'heads/GlobalHead';
import { Body, Section, Content } from 'components/Timoideas';
import { useEffect, useState } from 'react';
import useDelay from 'hooks/useDelay';

export default function Index() {
  const [State, setState] = useState('Hola');

  return (
    <>
      <GlobalHead />
      <Body>
        <Section size={1}>{State}</Section>
      </Body>
    </>
  );
}

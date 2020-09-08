import styleIndex from 'styles/css/Index.module.css';
import { GlobalHead } from 'heads/GlobalHead';
import { Body, Section, Content } from 'components/Timoideas';
import { useEffect, useState } from 'react';
import useDelay from 'hooks/useDelay';
import useLocalStorage from 'hooks/useLocalStorage';

export default function Index() {
  const [State, setState] = useState('');
  const LocalStorage = useLocalStorage(State);
  return (
    <>
      <GlobalHead />
      <Body>
        <Section size={1}>
          <input
            type="text"
            onChange={(e) => setState(e.target.value)}
            placeholder="local"
          />
          <h1>{LocalStorage}</h1>
        </Section>
      </Body>
    </>
  );
}

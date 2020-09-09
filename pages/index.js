import styleIndex from 'styles/css/Index.module.css';
import { GlobalHead } from 'heads/GlobalHead';
import { Body, Section, Content } from 'components/Timoideas';
import { useEffect, useState } from 'react';
import { useDevice } from 'hooks/useDevice';
export default function Index() {
  const [State, setState] = useState('');
  const { Device, Platform } = useDevice();
  return (
    <>
      <GlobalHead />
      <Body>
        <Section size={1}>
          <h1>{Device}</h1>
          <input
            type="text"
            onChange={(e) => setState(e.target.value)}
            placeholder="local"
          />
          <h1>{Platform}</h1>
        </Section>
      </Body>
    </>
  );
}

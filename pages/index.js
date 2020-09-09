import styleIndex from 'styles/css/Index.module.css';
import { GlobalHead } from 'heads/GlobalHead';
import { Body, Section, Content } from 'components/Timoideas';
import { useEffect, useState } from 'react';
import { useDevice } from 'hooks/useDevice';
import useScroll from 'hooks/useScroll';
export default function Index() {
  const [State, setState] = useState('');
  const { XScroll, YScroll } = useScroll();
  return (
    <>
      <GlobalHead />
      <Body>
        <Section size={10}>
          <div style={{ position: 'fixed', top: 0 }}>
            <h1>{XScroll}</h1>
            <input
              type="text"
              onChange={(e) => setState(e.target.value)}
              placeholder="local"
            />
            <h1>{YScroll}</h1>
          </div>
        </Section>
      </Body>
    </>
  );
}

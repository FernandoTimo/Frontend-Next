import styleIndex from 'styles/css/Index.module.css';
import { GlobalHead } from 'heads/GlobalHead';
import { Body, Section, Content } from 'components/Timoideas';
import { useEffect, useState } from 'react';
import { useDevice } from 'hooks/useDevice';
import useScroll from 'hooks/useScroll';
export default function Index() {
  const [State, setState] = useState('');
  useScroll(() => {
    console.log('500 papu');
  }, [500]);
  return (
    <>
      <GlobalHead />
      <Body>
        <Section size={3}>
          <div style={{ position: 'fixed', top: 0, background: '#fa0' }}>
            <input
              type="text"
              onChange={(e) => setState(e.target.value)}
              placeholder="local"
            />
          </div>
        </Section>
      </Body>
    </>
  );
}

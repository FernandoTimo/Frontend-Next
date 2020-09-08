import styleIndex from 'styles/css/Index.module.css';
import { GlobalHead } from 'heads/GlobalHead';
import { Body, Section, Content } from 'components/Timoideas';
import { useEffect, useState } from 'react';
import useDebounce from 'hooks/useDebounce';

export default function Index() {
  const [Activ, setActive] = useState('');
  const Debounce = useDebounce(Activ);
  return (
    <>
      <GlobalHead />
      <Body>
        <Section size={1}>
          <Content center flex={1}>
            <input
              type="text"
              onChange={(e) => setActive(e.target.value)}
              placeholder="Debounce"
            />
            <Content bg center flex={0.5}>
              <h1>{Debounce}</h1>
            </Content>
          </Content>
        </Section>
        {/* <Section size={1}>Hola Mundo</Section> */}
      </Body>
    </>
  );
}

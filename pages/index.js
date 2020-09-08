import styleIndex from 'styles/css/Index.module.css';
import { GlobalHead } from 'heads/GlobalHead';
import { Body, Section } from 'components/Timoideas';
import useCounter from 'hooks/useCounter';
import { useEffect, useState } from 'react';

export default function Index() {
  const [Activ, setActive] = useState(false);
  let numero = useCounter(490, 0, Activ);

  return (
    <>
      <GlobalHead />
      <Body>
        <Section size={1}>
          <h1>{numero}</h1>
          <button
            onClick={() => {
              setActive(!Activ);
            }}
          >
            Animar
          </button>
        </Section>
        {/* <Section size={1}>Hola Mundo</Section> */}
      </Body>
    </>
  );
}

import styleIndex from 'styles/css/Index.module.css';
import { GlobalHead } from 'heads/GlobalHead';
import { Body, Section, Content } from 'components/Timoideas';
import { useEffect, useState } from 'react';
import useDelay from 'hooks/useDelay';
import useLocalStorage from 'hooks/useLocalStorage';
import useGeolocalization from 'hooks/useGeolocalization';

export default function Index() {
  const [State, setState] = useState('');
  const { Country, City, Region, Coordenadas } = useGeolocalization();
  console.log(Coordenadas);
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
          <h1>{Country}</h1>
          <h1>{Region}</h1>
          <h1>{City}</h1>
        </Section>
      </Body>
    </>
  );
}

import styleIndex from 'styles/css/Index.module.css';
import { GlobalHead } from 'heads/GlobalHead';
import { Body, Section } from 'components/Timoideas';
import useCounter from 'hooks/useCounter';

export default function Index() {
  let numero = useCounter(84);

  return (
    <>
      <GlobalHead />
      <Body>
        <Section size={1}>
          <h1>{numero}</h1>
        </Section>
        {/* <Section size={1}>Hola Mundo</Section> */}
      </Body>
    </>
  );
}

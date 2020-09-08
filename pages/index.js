import styleIndex from 'styles/css/Index.module.css';
import { GlobalHead } from 'heads/GlobalHead';
import { Body, Section } from 'components/Timoideas';
import useCounter from 'hooks/useCounter';

export default function Index() {
  const numero = useCounter(5, 1545, 1);
  return (
    <>
      <GlobalHead />
      <Body>
        <Section size={1}>{numero}</Section>
        {/* <Section size={1}>Hola Mundo</Section> */}
      </Body>
    </>
  );
}

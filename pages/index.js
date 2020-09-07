import styleIndex from 'styles/css/Index.module.css';
import { GlobalHead } from 'heads/GlobalHead';
import { Body, Section } from 'components/Timoideas';
export default function Index() {
  return (
    <>
      <GlobalHead />
      <Body>
        <Section size={1}>Hola Mundo</Section>
      </Body>
    </>
  );
}

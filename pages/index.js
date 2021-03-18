import style from 'styles/css/Index.module.css';
import { Header_Main } from 'heads/Header_Main';
import { Body, Section, Content } from 'components/Resources/Timoideas';
import useCounter from 'hooks/useCounter';
// import BienvenidaSockets from 'components/BienvenidaSockets';

export default function Index() {
  let Number = useCounter(554, 0, true);
  return (
    <>
      <Header_Main />
      <Body>
        <Section size={1}>
          <Content center flex={0.5}>
            <h1>{Number}</h1>
            {/* <BienvenidaSockets /> */}
          </Content>
        </Section>
      </Body>
    </>
  );
}

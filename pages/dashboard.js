import style from 'styles/pages/Dashboard.module.css';
import Head_Main from 'heads/Header_Main';
import { Section, Body } from 'components/Resources/Timoideas';
export default function Dashboard() {
  return (
    <>
      <Head_Main />
      <Body>
        <Section size={1}>
          <h1>Dashboard</h1>
        </Section>
      </Body>
    </>
  );
}

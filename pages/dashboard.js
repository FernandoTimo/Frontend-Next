import style from 'styles/pages/Dashboard.module.css';
import Head_Main from 'heads/Main.head';
import { Section, Body } from 'components/timoideas/Timoideas.components';
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

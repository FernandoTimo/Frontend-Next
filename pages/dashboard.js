// import styleDashboard from 'styles/css/Dashboard.module.css';
import { Header_Main } from 'heads/Header_Main';
import { Section, Body, Content } from 'components/Resources/Timoideas';
import { StoreAdmin } from 'hooks/useStore';
export default function Dashboard() {
  return (
    <>
      <Header_Main />
      <Body>
        <Section size={1}>
          <Content center flex={1}>
            <StoreAdmin />
          </Content>
        </Section>
      </Body>
    </>
  );
}

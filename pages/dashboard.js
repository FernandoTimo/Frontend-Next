import styleDashboard from 'styles/css/Dashboard.module.css';
import { Header_Main } from 'heads/Header_Main';
import Navigation, {
  Section,
  Body,
  Content,
} from 'components/Resources/Timoideas';
import { useContext, useEffect, useState } from 'react';
import { StoreAdmin } from 'hooks/useStore';
export default function Dashboard() {
  const [Active, setActive] = useState(0);
  console.log(Active);
  return (
    <>
      <Header_Main />
      <Navigation />

      <Body>
        <Section size={1}>
          <Content
            className={styleDashboard.DashboardContainer}
            center
            flex={1}
          >
            <StoreAdmin />
          </Content>
        </Section>
      </Body>
    </>
  );
}

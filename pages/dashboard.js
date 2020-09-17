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
          <Content center flex={1}>
            <div className={styleDashboard.BrandContainer}>Logo</div>
            <Content center flex={10} row>
              <Content center row flex={1}>
                <div className={styleDashboard.Dashboard}>
                  <div className={styleDashboard.DashboardContent}>
                    {(Active === -1 && <div>Stories</div>) ||
                      (Active === 0 && (
                        <Content s center flex={1}>
                          <div className={styleDashboard.DeliveryContainer}>
                            <label>Proxima Salida</label>
                            <input
                              type="tel"
                              placeholder="No designado"
                              className={styleDashboard.DeliveryInput}
                            />
                          </div>
                        </Content>
                      )) ||
                      (Active === 1 && (
                        <Content s center flex={1}>
                          <Content s center flex={10}></Content>
                          <Content s center flex={1}>
                            <button>Agregar un nuevo Producto</button>
                          </Content>
                        </Content>
                      ))}
                  </div>
                </div>
              </Content>
            </Content>
            <Content center row flex={1}>
              <div
                className={styleDashboard.DashboardNavigation}
                style={{ marginLeft: `${Active * 2}0%` }}
              />
              <div className={styleDashboard.DashboardNavigationControls}>
                <div
                  className={styleDashboard.ControlsStories}
                  onClick={() => {
                    setActive(-1);
                  }}
                >
                  Stories
                </div>
                <div
                  className={styleDashboard.ControlsStore}
                  onClick={() => {
                    setActive(0);
                  }}
                >
                  <StoreAdmin />
                </div>
                <div
                  className={styleDashboard.ControlsStock}
                  onClick={() => {
                    setActive(1);
                  }}
                >
                  Stock
                </div>
              </div>
            </Content>
          </Content>
        </Section>
      </Body>
    </>
  );
}

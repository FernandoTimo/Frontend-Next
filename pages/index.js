import styleIndex from 'styles/css/Index.module.css';
import { Header_Main } from 'heads/Header_Main';
import { Body, Section, Content } from 'components/Resources/Timoideas';
import { useEffect, useState } from 'react';
import { socket } from 'sockets/socket';

export default function Index() {
  const [serverSockets, setserverSockets] = useState();
  useEffect(() => {
    socket.on('server', (server) => {
      setserverSockets(server);
    });
  }, []);
  return (
    <>
      <Header_Main />
      <Body>
        <Section size={1}>
          <Content center flex={0.5}>
            <h1 className={styleIndex.Title}>Frontend</h1>
            {serverSockets && (
              <>
                <label className={styleIndex.WelcomeMessage}>
                  {serverSockets.message}
                </label>
                <a
                  href="https://github.com/FernandoTimo/Backend-Express"
                  target="_blank"
                >
                  https://github.com/FernandoTimo/Backend-Express
                </a>
                <code className={styleIndex.PathCode}>
                  {serverSockets.path}
                </code>
              </>
            )}
          </Content>
        </Section>
      </Body>
    </>
  );
}

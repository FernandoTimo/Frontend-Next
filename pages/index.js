import styleIndex from 'styles/css/Index.module.css';
import { Header_Main } from 'heads/Header_Main';
import { Body, Section, Content } from 'components/Resources/Timoideas';
import { useEffect, useState } from 'react';
import { socket } from 'sockets/socket';
import fetch from 'node-fetch';
export default function Index() {
  const [serverSockets, setserverSockets] = useState();
  const [messages, setmessages] = useState({ messages: [] });
  useEffect(() => {
    socket.on('server', (server) => {
      setserverSockets(server);
    });
    socket.on('saludo', (saludo) => {
      let message = messages.messages;
      message.push(saludo);
      setmessages({ messages: message });
    });
    fetch('http://localhost:4000/products', { method: 'post' });
  }, []);
  const handlerSocketChat = () => {
    socket.emit('saludar', { message: 'Hola a todos!' });
  };
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
                <div className={styleIndex.SendersContainer}>
                  <button
                    onClick={handlerSocketChat}
                    className={styleIndex.Sender}
                  >
                    Saludar a Todos
                  </button>
                </div>
                {messages.messages.length > 0 &&
                  messages.messages.map((message) => (
                    <div>
                      <label className={styleIndex.SocketID}>
                        {message.id}:{' '}
                      </label>
                      <label className={styleIndex.SocketMessage}>
                        {message.message}
                      </label>
                    </div>
                  ))}
              </>
            )}
          </Content>
        </Section>
      </Body>
    </>
  );
}

import style from 'styles/css/Index.module.css';
import { Header_Main } from 'heads/Header_Main';
import { Body, Section, Content, Video } from 'components/Resources/Timoideas';
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
    fetch('http://localhost:4000/products', { method: 'post' }).catch((err) =>
      console.warn(err)
    );
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
            <h1 className={style.Title}>Frontend</h1>
            {serverSockets && (
              <>
                <label className={style.WelcomeMessage}>
                  {serverSockets.message}
                </label>
                <a
                  href="https://github.com/FernandoTimo/Backend-Express"
                  target="_blank"
                >
                  https://github.com/FernandoTimo/Backend-Express
                </a>
                <code className={style.PathCode}>{serverSockets.path}</code>
                <div className={style.SendersContainer}>
                  <button onClick={handlerSocketChat} className={style.Sender}>
                    Saludar a Todos
                  </button>
                </div>
                {messages.messages.length > 0 &&
                  messages.messages.map((message) => (
                    <div>
                      <label className={style.SocketID}>{message.id}: </label>
                      <label className={style.SocketMessage}>
                        {message.message}
                      </label>
                    </div>
                  ))}
              </>
            )}
          </Content>
        </Section>
        <Section size={1}>
          <Video src="asd"></Video>
        </Section>
      </Body>
    </>
  );
}

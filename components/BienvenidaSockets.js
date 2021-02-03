import style from './BienvenidaSockets.module.css';
import { useEffect, useState } from 'react';
import WelcomeSockets from 'sockets/WelcomeSockets';
function BienvenidaSockets() {
  const [serverSockets, setserverSockets] = useState();
  const [messages, setmessages] = useState({ messages: [] });
  useEffect(() => {
    WelcomeSockets(setserverSockets, setmessages);
  }, []);

  // const handlerSocketChat = () => {
  //   socket.emit('saludar', { message: 'Hola a todos!' });
  // };
  return (
    <div className={style.BienvenidaSockets}>
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
                <label className={style.SocketMessage}>{message.message}</label>
              </div>
            ))}
        </>
      )}
    </div>
  );
}
export default BienvenidaSockets;

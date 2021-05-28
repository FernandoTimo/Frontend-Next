import style from './SocketsSaludo.module.css';
import { useEffect, useState } from 'react';
import WelcomeSockets, { handlerSocketChat } from 'sockets/Saludo.socket';
function BienvenidaSockets() {
  const [serverSockets, setserverSockets] = useState();
  const [messages, setmessages] = useState({ messages: [] });
  const handlerMessages = (saludo) => {
    let message = messages.messages;
    message.push(saludo);
    setmessages({ messages: message });
  };
  useEffect(() => {
    WelcomeSockets(setserverSockets, handlerMessages);
    handlerSocketChat();
  }, []);
  return (
    <div className={style.BienvenidaSockets}>
      {serverSockets ? (
        <>
          <label className={style.WelcomeMessage}>
            {serverSockets.message}
          </label>
          <label>
            Este mensaje esta siendo enviado desde el backend creado con esta
            platilla:
          </label>
          <a
            href='https://github.com/FernandoTimo/Backend-Express'
            target='_blank'
          >
            https://github.com/FernandoTimo/Backend-Express
          </a>
          <code className={style.PathCode}>{serverSockets.path}</code>
          <a href={serverSockets.path}>code</a>
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
      ) : (
        <div className={style.Sugerencia}>
          <label className={style.PathCode}>Sockets desconectados</label>
          <label className={style.WelcomeMessage}>
            Puedes habilitarlos usando este template como Backend:
          </label>
          <a
            href='https://github.com/FernandoTimo/Backend-Express'
            target='_blank'
          >
            https://github.com/FernandoTimo/Backend-Express
          </a>
        </div>
      )}
    </div>
  );
}
export default BienvenidaSockets;

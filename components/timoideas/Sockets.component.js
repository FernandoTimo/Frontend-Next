import style from './Sockets.module.css';
import { useEffect, useState } from 'react';
import WelcomeSockets, { handlerSocketChat } from 'sockets/Saludo.socket';
import OffLine from 'public/svg/global/offline.svg';
import GitHub from 'public/svg/global/github.svg';
import { Emergente, SVG } from 'components/timoideas/Timoideas.components';

function Sockets() {
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
    <div className={style.Container}>
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
        <Emergente
          child={
            <div type='popup' className={style.PopUp}>
              <a
                href='https://github.com/FernandoTimo/Backend-Express'
                target='_blank'
              >
                <SVG
                  heigth='3'
                  width='3'
                  icon={<GitHub />}
                  className={style.GitHub}
                />
                <b>Backend-Express</b>
              </a>
              <label>Habilítalos con estos templates</label>
            </div>
          }
          position={['top', 'left']}
          translate={['0vh', 'center']}
          openOnHover={false}
          closeOnClickOutside={true}
          closeOnEscape={true}
          id={'Conection'}
        >
          <div className={style.PathCode}>
            <SVG
              heigth='2.5'
              width='2.5'
              icon={<OffLine />}
              className={style.Conection}
            />
            <label>Sockets desconectados</label>
          </div>
        </Emergente>
      )}
    </div>
  );
}
export default Sockets;

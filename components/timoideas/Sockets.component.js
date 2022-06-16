import style from './Sockets.module.css';
import { useEffect, useState } from 'react';
import WelcomeSockets, { handlerSocketChat } from 'sockets/Saludo.socket';
import OffLine from 'public/svg/global/offline.svg';
import OnLine from 'public/svg/global/online.svg';
import GitHub from 'public/svg/global/github.svg';
import {
  Emergente,
  Scroll,
  SVG,
} from 'components/timoideas/Timoideas.components';

function Sockets({ state }) {
  const [serverSockets, setserverSockets] = state;
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
      {serverSockets && (
        <div className={style.MensajesContainer}>
          <div className={style.Title}>{serverSockets.message}</div>
          <div className={style.Mensajes}>
            <div className={style.List}>
              <Scroll y gap={1} size={['4vh', '45vh']} scrollBar={true}>
                {messages.messages.length > 0 &&
                  messages.messages.map((message) => (
                    <div className={style.Bubble}>
                      <label className={style.SocketMessage}>
                        {message.id}
                      </label>
                      <label className={style.SocketID}>
                        {message.message}
                      </label>
                    </div>
                  ))}
              </Scroll>
            </div>
            <button onClick={handlerSocketChat} className={style.Sender}>
              Saludar a Todos 👋
            </button>
          </div>
        </div>
      )}

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
            {!serverSockets && <label>Habilítalos con estos templates</label>}
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
            icon={serverSockets ? <OnLine /> : <OffLine />}
            className={style.Conection}
          />
          <label>
            Sockets{serverSockets ? ' conectados' : ' desconectados'}
          </label>
        </div>
      </Emergente>
    </div>
  );
}
export default Sockets;

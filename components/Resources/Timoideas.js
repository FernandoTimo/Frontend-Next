import { useState, useEffect, Children, cloneElement, useRef } from "react";
import Link from "next/link";
import { useContext } from "react";
import { useTheme } from "hooks/useTheme";
import { useRouter } from "next/router";

const randomBG = () => {
  let hexadecimal = Math.random().toString(16).slice(2, 8);
  return "#" + hexadecimal;
};
// --- Global
export function Body({ bg, children }) {
  return (
    <div className="Body" style={{ background: bg ? randomBG() : "#fafafa" }}>
      {children}
    </div>
  );
}
export function Section({ bg, children, size }) {
  const { Theme } = useTheme();
  return (
    <section
      className="Section"
      style={{
        background: bg ? randomBG() : Theme._00_,
        color: Theme._20_,
        height: size ? `${size}00vh` : "100vh",
      }}
    >
      {children}
    </section>
  );
}
export function Content({
  bg,
  row,
  flex,
  center,
  padding,
  children,
  className,
  onClick,
  style,
}) {
  const { Theme } = useTheme();
  // if (!children) {
  //   console.warn('<Content></Content> sin contenido');
  // }
  let clases = `Content ${!!center ? "c" : ""} ${!!className ? className : ""}`;
  return (
    <div
      className={clases}
      style={{
        color: Theme._20,
        padding: padding ? padding + "vh" : 0,
        flexDirection: row ? "row" : "column",
        background: bg ? randomBG() : "transparent",
        flex: flex || 1,
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function Header({ bg, padding, height, children, center }) {
  return (
    <header
      className="Header"
      style={{
        justifyContent: center ? "center" : "start",
        alignItems: center ? "center" : "start",
        padding: padding ? padding / 2 + "vh" : 0,
        height: height ? height + "vh" : "5vh",
        background: bg ? randomBG() : "#fafafa",
      }}
    >
      {children}
    </header>
  );
}
// ---             === ===   Header    === ===

export function Footer({ bg, padding, height, children, center }) {
  return (
    <footer
      className="Footer"
      style={{
        justifyContent: center ? "center" : "start",
        alignItems: center ? "center" : "start",
        padding: padding ? padding / 2 + "vh" : 0,
        height: height ? height + "vh" : "5vh",
        background: bg ? randomBG() : Theme_00_,
      }}
    >
      {children}
    </footer>
  );
}
export function Controls({ top, row = "column", children }) {
  return (
    <div
      className="ControlsContainer"
      style={{ zIndex: top ? 2 : 1, flexDirection: row }}
    >
      {children}
    </div>
  );
}

export function Modal({
  background = "#3335",
  transition = 0,
  blur = 0,
  center,
  children,
  active = [
    true,
    () => {
      console.log("Modal desactived");
    },
  ],
}) {
  const [show, setShow] = useState(active[0]);
  useEffect(() => {
    setShow(active[0]);
  }, [active[0]]);
  const CerrarModal = (e) => {
    if (e.target.className === "ModalContainer") {
      setShow(false);
      active[1]();
    }
  };
  const Refs = useRef();
  const [ChildrenSizes, setChildrenSizes] = useState([]);
  useEffect(() => {
    setChildrenSizes([Refs.current.clientWidth, Refs.current.clientHeight]);
  }, []);
  return (
    <div
      className="ModalEmpty"
      style={{
        width: ChildrenSizes[0],
        height: ChildrenSizes[1],
      }}
    >
      <div
        className="ModalContainer"
        onClick={CerrarModal}
        tabIndex="0"
        style={{
          width: show ? "100vw" : "100%",
          height: show ? "100vh" : "100%",
          opacity: show ? "1" : "0",
          pointerEvents: show ? "visible" : "none",
          justifyContent: center ? "center" : "flexStart",
          alignItems: center ? "center" : "flexStart",
          background: background,
          backdropFilter: `blur(${blur / 3}vh)`,
          transition: transition + "s",
        }}
        ref={Refs}
      >
        {children}
      </div>
    </div>
  );
}
export function Carrousel({ bg, speed, width, height, children }) {
  // const [Slider, setSlider] = useState(0);
  // const CarrouselContainerRef = useRef();
  // const CarrouselRef = useRef();
  // const [maxScroll, setmaxScroll] = useState();
  // useEffect(() => {
  //   var CarrouselCotainerWidth = CarrouselContainerRef.current.clientWidth / 2;
  //   var CarrouselWidth = CarrouselRef.current.clientWidth / 2;
  //   // console.log(CarrouselCotainerWidth);
  //   // console.log(CarrouselWidth);
  //   setmaxScroll(CarrouselWidth + CarrouselCotainerWidth);
  // }, []);
  // const handleScroll = (e) => {
  //   e.preventDefault();
  //   let sliderValue = Math.abs(Slider);
  //   let velocidad = speed ? speed : 350;
  //   let mordisco = sliderValue > maxScroll - 350 ? maxScroll - sliderValue : 0;
  //   let movimiento =
  //     e.deltaY > 0
  //       ? mordisco === 0
  //         ? -velocidad
  //         : -(mordisco + velocidad)
  //       : mordisco === 0
  //       ? velocidad
  //       : mordisco + velocidad;
  //   movimiento !== 0 && setSlider(Slider + movimiento);
  // };

  return (
    <div
      className="CarrouselContainer"
      // onWheel={handleScroll}
      // ref={CarrouselContainerRef}
    >
      <div
        className="Carrousel"
        style={{
          width: width ? width : "auto",
          height: height ? height : "auto",
          background: bg ? randomBG() : "#fafafa",
        }}
        // ref={CarrouselRef}
      >
        {children}
      </div>
    </div>
  );
}
export function Card({ bg, children }) {
  return (
    <div className="Card" style={{ background: bg ? randomBG() : "#fafafa" }}>
      {children}
    </div>
  );
}

// --- Components
export function Form({ title, children }) {
  let data = [];
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInput = (e) => {
    data.push(e.target.name);
    console.log(data);
  };
  const childs = Children.map(children, (child) => {
    let props = {};
    if (child.type === Input_1) {
      props.func = handleInput;
      return cloneElement(child, props);
    }
    if (child.type !== Input_1) {
      return child;
    }
    if (child.type === Boton_1) {
      return;
    }
  });
  return (
    <form className="Form" onSubmit={handleSubmit}>
      <div className="TitleFormContainer">
        <h1 className="TitleForm">{title || "Formulario"}</h1>
      </div>
      {childs}
    </form>
  );
}

export function Input_1({ func, type, children, required }) {
  const [objValue, setobjValue] = useState();
  const objKey = type;

  let nombre;
  if (type === "username" || type === "name") {
    nombre = type;
    type = "text";
  }
  if (type === "edad" || type === "tel") {
    nombre = type;
    type = "number";
  }

  const handleChange = (e) => {
    setobjValue(e.target.value);
    console.log(objValue);
    console.log(objKey);
  };
  return (
    <div className="input_1">
      <input
        type={type ? type : "text"}
        spellCheck="false"
        required={required ? false : true}
        name={nombre || "input"}
        onChange={handleChange}
      />
      <span></span>
      <label>{children}</label>
    </div>
  );
}

export function Boton_1({ children }) {
  let [X, setX] = useState();
  let [Y, setY] = useState();
  let [click, setClick] = useState(false);
  const createRiple = (e) => {
    setClick(true);
    setX(e.clientX - e.target.offsetLeft);
    setY(e.clientY - e.target.offsetTop);
    setTimeout(() => {
      setClick(false);
    }, 500);
  };
  return (
    <>
      <button className="Boton_1" onClick={createRiple}>
        <div>{children}</div>
        {click ? (
          <span
            style={{ left: X, top: Y, animation: "riples .8s linear forwards" }}
          ></span>
        ) : null}
      </button>
    </>
  );
}

import NavigationContext from "context/NavigationContext";
const Router = ({ setNavigation }) => {
  const { setRoutes } = useContext(NavigationContext);
  const { Theme } = useTheme();
  const RutaRef = useRef();
  const router = useRouter();
  const handleSubmit = () => {
    const newRoute = RutaRef.current.value.replace(" ", "/");
    router.push(newRoute);
    setRoutes(newRoute);
  };
  const replaceSpaces = (e) => {
    e.target.value = e.target.value.replace(" ", "/");
  };
  const [WantToClear, setWantToClear] = useState(false);
  const [ClearHistory, setClearHistory] = useState(false);

  const clearRoutesHistory = () => {
    localStorage.clear();
    setClearHistory(true);
  };
  const handleHistory = () => {
    setWantToClear(!WantToClear);
  };
  const ClearHitoryItem = (e) => {
    e.preventDefault();
    // ocultar item on click y delete del historial
  };
  return (
    <div className="NavigationContainer">
      <div className="NavigateContainer">
        <Content center flex={1}>
          <form className="RouterInputContainer" onSubmit={handleSubmit}>
            <label
              itemRef="route"
              style={{
                color: Theme._00,
                background: Theme._20,
                transition: "0.1 s",
              }}
              className="HostNameRouter"
              onClick={clearRoutesHistory}
              onMouseOver={handleHistory}
              onMouseLeave={handleHistory}
            >
              🌴
            </label>
            <input
              type="text"
              className="RouteInput"
              style={{
                border: `0.3vh solid #0effaf`,
                color: Theme._20,
                background: Theme._00,
                boxShadow: `inset 0 0 1vh #0effaf`,
              }}
              placeholder=" "
              ref={RutaRef}
              spellCheck="false"
              autoFocus
              onChange={replaceSpaces}
            />
            {/* Agregar label on hover 'borrara historial' */}
          </form>
        </Content>
        <Content flex={5}>
          <div className="RouterContainer">
            <div className="RouterBoxContainer">
              {!!localStorage.Routes !== false &&
                localStorage.Routes.split(",").map((route, index) => (
                  <Link href={route} key={index}>
                    <a>
                      <div
                        className="RouterBox"
                        onContextMenu={ClearHitoryItem}
                        onClick={setNavigation}
                        style={{
                          background: WantToClear && "transparent",
                          opacity: WantToClear ? ".7" : "1",
                          transform: WantToClear ? "scale(.9)" : null,
                          border: WantToClear && `0.3vh solid ${Theme._20}`,
                          fontWeight: WantToClear ? "100" : "700",
                          display: ClearHistory ? "none" : "flex",
                        }}
                      >
                        {route}
                      </div>
                    </a>
                  </Link>
                ))}
            </div>
          </div>
        </Content>
      </div>
    </div>
  );
};
import { NavigationContextProvider } from "context/NavigationContext";
export const Navigation = () => {
  const [Navigate, setNavigate] = useState(false);
  const { Theme, setTheme } = useTheme();
  const handleNavigate = (e) => {
    if (e.ctrlKey === true && e.keyCode === 32) {
      setNavigate(!Navigate);
    }
  };
  useEffect(() => {
    setNavigate(false);
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", handleNavigate);
    return () => {
      document.removeEventListener("keydown", handleNavigate);
    };
  }, [Navigate]);
  const setNavigation = () => {
    setNavigate(false);
  };
  return (
    <NavigationContextProvider>
      <div className="NavigationContainer">
        <Themeas />
        {Navigate && <Router setNavigation={setNavigation} />}
      </div>
    </NavigationContextProvider>
  );
};

import Ligth from "public/theme/Ligth.json";
import Dark from "public/theme/Dark.json";

export function Themeas() {
  const getCurrentTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  useEffect(() => {
    console.log(getCurrentTheme());
    console.log(window.noFunca);
    return;
  }, []);
  const [Theme, setTheme] = useState(false);
  const onClick = () => {
    setTheme(!Theme);
    Object.keys(Theme ? Ligth : Dark).map((key) => {
      document.documentElement.style.setProperty(
        key,
        Theme ? Ligth[key] : Dark[key]
      );
    });
  };
  return (
    <span className="NavigationLabel" onClick={onClick}>
      {Theme === "light" ? "🌖" : "🌒"}
    </span>
  );
}
export default Navigation;
// verificar si la ruta ya esta en el arreglo andes de grergar a la lsita de Routues
// Agregar autocompletado

//                        <--************************************************************************************************ [ Spinners ]
//                 <--************************************************************************************************** [ Spinners ]
//            <--************************************************************************************************** [ Spinners ]
//         <===                                                        [ Spinners ]
//            <--************************************************************************************************** [ Spinners ]
//                 <--************************************************************************************************** [ Spinners ]
//                        <--************************************************************************************************ [ Spinners ]

export function Spinner_Trino({ speed, size, background }) {
  const { Theme } = useTheme();
  const Elemento = (
    <div
      className="Elementos"
      style={{
        background: background || Theme._20,
        // transform: `scale(8)`,
      }}
    />
  );
  return (
    <div
      className="SpinnerContainer"
      style={{
        animationDuration: speed ? `${speed}s` : "1s",
        // transform: `scale(8)`,
      }}
    >
      <div className="Cabeza">{Elemento}</div>
      <div className="Falda">
        {Elemento}
        {Elemento}
      </div>
    </div>
  );
}
export function Spinner_Rainbow({ size = 1.5, speed = 0.3 }) {
  return (
    <div
      className="SpinnerRainbowContainer"
      style={{
        width: size + "vh",
        height: size + "vh",
        boxShadow: `0 0 ${Math.round(size / 15)}vh #0003,
           inset 0 0 ${Math.round(size / 35)}vh #0004`,
        border: `${size / 60}vh solid #fafafa`,
        animationDuration: `${speed}s`,
      }}
    >
      <span
        style={{
          border: `${size / 60}vh solid #fafafa`,
          boxShadow: `0 0 ${Math.round(size / 15)}vh #0003,
           inset 0 0 ${Math.round(size / 35)}vh #0004`,
          border: `${size / 60}vh solid #fafafa`,
        }}
      />
    </div>
  );
}
export function Rainbow({
  padding = ".5vh 2vh",
  size = 0.2,
  bg = "#1a1a1a",
  border = 1,
  children,
}) {
  return (
    <div
      className="RainbowContainer"
      style={{ padding: `${size}vh ${size}vh`, borderRadius: `${border}vh` }}
    >
      <div
        className="Rainbow"
        style={{
          padding: padding,
          background: bg,
          borderRadius: `${border * 0.9}vh`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
//                        <--************************************************************************************************ [ REPRODUCTOR DE VIDEO ]
//                 <--************************************************************************************************** [ REPRODUCTOR DE VIDEO ]
//            <--************************************************************************************************** [ REPRODUCTOR DE VIDEO ]
//         <===                                                        [ REPRODUCTOR DE VIDEO ]
//            <--************************************************************************************************** [ REPRODUCTOR DE VIDEO ]
//                 <--************************************************************************************************** [ REPRODUCTOR DE VIDEO ]
//                        <--************************************************************************************************ [ REPRODUCTOR DE VIDEO ]

export function Video({
  src,
  cover,
  className,
  width,
  height,
  radius,
  autoPlay = false,
}) {
  const [isRunning, setisRunning] = useState(autoPlay);
  const [isFullScreen, setisFullScreen] = useState(false);
  const [isControls, setisControls] = useState(false);
  const [isSettings, setisSettings] = useState(false);
  const [TimeLinePosition, setTimeLinePosition] = useState(0);
  const [VolumenPosition, setVolumenPosition] = useState(0);
  let VideoMediaRef = useRef(null);
  let VideoRef = useRef(null);
  const toggleFullScreen = () => {
    isFullScreen
      ? (document.exitFullscreen(), setisFullScreen(false))
      : (VideoMediaRef.current.requestFullscreen(), setisFullScreen(true));
  };
  const toggleSettings = () => {
    setisSettings(!isSettings);
  };
  useEffect(() => {
    VideoRef.current.volume = 1;
  }, []);
  return (
    <div
      className="VideoContainer"
      style={{
        borderRadius: radius ? radius : "1vh",
        height: height ? height + "vh" : isFullScreen ? "100%" : "18vh",
        width: width ? width + "vh" : isFullScreen ? "100%" : "32vh",
      }}
      ref={VideoMediaRef}
      onMouseLeave={() => {
        setisControls(false);
      }}
      onMouseMove={() => {
        !isControls && setisControls(true);
        let timer = setTimeout(() => {
          setisControls(false);
        }, 1000);
        clearTimeout(timer);
      }}
    >
      <div
        className="VideoControlsContainer"
        style={{
          borderRadius: radius ? radius : "1vh",
          height: height ? height + "vh" : isFullScreen ? "100%" : "18vh",
          width: width ? width + "vh" : isFullScreen ? "100%" : "32vh",
          opacity: isControls ? 1 : 0,
          cursor: isControls ? "pointer" : "none",
        }}
      >
        <div
          className="ControlesContainerTop"
          style={{
            background: isControls
              ? "linear-gradient(#0008, transparent)"
              : "transparent",
          }}
        >
          <div className="ControlesSettingsContainer" onClick={toggleSettings}>
            <img
              alt="Settings"
              src="icons/Settings.png"
              className="SettingsIcon"
              style={{
                transform: isSettings ? "rotate(0deg)" : "rotate(-90deg)",
                width: isSettings ? "3vh" : "2vh",
                opacity: isSettings ? 1 : 0.5,
              }}
            />
          </div>
          <div
            className="ControlesVolumenContainer"
            style={{ pointerEvents: isSettings ? "none" : "visible" }}
          >
            <div
              className="ControlesVolumen"
              onMouseMove={(e) => {
                console.log(e.offsetWidth);
                console.log(e.clientX - e.target.getBoundingClientRect().left);
                setVolumenPosition(
                  e.clientX - e.target.getBoundingClientRect().left
                );
                VideoRef.current.volume =
                  Math.floor(
                    e.clientX - e.target.getBoundingClientRect().left
                  ) / 100;
              }}
              style={{
                width: isFullScreen ? "40vh" : "15vh",
                height: isFullScreen ? "3vh" : "1vh",
              }}
            >
              <div
                className="ControlesVolumenBarra"
                style={{ width: VolumenPosition + "px" }}
              >
                <label>98%</label>
              </div>
            </div>
          </div>
          <div
            className="ControlesFullScreenContainer"
            onClick={toggleFullScreen}
            style={{
              opacity: isSettings ? 0 : 1,
              pointerEvents: isSettings ? "none" : "visible",
            }}
          >
            <img
              alt="Settings"
              src="icons/FullScreen.png"
              className="FullScreenIcon"
            />
          </div>
        </div>
        <div
          className="ControlesContainerMid"
          onDoubleClick={toggleFullScreen}
          onClick={() => {
            isRunning
              ? (VideoRef.current.pause(), setisRunning(!isRunning))
              : (VideoRef.current.play(), setisRunning(!isRunning));
          }}
        >
          <div className="ControlesSettingsMenuContainer">
            <div
              className="ControlesSettingsMenu"
              style={{
                marginTop: isSettings ? "0" : "-2vh",
                opacity: isSettings ? 1 : 0,
                width: isSettings ? "70%" : "65%",
              }}
            >
              <div
                className="SettingsIcons"
                style={{ pointerEvents: isSettings ? "visible" : "none" }}
              >
                <img alt="Imagen Alternativa" src="icons/Calidad_720.png" />
                <label>Calidad</label>
              </div>
              <a
                href={"icons/Download.png"}
                download
                className="SettingsIcons"
                style={{ pointerEvents: isSettings ? "visible" : "none" }}
              >
                <img alt="Imagen Alternativa" src="icons/Download.png" />
                <label>Descargar</label>
              </a>
              <div
                className="SettingsIcons"
                style={{ pointerEvents: isSettings ? "visible" : "none" }}
              >
                <img alt="Imagen Alternativa" src="icons/Subtitulos_eng.png" />
                <label>Subtítulos</label>
              </div>
            </div>
          </div>
          {isRunning ? (
            <div className="ControlesContainerMediaStates">
              <img alt="Atras" src="icons/Pause.png" />
            </div>
          ) : (
            <div className="ControlesContainerMediaState">
              <img alt="Atras" src="icons/Play.png" />
            </div>
          )}
        </div>
        <div
          className="ControlesContainerBot"
          style={{
            opacity: isSettings ? 0 : 1,
            background: isControls
              ? "linear-gradient(transparent, #0008)"
              : "transparent",
          }}
        >
          <div className="ControlesDuracionContainer">
            <div className="ControlesVistaPreviaConainer"></div>
            <label className="ControlesDuracion">19:32 / 24:12</label>
          </div>
          <div
            className="ControlesLineaContainer"
            onMouseMove={(e) => {
              setTimeLinePosition(
                e.clientX - e.target.getBoundingClientRect().left
              );
            }}
          >
            <div className="MarkerIconContainer">
              <img
                alt="Marker"
                src="icons/TimeMarker.png"
                className="MarkerIcon"
                style={{ marginLeft: TimeLinePosition + "px" }}
              />
            </div>
            <div className="TimeLineVideoContainer"></div>
          </div>
        </div>
      </div>
      <div
        className="VideoMediaContainer"
        style={{
          borderRadius: radius ? radius : "1vh",
          height: height ? height + "vh" : isFullScreen ? "100%" : "18vh",
          width: width ? width + "vh" : isFullScreen ? "100%" : "32vh",
        }}
      >
        <video
          src="videos/Video.mp4"
          className="VideoReal"
          autoPlay={autoPlay}
          ref={VideoRef}
        />
      </div>
    </div>
  );
}
export function Poligon({ children, size = "10vh", sides = 8, bg }) {
  return (
    <div className="PoligonoContainer" style={{ width: size, height: size }}>
      <div
        className="Poligono"
        style={{
          width: size,
          height: size,
          background: bg || randomBG(),
        }}
      >
        <div className="PoligonoContent">{children}</div>
      </div>
    </div>
  );
}
//            <--=========================================================== [ Animacion ]
//             -----------------------------  [ Animacion ]  -----------------------------
//            <--=========================================================== [ Animacion ]
// import dasdwq from './createjs';
// import Aniwer from './Losa';
export function Animation({
  children,
  // animate = false,
  width = 100,
  height = 100,
  script = "script/Losa.js",
  id = "2367616E571929429CB3B8A1959D9915",
}) {
  // console.log(typeof dasdwq);
  return (
    <div
      className="AnimationContainer"
      id="animation_container"
      // ref={ContainerRef}
    >
      <canvas
        id="canvas"
        // ref={CanvasRef} width="500"
        height={height}
      ></canvas>
      <div
        id="dom_overlay_container"
        // ref={OverlayRef}
        style={{ width: `${width}px`, height: `${height}px` }}
      ></div>
      {children}
    </div>
  );
}

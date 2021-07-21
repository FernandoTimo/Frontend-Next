import { useState, useEffect, Children, cloneElement, useRef } from 'react';
const randomBG = () => {
  let hexadecimal = Math.random().toString(16).slice(2, 8);
  return '#' + hexadecimal;
};
export function Body({ show, children }) {
  return (
    <div className='Body' style={{ boxShadow: show && 'var(--show)' }}>
      {children}
    </div>
  );
}
export function Section({ show, size, children }) {
  return (
    <section
      className='Section'
      style={{
        boxShadow: show && 'var(--show-section)',
        height: size ? `${size}00vh` : 'auto',
        minHeight: size ? `${size}00vh` : '100vh',
      }}
    >
      {children}
    </section>
  );
}
export function Content({
  show,
  pd,
  row,
  flex,
  center = '',
  className = '',
  style = {},
  children,
}) {
  if (!children) console.warn('<Content></Content> sin contenido');
  let clases = `Content${center && ' c'}${className && ' ' + className}`;
  return (
    <div
      className={clases}
      style={{
        ...style,
        padding: pd && pd + 'vh',
        flexDirection: row && 'row',
        boxShadow: show && 'var(--show-content)',
        flex: flex || 1,
      }}
    >
      {children}
    </div>
  );
}

export function Header({ height = 10, children }) {
  return (
    <header
      className='Header'
      style={{
        height: height + 'vh',
      }}
    >
      {children}
    </header>
  );
}
export function Footer({ bg, height = 10, children }) {
  return (
    <footer
      className='Footer'
      style={{
        height: height + 'vh',
      }}
    >
      {children}
    </footer>
  );
}

export function Controls({ top = 1, row = 'column', children }) {
  return (
    <div
      className='ControlsContainer'
      style={{ zIndex: top, flexDirection: row }}
    >
      {children}
    </div>
  );
}
export function Modal({
  bg = 'var(--c02)',
  transition = 0,
  blur = 0,
  center,
  active = [true, () => {}, true],
  children,
}) {
  const [show, setShow] = useState(active[0]);
  const [ChildrenSizes, setChildrenSizes] = useState([]);
  const Refs = useRef();
  useEffect(() => {
    setShow(active[0]);
  }, [active[0]]);
  useEffect(() => {
    setChildrenSizes([Refs.current.clientWidth, Refs.current.clientHeight]);
  }, []);
  const CerrarModal = (e) => {
    if (e.target.className === 'ModalContainer' && active[2]) {
      setShow(false);
      active[1]();
    }
  };
  return (
    // <div
    //   className='ModalEmpty'
    //   style={{
    //     width: ChildrenSizes[0],
    //     height: ChildrenSizes[1],
    //   }}
    // >
    <div
      className='ModalContainer'
      onClick={CerrarModal}
      tabIndex='0'
      style={{
        background: bg,
        opacity: show && '1',
        width: show && '100vw',
        height: show && '100vh',
        alignItems: center && 'center',
        justifyContent: center && 'center',
        backdropFilter: `blur(${blur / 3}vh)`,
        pointerEvents: show && 'visible',
        transition: transition + 's',
      }}
      ref={Refs}
    >
      {children}
      {/* </div> */}
    </div>
  );
}
export function ColorPicker({
  position = [0, 0, 0, 0],
  active = [false, () => {}, true],
  children,
}) {
  const [CurrentColor, setCurrentColor] = useState('FA0');
  const [CurrentXPosition, setCurrentXPosition] = useState(0);
  const [CurrentYPosition, setCurrentYPosition] = useState(0);
  return (
    <div className='c'>
      {children}
      <div
        className='ColorPicker'
        style={{
          opacity: active[0] ? 1 : 0,
          pointerEvents: active[0] ? 'visible' : 'none',
          marginTop: position[0] + 'vh',
          marginRight: position[1] + 'vh',
          marginBottom: position[2] + 'vh',
          marginLeft: position[3] + 'vh',
        }}
      >
        <div className='ColorPickerContainer'>
          <div className='CurrentColorContainer'>
            <div
              className='CurrentColorColor'
              style={{ background: '#' + CurrentColor }}
              onMouseDown={(e) => {
                setCurrentXPosition(
                  e.clientX - e.target.getBoundingClientRect().left
                );
                setCurrentYPosition(
                  e.clientY - e.target.getBoundingClientRect().top
                );
              }}
            ></div>
            <div className='CurrentColorSaturation'></div>
            <div className='CurrentColorBrightness'></div>
            <div
              className='CurrentColorPreview'
              onDrag={(e) => {
                setCurrentXPosition(
                  e.clientX - e.target.getBoundingClientRect().left
                );
                setCurrentYPosition(
                  e.clientY - e.target.getBoundingClientRect().top
                );
              }}
              style={{
                transform: `translate3d(${CurrentXPosition}px, ${CurrentYPosition}px, 0px)`,
                // left: CurrentXPosition + 'px',
                // top: CurrentYPosition + 'px',
              }}
            >
              <span style={{ background: '#' + CurrentColor }} />
            </div>
          </div>
        </div>
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
      className='CarrouselContainer'
      // onWheel={handleScroll}
      // ref={CarrouselContainerRef}
    >
      <div
        className='Carrousel'
        style={{
          width: width ? width : 'auto',
          height: height ? height : 'auto',
          background: bg ? randomBG() : '#fafafa',
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
    <div className='Card' style={{ background: bg ? randomBG() : '#fafafa' }}>
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
    <form className='Form' onSubmit={handleSubmit}>
      <div className='TitleFormContainer'>
        <h1 className='TitleForm'>{title || 'Formulario'}</h1>
      </div>
      {childs}
    </form>
  );
}

export function Input_1({ func, type, children, required }) {
  const [objValue, setobjValue] = useState();
  const objKey = type;

  let nombre;
  if (type === 'username' || type === 'name') {
    nombre = type;
    type = 'text';
  }
  if (type === 'edad' || type === 'tel') {
    nombre = type;
    type = 'number';
  }
  const handleChange = (e) => {
    setobjValue(e.target.value);
    console.log(objValue);
    console.log(objKey);
  };
  return (
    <div className='input_1'>
      <input
        type={type ? type : 'text'}
        spellCheck='false'
        required={required ? false : true}
        name={nombre || 'input'}
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
      <button className='Boton_1' onClick={createRiple}>
        <div>{children}</div>
        {click ? (
          <span
            style={{ left: X, top: Y, animation: 'riples .8s linear forwards' }}
          ></span>
        ) : null}
      </button>
    </>
  );
}

import Ligth from 'public/theme/Ligth.json';
import Dark from 'public/theme/Dark.json';

export function Theme() {
  useEffect(() => {
    !!localStorage.Theme
      ? setRoot(localStorage.Theme === 'Dark' ? Dark : Ligth)
      : setSystem();
  }, []);
  const setRoot = (obj) => {
    Object.keys(obj).map((key) => {
      document.documentElement.style.setProperty(key, obj[key]);
    });
  };
  const setDark = () => {
    localStorage.Theme = 'Dark';
    setRoot(Dark);
  };
  const setLigth = () => {
    localStorage.Theme = 'Ligth';
    setRoot(Ligth);
  };
  const setSystem = () => {
    let sysPref = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      e.matches ? setDark() : setLigth();
    };
    sysPref.removeEventListener('change', handler);
    sysPref.addEventListener('change', handler);
    handler(sysPref);
  };
  return (
    <div className='ThemeContainer'>
      <span onClick={setSystem}>💻</span>
      <span onClick={setLigth}>🌖</span>
      <span onClick={setDark}>🌒</span>
    </div>
  );
}
//            <--************************************************************************************************** [ Spinners ]
//         <===                                                        [ Spinners ]
//            <--************************************************************************************************** [ Spinners ]

export function Spinner_Trino({ speed, size, background = '#fafafa' }) {
  const Elemento = (
    <div
      className='Elementos'
      style={{
        background: background,
        // transform: `scale(8)`,
      }}
    />
  );
  return (
    <div
      className='SpinnerContainer'
      style={{
        animationDuration: speed ? `${speed}s` : '1s',
        // transform: `scale(8)`,
      }}
    >
      <div className='Cabeza'>{Elemento}</div>
      <div className='Falda'>
        {Elemento}
        {Elemento}
      </div>
    </div>
  );
}
export function Spinner_Rainbow({ size = 1.5, speed = 0.3 }) {
  return (
    <div
      className='SpinnerRainbowContainer'
      style={{
        width: size + 'vh',
        height: size + 'vh',
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
  padding = '.5vh 2vh',
  size = 0.2,
  bg = '#1a1a1a',
  border = 1,
  children,
}) {
  return (
    <div
      className='RainbowContainer'
      style={{ padding: `${size}vh ${size}vh`, borderRadius: `${border}vh` }}
    >
      <div
        className='Rainbow'
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
export function Poligon({
  children,
  size = '100%',
  className = '',
  sides = 8,
  bg,
}) {
  let clases = `Poligono${className && ' ' + className}`;
  return (
    <div className='PoligonoContainer' style={{ width: size, height: size }}>
      <div
        className={clases}
        style={{
          width: size,
          height: size,
          background: bg || randomBG(),
        }}
      >
        <div className='PoligonoContent'>{children}</div>
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
  script = 'script/Losa.js',
  id = '2367616E571929429CB3B8A1959D9915',
}) {
  // console.log(typeof dasdwq);
  return (
    <div
      className='AnimationContainer'
      id='animation_container'
      // ref={ContainerRef}
    >
      <canvas
        id='canvas'
        // ref={CanvasRef} width="500"
        height={height}
      ></canvas>
      <div
        id='dom_overlay_container'
        // ref={OverlayRef}
        style={{ width: `${width}px`, height: `${height}px` }}
      ></div>
      {children}
    </div>
  );
}
export function Timoideas() {
  return (
    <div className='Timoideas'>
      <img
        alt='Timoideas Logo'
        className='TimoideasLogo'
        src='images/Timoideas.png'
      />
    </div>
  );
}
export function Emergente({
  position = [],
  active = [true, () => {}, true],
  child,
  children: parent,
}) {
  // Setting clild sizes
  const [Width, setWidth] = useState();
  const [Height, setHeight] = useState();
  const ChildRef = useRef();
  useEffect(() => {
    setWidth(ChildRef.current.clientWidth);
    setHeight(ChildRef.current.clientHeight);
  }, []);
  // Hanldler click into emergent
  useEffect(() => {
    const handlerClick = (e) => {
      if (e.target.className === 'FullScreen' && active[2]) {
        active[1]();
      }
    };
    active[2] && window.addEventListener('click', handlerClick);
    return () => {
      window.removeEventListener('click', handlerClick);
    };
  }, [active[1]]);

  return (
    <div className='EmergenteContainer'>
      <div
        className='EmergenteChild'
        ref={ChildRef}
        style={{
          opacity: active[0] ? 1 : 0,
          pointerEvents: active[0] ? 'visible' : 'none',
          top: position[0] && `calc(${-position[0]}vh + ${-Height}px)`,
          right: position[1] && `calc(${-position[1]}vh + ${-Width}px)`,
          bottom: position[2] && `calc(${-position[2]}vh + ${-Height}px)`,
          left: position[3] && `calc(${-position[3]}vh + ${-Width}px)`,
        }}
      >
        {child}
      </div>
      <div className='EmergenteParent'>{parent}</div>
      <div
        className='FullScreen'
        style={{
          pointerEvents: active[2] ? 'visible' : 'none',
          display: active[0] ? 'flex' : 'none',
        }}
      ></div>
    </div>
  );
}
export function Grid({
  children,
  center = '',
  gap = 0,
  className = '',
  rows = [0, 5],
  columns = [0, 5],
  show,
}) {
  let clases = `Grid${center && ' c'}${className && ' ' + className}`;

  // columns[0] > 0 ? console.log('mayor') : console.log('menor');
  return (
    <div
      className={clases}
      style={{
        boxShadow: show && 'var(--show-grid)',
        gap: gap + 'vh',
        // gridTemplateColumns: 'repeat(auto-fit, minmax(15vh, 1fr)) !important',
        // gridTemplateRows: `repeat(${
        //   rows[0] > 0
        //     ? `${rows[0]}, 1fr`
        //     : `auto-fit, minmax(${rows[1]}vh, 1fr)`
        // })`,
      }}
    >
      {children}
    </div>
  );
}
export function Scroll({
  children,
  x,
  y,
  className = '',
  gap,
  show,
  scrollBar = '',
}) {
  let clases = `Scroll${className && ' ' + className}${
    scrollBar && ' ScrollBarActive'
  }`;
  const refScroll = useRef();
  return (
    <div
      className={clases}
      style={{
        boxShadow: show && 'var(--show-scroll)',
        overflowX: x ? 'scroll' : 'hidden',
        overflowY: y ? 'scroll' : 'hidden',
        gap: gap && gap + 'vh',
      }}
      ref={refScroll}
      onWheel={(e) => {
        e.preventDefault();
        refScroll.current.scrollLeft += e.deltaY;
      }}
    >
      {children}
    </div>
  );
}

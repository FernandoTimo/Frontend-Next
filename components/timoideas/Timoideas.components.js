import {
  useState,
  useEffect,
  Children,
  cloneElement,
  useRef,
  useCallback,
  isValidElement,
  useLayoutEffect,
} from 'react';
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
  className = '',
  show = true,
  handlerFunction = () => {},
  closeOnClickOutside = true,
  closeOnEsc = true,
  portal = '__next',
  children,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (closeOnEsc && e.key === 'Escape') {
        handlerFunction(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  // Mount on client side
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, [show]);

  const clases = `ModalContainer ${className && ' ' + className}`;

  return mounted && show
    ? reactDom.createPortal(
        <div
          className={clases}
          onClick={(e) => {
            if (e.target === e.currentTarget && closeOnClickOutside) {
              handlerFunction(!show);
            }
          }}
          style={{ pointerEvents: closeOnClickOutside ? 'auto' : 'none' }}
        >
          {children}
        </div>,
        document.getElementById(portal)
      )
    : null;
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
import useCounter from 'hooks/useCounter.hook';
import reactDom from 'react-dom';

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
  position = ['top', 'left'],
  translate = ['0vh', '0vh'],
  child,
  className = '',
  id = '',
  group = '',
  closeOnEsc = false,
  closeOnClickOutside = false,
  openOnHover = false,

  children,
}) {
  const target_group = `target_emergente_${group}`;
  const [EmergenteState, setEmergenteState] = useState(false);
  const toggleEmergenteState = useCallback((e) => {
    if (e.target.attributes.role?.value === 'prevent') return;
    else {
      setEmergenteState((state) => {
        group && (localStorage.target_emergente = state ? '' : group);
        id && (localStorage[target_group] = state ? '' : id);
        return !state;
      });
    }
  }, []);

  const refEmergente = useRef(null);
  useEffect(() => {
    // console.log(
    //   'target_emergente',
    //   localStorage.target_emergente,
    //   group,
    //   localStorage.target_emergente === group
    // );
    // console.log('target_group', localStorage[target_group] === id);
    // localStorage.target_emergente === group && setEmergenteState(true);
    // close on escape
    const handleKeyDown = (e) => {
      if (closeOnEsc && e.key === 'Escape') {
        setEmergenteState(false);
      }
    };
    // close on click outside
    const handleClick = (e) => {
      if (
        closeOnClickOutside &&
        refEmergente.current &&
        !refEmergente.current.contains(e.className)
      ) {
        setEmergenteState(false);
      }
    };
    // window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);

    localStorage[target_group] === id && setEmergenteState(true);
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  useEffect(() => {
    const handlerClick = (e) => {
      if (
        localStorage[target_group] !== id &&
        e.target.attributes.role?.value !== 'prevent'
      ) {
        setEmergenteState(false);
      }
      if (e.target.attributes.role?.value === 'close') {
        localStorage[target_group] = '';
        setEmergenteState(false);
      }
    };
    EmergenteState && window.addEventListener('click', handlerClick);
    return () => {
      window.removeEventListener('click', handlerClick);
    };
  }, [EmergenteState]);

  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        onClick: (e) => {
          toggleEmergenteState(e);
          child.props.onClick && child.props.onClick(e);
        },
        onMouseOver: openOnHover
          ? () => {
              setEmergenteState(true);
            }
          : undefined,
        onMouseLeave: openOnHover
          ? () => {
              setEmergenteState(false);
            }
          : undefined,
      });
    }
  });
  const isCenterX = translate[1] === 'center';
  const isCenterY = translate[0] === 'center';

  const VerticalTranslate = isCenterY
    ? '50%'
    : EmergenteState
    ? `${translate[0]}`
    : `calc(${translate[0]} + 1vh)`;

  const HorizontalTranslate = isCenterX
    ? '50%'
    : EmergenteState
    ? `${translate[1]}`
    : `calc(${translate[1]} + 1vh)`;

  return (
    <div
      className={className}
      style={{ position: 'relative' }}
      ref={refEmergente}
    >
      <div
        className='Emergente'
        style={{
          opacity: EmergenteState ? 1 : 0,
          pointerEvents: EmergenteState ? 'visible' : 'none',
          transform: `translate(${
            isCenterX
              ? position[1] === 'left'
                ? '-50%'
                : '50%'
              : position[1] === 'left'
              ? '-100%'
              : '100%'
          }, ${
            isCenterY
              ? position[0] === 'top'
                ? '-50%'
                : '50%'
              : position[0] === 'top'
              ? '-100%'
              : '100%'
          }) scale(${EmergenteState ? 1 : 0.95})`,
          top: position[0] === 'top' ? VerticalTranslate : null,
          right: position[1] === 'right' ? HorizontalTranslate : null,
          bottom: position[0] === 'bottom' ? VerticalTranslate : null,
          left: position[1] === 'left' ? HorizontalTranslate : null,
        }}
      >
        {child}
      </div>
      {childrenWithProps}
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
  x = '',
  y = '',
  size = ['5vh', '10vh'],
  className = '',
  gap,
  show,
  scrollBar = false,
}) {
  let clases = `Scroll ${
    scrollBar ? ' ScrollBarActive' : ' ScrollBarInactive'
  }${className && ' ' + className}`;
  const refScroll = useRef();
  const childrenlength = Children.count(children);
  useEffect(() => {
    if (childrenlength > 0) {
      x && (refScroll.current.scrollLeft = refScroll.current.scrollWidth);
      y && (refScroll.current.scrollTop = refScroll.current.scrollHeight);
    }
  }, [childrenlength]);
  return (
    <div
      className={clases}
      style={{
        outline: show && '1px solid #aae',
        overflowX: x ? 'scroll' : 'auto',
        overflowY: y ? 'scroll' : 'auto',
        gap: gap && gap + 'vh',
        flexDirection: x ? 'row' : 'column',
        minWidth: x && size[0],
        maxWidth: x && size[1],
        minHeight: y && size[0],
        maxHeight: y && size[1],
      }}
      ref={refScroll}
      onWheel={(e) => {
        // e.preventDefault();
        // scroll to right and stop another scroll
        if (x) {
          refScroll.current.scrollLeft += e.deltaY / 4;
          e.stopPropagation();
        }
        // x && (refScroll.current.scrollLeft += e.deltaY / 4);
      }}
    >
      {children}
    </div>
  );
}
export function SVG({
  width = 5,
  height = 5,
  icon,
  className = '',
  onClick = () => {},
  onContextMenu = () => {},
}) {
  let clases = `SVGIcon${className && ' ' + className}`;
  return (
    <div
      className={clases}
      onClick={onClick}
      onContextMenu={onContextMenu}
      style={{
        width: width + 'vh',
        height: height + 'vh',
      }}
    >
      {icon}
    </div>
  );
}
export function Masonry({ gap = 1, children, className = '', columns = 5 }) {
  const clases = `Masonry${className && ' ' + className}`;
  const [ChildrenArray, setChildrenArray] = useState([]);
  const [columnsNumber, setColumnsNumber] = useState(columns);
  const [ReadyToRender, setReadyToRender] = useState(false);
  useLayoutEffect(() => {
    console.log(window.innerWidth, window.innerHeight);
    if (
      (navigator.userAgent && navigator.userAgentData.mobile) ||
      (window.innerWidth <= 600 && window.innerHeight <= 800)
    ) {
      const handlerResize = () => {
        setColumnsNumber(
          window.matchMedia('(orientation: landscape)').matches ? 5 : 2
        );
      };
      handlerResize();
      window.addEventListener('resize', handlerResize);
    } else {
      const handlerResize = () => {
        setColumnsNumber(
          (window.matchMedia('(min-width: 1600px)').matches && 5) ||
            (window.matchMedia('(min-width: 1200px)').matches && 4) ||
            (window.matchMedia('(min-width: 992px)').matches && 3) ||
            (window.matchMedia('(min-width: 768px)').matches && 3) ||
            (window.matchMedia('(min-width: 576px)').matches && 2) ||
            (window.matchMedia('(min-width: 0px)').matches && 1)
        );
      };
      handlerResize();
      window.addEventListener('resize', handlerResize);
    }
    setReadyToRender(true);
    return () => {
      window.removeEventListener('resize', handlerResize);
    };
  }, [columns]);

  useEffect(() => {
    ReadyToRender &&
      setChildrenArray(() => {
        // push into array the childrens in order to colums
        let childrens = [];
        Children.map(children, (child) => {
          if (isValidElement(child)) {
            childrens.push(child);
          }
        });
        // create array of arrays with the childrens
        let childrensArray = [];
        for (let i = 0; i < columnsNumber; i++) {
          childrensArray.push([]);
        }
        // push the childrens into the array of arrays
        childrens.forEach((child, index) => {
          childrensArray[index % columnsNumber].push(child);
        });
        return childrensArray;
      });
    return () => {};
  }, [ReadyToRender, columnsNumber]);

  return (
    <div className={clases} style={{ gap: gap + 'vh', padding: gap + 'vh' }}>
      {ReadyToRender &&
        ChildrenArray.map((childrenColumn, i) => (
          <div className='MasonryColumn' style={{ gap: gap + 'vh' }} key={i}>
            {childrenColumn.map((child) => child)}
          </div>
        ))}
    </div>
  );
}
export function Fixed({ children }) {
  return <div className='FixedContainer'>{children}</div>;
}
export function PopUp({
  children,
  size = ['30vh', '30vh'],
  className = '',
  bg = 'var(--c00)',
  shadow = 'var(--shadow)',
  radius = '3vh',
  direction = 'bottom',
}) {
  let clases = `PopUp${className && ' ' + className}${
    direction && ' PopUp' + direction
  }`;
  return (
    <div
      className={clases}
      style={{
        width: size[0],
        height: size[1],
        background: bg,
        borderRadius: radius,
        boxShadow: shadow,
      }}
    >
      {children}
    </div>
  );
}
export function Counter({ number = 0 }) {
  const Number = useCounter(number, 0, true, 10);
  return Number;
}

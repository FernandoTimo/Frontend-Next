import { Section, Content } from '../components/Resources/Timoideas';
import styleError from '../styles/css/404.module.css';
import { Header_Error } from 'heads/Header_Error';
import { useTheme } from 'hooks/useTheme';
import { useRouter } from 'next/router';
import Link from 'next/link';
export default function NotFound() {
  const { Theme } = useTheme();
  const { asPath } = useRouter();
  return (
    <>
      <Header_Error />
      <Section>
        <Content center flex={1} padding={0}>
          {/* <img
          alt="Imagen Alternativa"
          src="https://media1.giphy.com/media/3ohc19SFUdIJ0YQcLe/giphy.gif"
        /> */}
          <img
            alt="Imagen Alternativa"
            src="https://media2.giphy.com/media/3E2Qd5tJ8Nke7E25GE/200w.webp?cid=ecf05e47a086794b623eb51547c68212e913d5deec00f8fb&rid=200w.webp"
          />
          <h1 className={styleError.Title} style={{ color: Theme._20 }}>
            Error
          </h1>
          <h2
            className={styleError.Path}
            style={{ background: Theme._20, color: Theme._00 }}
          >
            {' '}
            localhost:3000{asPath}
          </h2>
          <Link href="/">
            <a className={styleError.Back}>🍄</a>
          </Link>
        </Content>
      </Section>
    </>
  );
}

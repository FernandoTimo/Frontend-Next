import { Section, Content } from '../components/Resources/Timoideas';
import styleError from '../styles/css/404.module.css';
import { Header_Error } from 'heads/Header_Error';
import { useRouter } from 'next/router';
import Link from 'next/link';
export default function NotFound() {
  const { asPath } = useRouter();
  return (
    <>
      <Header_Error />
      <Section>
        <Content center flex={1} padding={0}>
          <code className={styleError.PathCode}>
            <path>{asPath}</path> route is not being controlled
          </code>
          <Link href="/">
            <a className={styleError.Back}>Return to homepage</a>
          </Link>
        </Content>
      </Section>
    </>
  );
}

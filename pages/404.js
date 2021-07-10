import { Section, Content } from 'components/timoideas/Timoideas.components';
import style from 'styles/pages/404.module.css';
import Head_Error from 'heads/Error.head';
import { useRouter } from 'next/router';
import Link from 'next/link';
export default function NotFound() {
  const { asPath } = useRouter();
  return (
    <>
      <Head_Error />
      <Section>
        <Content center flex={1} padding={0}>
          <code className={style.PathCode}>
            <path>{asPath}</path> route is not being controlled
          </code>

          <Link href='/'>
            <a className={style.Back}>Return to homepage</a>
          </Link>
        </Content>
      </Section>
    </>
  );
}

import Head from 'next/head';
export default function Head_Main() {
  return (
    <Head>
      <link rel='icon' href='icons/favicon.ico' />
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta name='mobile-web-app-capable' content='yes'></meta>
      <title>Frontend</title>
      <meta
        name='description'
        content='Template para crear un Frontend usando Next.js.'
      />
      <meta property='og:image' content='images/Image.png'></meta>
    </Head>
  );
}

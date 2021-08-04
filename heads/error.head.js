import Head from 'next/head';
export default function Head_Error() {
  return (
    <Head>
      <link rel='icon' href='/icons/favicons/fav_error.ico' />
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <title>404</title>
      <meta name='description' content='Not URL found' />
      <meta property='og:image' content='images/og/og_error.png'></meta>
    </Head>
  );
}

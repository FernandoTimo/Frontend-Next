module.exports = {
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
    ];
  },
  // i18n: {
  //   locales: ['es-US', 'fr', 'nl-NL'],
  //   defaultLocale: 'es-US',
  // },
};

const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['vi', 'en'],
    localeDetection: false,
    defaultNS: 'translation', 
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  localePath: path.resolve('./public/locales'),
  fallbackLng: ['vi'],
};

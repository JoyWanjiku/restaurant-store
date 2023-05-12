module.exports = [
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
module.exports = ({ env }) => ({
  settings: {
    cache: {
      enabled: true,
      maxAge: 31536000, // 1 year in seconds
      cacheControl: 'public',
    },
  },
});


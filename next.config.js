// next.config.js

module.exports = {
  // Indicando ao Next.js onde encontrar as páginas
  pageExtensions: ['ts', 'tsx'],
  webpack(config) {
    config.resolve.modules.push(__dirname);
    return config;
  },
};

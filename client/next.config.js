// Workaround to fix issue of no hot-reload of next inside docker
module.exports = {
  webpack: (config, options) => {
    config.watchOptions = {
      poll: 300,
      ignored: /node_modules/,
    };
    return config;
  },
};

const {
  NODE_ENV,
  JWT_SECRET_KEY,
  PORT,
  SERVER_CONNECT,
} = process.env;

module.exports = {
  PORT: PORT || 3000,
  JWT_SECRET_KEY: NODE_ENV === 'production' ? JWT_SECRET_KEY : 'dev-secret',
  SERVER_CONNECT: NODE_ENV === 'production' ? SERVER_CONNECT : 'mongodb://localhost:27017/news-explorer-api',
};

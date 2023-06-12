const {
  PORT = 3000,
  MONGO_DB = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET,
  NODE_ENV,
} = process.env;

const SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'secret-key';

module.exports = {
  SECRET_KEY,
  PORT,
  MONGO_DB,
};

const jwt = require('jsonwebtoken');

const { customErrors } = require('../errors');
const { SECRET_KEY } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new customErrors.Unautorized('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (e) {
    next(new customErrors.Unautorized('Необходима авторизация'));
  }
  req.user = payload;

  return next();
};

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { customErrors } = require('../errors/index');
const { SECRET_KEY } = require('../utils/config');

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw customErrors.Unauthorized('Неверный логин или пароль');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return next(new customErrors.Unauthorized('Неверный логин или пароль'));
        }
        const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
          expiresIn: '7d',
        });
        return res.send({ token });
      });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email: req.body.email,
        name: req.body.name,
        password: hash,
      })
        .then((newUser) => {
          req.status(201).send({
            email: newUser.email,
            name: newUser.name,
          });
        })
        .catch((err) => {
          if (err.code === 11000) {
            return next(new customErrors.Conflict('Пользователь с таким email уже зарегистрирован'));
          }
          if (err.name === 'ValidationError') {
            return next(new customErrors.BadRequest('Переданы некорректные данные'));
          }
          return next(err);
        });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  const { _id } = req.user;
  User.findById({ _id })
    .then((user) => {
      if (!user) {
        next(new customErrors.NotFound('Пользователь с таким id не найден'));
      }
      res.send({ user });
    })
    .catch(next);
};

const patchUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true, // Возвращаем уже измененный объект
      runValidators: true, // Валидируем поля перед записью в БД
    },
  )
    .then((user) => {
      if (!user) {
        next(new customErrors.NotFound('Пользователь с таким id не найден'));
        return;
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new customErrors.BadRequest('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports = {
  login,
  createUser,
  getUserInfo,
  patchUserInfo,
};
const router = require('express').Router();
const { celebrate } = require('celebrate');

const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');

const { login, createUser } = require('../controllers/users');
const NotFound = require('../errors/not-found-error');
const { createUserValidation, loginValidation } = require('../middlewares/validation');

router.post('/signup', celebrate(createUserValidation), createUser);
router.post('/signin', celebrate(loginValidation), login);

router.use('/users', auth, userRouter); // Защищаем роутеры авторизацией
router.use('/movies', auth, movieRouter);

router.use('*', (req, res, next) => { // Выводим ошибку при запросе несуществующего роутера
  next(new NotFound('Запрошен неверный роут'));
});

module.exports = router;
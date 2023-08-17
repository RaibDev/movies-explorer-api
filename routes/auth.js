const authRouter = require('express').Router();
const { celebrate } = require('celebrate');

const { login, createUser } = require('../controllers/users');
const { createUserValidation, loginValidation } = require('../middlewares/validation');

authRouter.post('/signup', celebrate(createUserValidation), createUser);
authRouter.post('/signin', celebrate(loginValidation), login);

module.exports = authRouter;

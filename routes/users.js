const userRouter = require('express').Router();
const { celebrate } = require('celebrate');

const { getUserInfo, patchUserInfo } = require('../controllers/users');
const { patchUserInfoValidation } = require('../middlewares/validation');

userRouter.get('/me', getUserInfo);
userRouter.patch('/me', celebrate(patchUserInfoValidation), patchUserInfo);

module.exports = userRouter;

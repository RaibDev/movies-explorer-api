const { Joi } = require('celebrate');

const regexUrl = require('../utils/constants');

const patchUserInfoValidation = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Поле name должно содержать более 2 символов',
        'string.max': 'Поле name должно содержать максимум 30 символов',
        'any.required': 'Поле name должно быть заполнено',
      }),
    email: Joi.string().required().email().message({
      'string.empty': 'Поле email должно быть заполнено',
      'string.email': 'Некорректно введён email-адрес',
    }),
  }),
};

const deleteFilmValidation = {
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24)
      .messages({
        'string.hex': 'Передан некорректный id фильма',
      }),
  }),
};

const createFilmValidation = {
  body: Joi.object().keys({
    country: Joi.string().required().messages({
      'any.required': 'Поле country должно быть заполнено',
    }),
    duration: Joi.number().required().messages({
      'any.required': 'Поле duration должно быть заполнено',
    }),
    director: Joi.string().messages({
      'any.required': 'Поле не должно быть пустым',
    }).required(),
    year: Joi.string().required().messages({
      'any.required': 'Поле year должно быть заполнено',
    }),
    description: Joi.string().required().messages({
      'any.required': 'Поле description должно быть заполнено',
    }),
    image: Joi.string().required().pattern(regexUrl).messages({
      'string.dataUri': 'Передана некорректная ссылка на картинку',
    }),
    trailerLink: Joi.string().required().pattern(regexUrl).messages({
      'string.dataUri': 'Передана некорректная ссылка на трейлер',
    }),
    thumbnail: Joi.string().required().pattern(regexUrl).messages({
      'string.dataUri': 'Передана некорректная ссылка на превью',
    }),
    movieId: Joi.number().required().messages({
      'any.required': 'Поле movied должно быть заполнено',
    }),
    nameRU: Joi.string().required().messages({
      'any.required': 'Поле nameRu должно быть заполнено',
    }),
    nameEN: Joi.string().required().messages({
      'any.required': 'Поле nameEn должно быть заполнено',
    }),
  }),
};

const loginValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'Некорректный email',
      'any.required': 'Поле email не должно быть пустым',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Поле password не может быть пустым',
    }),
  }),
};

const createUserValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'Некорректный email',
      'any.required': 'Поле email не должно быть пустым',
    }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Поле name не должно быть пустым',
        'string.min': 'Поле name должно быть не менее 2 символов',
        'string.max': 'Поле name должно быть не более 30 символов',
      }),
    password: Joi.string().required().messages({
      'any.required': 'Поле password не может быть пустым',
    }),
  }),
};

module.exports = {
  patchUserInfoValidation,
  deleteFilmValidation,
  createFilmValidation,
  loginValidation,
  createUserValidation,
};

const mongoose = require('mongoose');

const regexUrl = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  direction: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validation: {
      validator: '',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validation: {
      validator: (link) => regexUrl.test(link),
      message: 'Некорректный адрес ссылки',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validation: {
      validator: (link) => regexUrl.test(link),
      message: 'Некорректный адрес ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movied: {
    type: Number,
    required: true,
  },
  nameRu: {
    type: String,
    required: true,
  },
  nameEn: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);

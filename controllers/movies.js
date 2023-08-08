const Movie = require('../models/movie');
const { customErrors } = require('../errors/index');

const getSavedFilms = (req, res, next) => {
  Movie.find({ owner: req.user._id }).then((cards) => res.status(200).send(cards.reverse()))
    .catch(next);
};

const createFilm = (req, res, next) => {
  const {
    nameRU,
    nameEN,
    trailerLink,
    country,
    director,
    duration,
    year,
    description,
    image,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  return Movie.create({
    nameRU,
    nameEN,
    trailerLink,
    country,
    director,
    duration,
    year,
    description,
    image,
    thumbnail,
    movieId,
    owner,
  })
    .then((newFilm) => res.status(201).send(newFilm))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new customErrors.BadRequest('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

const deleteFilm = (req, res, next) => {
  const { cardid } = req.params;
  const { userId } = req.user._id;

  Movie.findOne(cardid).then((card) => {
    const owner = card.owner.toString();
    if (!card) {
      next(new customErrors.NotFound('Фильм с данным id не найден'));
      return;
    }
    if (userId !== owner) {
      next(new customErrors.Conflict());
      return;
    }
    Movie.deleteOne(card).then((responce) => {
      if (responce.deletedCount === 0) {
        throw new customErrors.NotFound('Фильм с указанным id не найден');
      }
      return responce.status(200).send({ message: 'Карточка удалена' });
    });
  })
    .catch(next);
};

module.exports = {
  createFilm,
  getSavedFilms,
  deleteFilm,
};

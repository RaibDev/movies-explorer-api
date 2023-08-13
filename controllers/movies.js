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
    .then((newFilm) => {
      console.log(newFilm);
      res.status(201).send(newFilm);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        next(new customErrors.BadRequest('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

// const deleteFilm = (req, res, next) => {
//   Movie.deleteOne({ _id: req.params._id })
//     .then((movie) => {
//       if (movie.deletedCount === 0) {
//         throw new customErrors.NotFound('Фильм с указанным_id не найден.');
//       }
//       return res.send({ message: 'Фильм удален' });
//     })
//     .catch(next);
// };

const deleteFilm = (req, res, next) => {
  // const { cardid } = req.params;
  // const { userId } = req.user._id;

  Movie.findById(req.params._id)
    .then((card) => {
      console.log(card);
      const owner = card.owner.toString();
      if (!card) {
        next(new customErrors.NotFound('Фильм с данным id не найден'));
        return;
      }
      if (req.user._id !== owner) {
        next(new customErrors.Conflict('У вас недостаточно прав для удаления'));
        return;
      }
      Movie.findByIdAndDelete(req.params._id)
        .then((responce) => {
          console.log(responce);
          // if (responce.deletedCount === 0) {
          //   throw new customErrors.NotFound('Фильм с указанным id не найден');
          // }
          responce.status(200).send({ message: 'Карточка удалена' });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

// const deleteFilm = (req, res, next) => {
//   Movie.findById(req.params._id)
//     .orFail(() => {
//       throw new customErrors.NotFound('Фильм с данным id не найден');
//     })
//     .then((card) => {
//       console.log(card);
//       if (card.owner !== req.user._id) {
//         throw new customErrors.Forbidden('У вас недостаточно прав для удаления');
//       }
//       Movie.findByIdAndRemove(req.params._id)
//         .orFail(() => {
//           throw new customErrors.NotFound('Фильм с данным id не найден');
//         })
//         .then(() => {
//           res.send({ message: 'Карточка удалена' });
//         })
//         .catch((err) => next(err));
//     })
//     .catch((err) => next(err));
// };

module.exports = {
  createFilm,
  getSavedFilms,
  deleteFilm,
};

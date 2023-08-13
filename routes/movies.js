const movieRouter = require('express').Router();
const { celebrate } = require('celebrate');

const { createFilm, getSavedFilms, deleteFilm } = require('../controllers/movies');
const { deleteFilmValidation, createFilmValidation } = require('../middlewares/validation');

movieRouter.get('/', getSavedFilms);
movieRouter.post('/', celebrate(createFilmValidation), createFilm);
movieRouter.delete('/:movieId', celebrate(deleteFilmValidation), deleteFilm);

module.exports = movieRouter;

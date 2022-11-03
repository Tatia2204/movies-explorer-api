const Movie = require('../models/movie');
const { NotFoundError } = require('../errors/NotFoundError');
const { IncorrectDataError } = require('../errors/IncorrectDataError');
const { AccessError } = require('../errors/AccessError');

// GET /movies возвращает все сохранённые текущим  пользователем фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

// POST /movies создаёт фильм
// module.exports.createMovie = (req, res, next) => {
//   const owner = req.user._id;
//
//   Movie.create({ owner, ...req.body })
//     .then((movie) => res.send(movie))
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         throw new IncorrectDataError('Некорректные данные');
//       }
//       next(err);
//     })
//     .catch(next);
// };

module.exports.createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      owner,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    });
    res.send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new IncorrectDataError('Некорректные данные'));
    } else {
      next(err);
    }
  }
};

// DELETE /movies/_id удаляет сохранённый фильм по id
module.exports.deleteMovie = (req, res, next) => {
  const userId = req.user._id;
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFoundError('Фильм с указанным _id не найден');
    })
    .then((movie) => {
      if (movie.owner.toString() === userId) {
        return Movie.findByIdAndRemove(movieId)
          .then((deletedMovie) => res.send(deletedMovie))
          .catch(next);
      }
      throw new AccessError('В доступе отказано');
    })
    .catch(next);
};

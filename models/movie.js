const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: { // страна создания фильма
    type: String,
    required: true,
  },
  director: { // режиссёр фильма
    type: String,
    required: true,
  },
  duration: { // длительность фильма
    type: Number,
    required: true,
  },
  year: { // год выпуска
    type: String,
    required: true,
  },
  description: { // описание
    type: String,
    required: true,
  },
  image: { // ссылка на постер
    type: String,
    required: true,
    validate: {
      validator: (url) => isUrl(url),
      message: 'Некорректный адрес URL',
    },
  },
  trailerLink: { // ссылка на трейлер
    type: String,
    required: true,
    validate: {
      validator: (url) => isUrl(url),
      message: 'Некорректный адрес URL',
    },
  },
  thumbnail: { // мини постер
    type: String,
    required: true,
    validate: {
      validator: (url) => isUrl(url),
      message: 'Некорректный адрес URL',
    },
  },
  owner: { // _id пользователя
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: { // id фильма
    type: String,
    required: true,
  },
  nameRU: { // русское название фильма
    type: String,
    required: true,
  },
  nameEN: { // английское название фильма
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);

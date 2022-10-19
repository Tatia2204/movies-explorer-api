const { JWT_SECRET, NODE_ENV } = process.env;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { NotFoundError } = require('../errors/NotFoundError');
const { IncorrectDataError } = require('../errors/IncorrectDataError');
const { AuthError } = require('../errors/AuthError');
const { ConflictError } = require('../errors/ConflictError');

// GET /users/me возвращает информацию о пользователе
module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId).then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.send(user);
  })
    .catch(next);
};

// POST /signup создаем нового пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      } return res.send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Некорректные данные'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

// PATCH /users/me обновляет информацию о пользователе
module.exports.getUserUpdate = async (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true },
    );
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.send({ data: user });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new IncorrectDataError('Некорректные данные'));
    } else if (err.code === 11000) {
      next(new ConflictError('Пользователь с таким email уже существует'));
    } else {
      next(err);
    }
  }
};

// POST /signin авторизация пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // проверим существует ли такой email или пароль
      if (!user || !password) {
        return next(new IncorrectDataError('Неверный email или пароль.'));
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'tt-secret',
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch((err) => {
      next(new AuthError(err.message));
    });
};

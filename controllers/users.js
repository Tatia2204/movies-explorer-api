const { JWT_SECRET, NODE_ENV } = process.env;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { NotFoundError } = require('../errors/NotFoundError');
const { IncorrectDataError } = require('../errors/IncorrectDataError');
const { AuthError } = require('../errors/AuthError');
const { ConflictError } = require('../errors/ConflictError');

// GET /users/me возвращает информацию о пользователе
module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.send(user);
  } catch (err) {
    next(new AuthError(err.message));
  }
};

// POST /signup создаем нового пользователя
module.exports.createUser = async (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = User.create({
      name, email, password: passwordHash,
    });
    if (user) {
      res.send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    }
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

// PATCH /users/me обновляет информацию о пользователе
module.exports.getUserUpdate = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const userId = req.user._id;
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
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new IncorrectDataError('Неверный почта или пароль.');
    }
    const user = await User.findUserByCredentials(email, password);
    if (user) {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'tt-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    }
  } catch (err) {
    next(new AuthError(err.message));
  }
};

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const DefaultError = require('./errors/DefaultError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const { MONGOBASE } = require('./constants/constants');

const { PORT = 3000, DB_ADDRESS = MONGOBASE } = process.env;
const app = express();

app.use(cors());
app.use(helmet());
app.disable('x-powered-by');

mongoose.connect(DB_ADDRESS, () => {
  console.log('Connection successful');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', routes);

app.use(errorLogger);
app.use(errors());
app.use(DefaultError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

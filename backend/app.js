/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const app = express();

const { login, createUser } = require('./controllers/users');
const { userRouter } = require('./routes/users');
const { cardsRouter } = require('./routes/cards');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const PageNotFoundError = require('./errors/PageNotFoundError'); // 404

const regExp = /^(https?:\/\/)?([\w\d-]+\.)*[\w-]+[\\.\\:]\w+([\\/\\?\\=\\&\\#\\.]?[\w-]+)*\/?$/;

app.use(express.json());
app.use(cookieParser());
app.use(cors);

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(regExp),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardsRouter);
app.use('/', (req, res, next) => {
  next(new PageNotFoundError('Неверно написанный URL'));
});

app.use(errorLogger); // подключаем логгер ошибок

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // мидлвера обработчика ошибок

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });
  } catch (err) {
    console.log(err);
  }

  await app.listen(PORT);
  console.log(`Сервер запущен на ${PORT} порту`);
}

main();

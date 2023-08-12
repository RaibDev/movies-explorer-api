require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); // Менеджер БД
const { errors } = require('celebrate'); // Обработчик ошибок валидации
const helmet = require('helmet');
const cors = require('cors');

const { errorLogger, requestLogger } = require('./middlewares/logger');
const limiter = require('./utils/limiter');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const { PORT, MONGO_DB } = require('./utils/config');

const app = express(); // Запускаем сервер
mongoose.connect(MONGO_DB);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // Защищаем заголовки

app.use(requestLogger); // Логируем запросы
app.options('*', cors());

app.use(limiter); // Ограничиваем кол-во запросов
app.use(router); // Юзаем роуты

app.use(errorLogger); // Логируем ошибки

app.use(errors()); // Направляем ошибки в универсальный обработчик ошибок
app.use(errorHandler); // Универсальный обработчик ошибок

app.listen(PORT, () => { // Слушаем сервер на порту
  console.log(`App listening ${PORT} Port`);
});

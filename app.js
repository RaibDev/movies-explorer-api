const express = require('express');
const mongoose = require('mongoose'); // Менеджер БД
const { errors } = require('celebrate'); // Обработчик ошибок валидации

const { errorLogger, requestLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;

const app = express(); // Запускаем сервер
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', { // Подключаем Монгу

});
app.use(express.json());

app.use(requestLogger); // Логируем запросы
app.use(router); // Юзаем роуты

app.use(errorLogger); // Логируем ошибки

app.use(errors()); // Направляем ошибки в универсальный обработчик ошибок
app.use(errorHandler); // Универсальный обработчик ошибок

app.listen(PORT, () => { // Слушаем сервер на порту
  console.log(`App listening ${PORT} Port`);
});

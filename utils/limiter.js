const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  windowMS: 10 * 60 * 1000, // Выставляем лимит 10 минут
  max: 100, // Орграничиваем количество запросов за это время
  message: 'Вы превысили количество одобренных системой запросов, повторите их позже, пожалуйста', // Сообщение пользователю к 429 ошибке
  standardHeaders: true, // Возвращаем информацию в заголовок `RateLimit-*`
  legacyHeaders: false, // Отключаем заголовок `X-RateLimit-*`
});

module.exports = limiter;

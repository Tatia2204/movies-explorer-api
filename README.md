# Бэкенд Диплома Movies Explorer API
### Описание
Репозиторий для дипломной работы Movies Explorer, включающий бэкенд часть приложения со следующими возможностями: авторизации и регистрации пользователей, операции с фильмами и пользователями.

### Функционал:
**Роуты для пользователей:**
* GET /users/me — возвращает информацию о пользователе;
* PATCH /users/me — обновляет информацию о пользователе.

**Роуты для фильмов:**

* GET /movies — возвращает все фильмы из базы;
* POST /movies — создаёт фильм с переданными в теле запроса country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU и nameEN;
* DELETE /movies/:movieId — удаляет фильм по _id.

### Директории:
* /controllers – содержит файлы описания моделей пользователя и фильма;
* /models – содержит файлы описания схем пользователя и фильма;
* /routes — содержит описание основных роутов для пользователя и фильма;
* /errors – содержит описание ошибок

### Технологии:

* JavaScript:
  * Промисы (Promise);
  * Асинхронность и оптимизация;
  * Rest API;
* Node.js;
* Express;
* MongoDB;
* Сelebrate;
* Winston.

### Установка и запуск приложения:

**Клонировать репозиторий:**
git clone https://github.com/Tatia2204/movies-explorer-api.git

**Установить зависимости:**
npm install

**Запустить сервер:**
npm run start

**Запустить сервер с hot-reload:**
npm run dev

### Языки:

* JavaScript

### Библиотеки:

* Express

### База данных:

* MongoDB

### Чеклист Дипломной работы:

* [Критерии диплома веб-разработчика](https://code.s3.yandex.net/web-developer/static/new-program/web-diploma-criteria-2.0/index.html#backend)

### Ссылки:

Публичный IP - 158.160.11.90
* Backend: https://api.kami2022.nomoredomains.icu

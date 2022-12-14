# Бэкенд Диплома Movies Explorer API
### Описание
Репозиторий для дипломной работы Movies Explorer, включающий бэкенд часть приложения со следующими возможностями: авторизации и регистрации пользователей, операции с фильмами и пользователями.

Публичный IP - 158.160.11.90
* [Ссылка API](https://api.kami2022.nomoredomains.icu)

### Функционал:
**Роуты для пользователей:**
* GET /users/me — возвращает информацию о пользователе;
* PATCH /users/me — обновляет информацию о пользователе.

**Роуты для фильмов:**

* GET /movies — возвращает все фильмы из базы;
* POST /movies — создаёт фильм с переданными в теле запроса country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU и nameEN;
* DELETE /movies/:movieId — удаляет фильм по _id.

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



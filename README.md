## API для проекта [save-money](https://github.com/RenatRysaev/save-money)

**Запустить в режиме разработки**: `yarn start`

**Сделать build**: `yarn build`

### Документация endpoints.

1. **Авторизация**  
   _Request url_ - `(/api/v1/login)`  
   _Request method_ - `POST`  
   _Request payload_ - `{ token: value }`  
   _Response example_ - `{ status: 200 }`

#### Используемые зависимости

1. [Express](https://expressjs.com/) - framework for Node.js.
2. [MongoDB](https://www.mongodb.com/) - data base.
3. [Passport](http://www.passportjs.org/) - authentication for Node.js.

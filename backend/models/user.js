const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const UnauthorizedError = require('../errors/UnauthorizedError'); // 401

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: [validator.isURL, 'Неправильно заполнено поле'],
  },
  email: {
    type: String,
    required: [true, 'Поле "Email" должно быть запольнено'],
    unique: true,
    validate: [validator.isEmail, 'Неправильно заполнено поле'],
  },
  password: {
    type: String,
    select: false,
    required: [true, 'Поле "Password" должно быть запольнено'],
  },
});

// добавим метод findUserByCredentials схеме пользователя
userSchema.statics.findUserByCredentials = function (email, password) {
  // попытаемся найти пользователя по почте
  return this.findOne({ email })
    .select('+password') // this — это модель User
    .then((user) => {
      // не нашёлся — отклоняем промис
      if (!user) {
        return Promise.reject(
          new UnauthorizedError('Неправильно введен логин или пароль'),
        );
      }

      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError('Неправильные почта или пароль'),
          );
        } // отклоняем промис

        return user; // теперь user доступен
      });
    });
};

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);

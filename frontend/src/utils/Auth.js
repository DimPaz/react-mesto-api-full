// const url = "https://auth.nomoreparties.co";
const url = 'http://localhost:3000';

class Auth {
  constructor(url) {
    this._url = url;
    this._headers = {
      'Content-type': 'application/json',
      Authorization: this._token,
    };
  }

  // запрос на регистрацию
  register(email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => console.log(err));
  }

  // запрос на авторизацию

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json()}
      )
  }
  // authorize(email, password) {
  //   return fetch(`${this._url}/signin`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email,
  //       password,
  //     }),
  //     credentials: 'include',
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .catch((err) => console.log(err));
  // }

  // проверка токена
  getContent(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json()}
    )
  }
}
const auth = new Auth(url);

export default auth;

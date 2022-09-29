const url = 'https://api.dpazuxin.nomorepartiesxyz.ru'; //serv
// const url = 'http://localhost:3000'; //loc

class Api {
  constructor(url) {
    this._url = url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Возникла ошибка ${res.status} ${res.statusText}`);
  }

  _addHeader() {
    const token = localStorage.getItem('token');
    return {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  getAllData() {
    return Promise.all([this.getCards(), this.getUser()]);
  }

  // данные пользователя имя проф и аватар
  getUser() {
    return fetch(`${this._url}/users/me/`, {
      method: 'GET',
      headers: this._addHeader(),
    }).then(this._checkResponse);
  }

  //запрос патч для замены имя и проф
  addUserInfo(name, about) {
    return fetch(`${this._url}/users/me/`, {
      method: 'PATCH',
      headers: this._addHeader(),
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  //запрос патч для замены аватара
  addAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._addHeader(),
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResponse);
  }

  // данные карточки
  getCards() {
    return fetch(`${this._url}/cards/`, {
      method: 'GET',
      headers: this._addHeader(),
    }).then(this._checkResponse);
  }

  //запрос пост для создания карточки
  addCard({ name, link }) {
    const newCard = {
      name: name,
      link: link,
    };
    return fetch(`${this._url}/cards/`, {
      method: 'POST',
      body: JSON.stringify(newCard),
      headers: this._addHeader(),
    }).then(this._checkResponse);
  }

  //запрос делит для создания карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._addHeader(),
    }).then(this._checkResponse);
  }

  //отправить PUT-запрос лайка
  addLike(likeId) {
    return fetch(`${this._url}/cards/${likeId}/likes`, {
      method: 'PUT',
      headers: this._addHeader(),
    }).then(this._checkResponse);
  }

  //отправить DELETE-запрос лайка
  deleteLike(likeId) {
    return fetch(`${this._url}/cards/${likeId}/likes`, {
      method: 'DELETE',
      headers: this._addHeader(),
    }).then(this._checkResponse);
  }
}

const api = new Api(url);

export default api;

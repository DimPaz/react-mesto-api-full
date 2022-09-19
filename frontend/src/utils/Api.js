const url = "https://mesto.nomoreparties.co/v1/cohort-43";
const token = "6f79ceb2-8103-4527-9a78-1a1299add319";

class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
    this._headers = {
      "Content-type": "application/json",
      Authorization: this._token,
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Возникла ошибка");
  }

  getAllData() {
    return Promise.all([this.getCards(), this.getUser()]);
  }

  // данные пользователя имя проф и аватар
  getUser() {
    return fetch(`${this._url}/users/me/`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //запрос патч для замены имя и проф
  addUserInfo(name, about) {
    return fetch(`${this._url}/users/me/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  //запрос патч для замены аватара
  addAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResponse);
  }

  // данные карточки
  getCards() {
    return fetch(`${this._url}/cards/`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //запрос пост для создания карточки
  addCard({ name, link }) {
    const newCard = {
      name: name,
      link: link,
    };
    return fetch(`${this._url}/cards/`, {
      method: "POST",
      body: JSON.stringify(newCard),
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //запрос делит для создания карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //отправить PUT-запрос лайка
  addLike(likeId) {
    return fetch(`${this._url}/cards/${likeId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //отправить DELETE-запрос лайка
  deleteLike(likeId) {
    return fetch(`${this._url}/cards/${likeId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const api = new Api(url, token);

export default api;

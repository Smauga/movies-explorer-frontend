const serverAddress = 'http://localhost:5000';

class MainApi {
  constructor({ address }) {
    this._address = address;
  }

  _handleResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(res.status);
  }

  // Регистрация пользователя
  register (email, password, name) {
    return fetch(`${this._address}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, name })
    })
      .then(res => this._handleResponse(res));
  };

  // Авторизация пользователя
  authorize (email, password) {
    return fetch(`${this._address}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => this._handleResponse(res));
  };

  // Выход из аккаунта пользователя
  signOut () {
    return fetch(`${this._address}/signout`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(res => this._handleResponse(res));
  };

  // Получение данных пользователя
  getMe() {
    return fetch(`${this._address}/users/me`, {
      credentials: 'include',
    })
      .then(res => this._handleResponse(res));
  }

  // Изменение данных пользователя
  updateMe({ email, name }) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        name
      })
    })
      .then(res => this._handleResponse(res));
  }

  // Получение сохраненных фильмов
  getMovies() {
    return fetch(`${this._address}/movies`, {
      credentials: 'include'
    })
      .then(res => this._handleResponse(res));
  }

  // Сохранение фильма
  addMovie( { country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN}) {
    return fetch(`${this._address}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
      })
    })
      .then(res => this._handleResponse(res));
  }

  // Удалить фильм
  deleteMovie(_id) {
    return fetch(`${this._address}/movies/${_id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(res => this._handleResponse(res));
  }
}

export default new MainApi({ address: serverAddress });
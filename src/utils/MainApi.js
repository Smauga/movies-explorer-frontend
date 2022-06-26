const serverAddress = 'http://localhost:5000';

class MainApi {
  constructor({ address }) {
    this._address = address;
  }

  _handleResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(res);
  }

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

  signOut () {
    return fetch(`${this._address}/signout`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(res => this._handleResponse(res));
  };

  getMe() {
    return fetch(`${this._address}/users/me`, {
      credentials: 'include',
    })
      .then(res => this._handleResponse(res));
  }

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

  getMovies() {
    return fetch(`${this._address}/movies`, {
      credentials: 'include'
    })
      .then(res => this._handleResponse(res));
  }

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

  deleteMovie(_id) {
    return fetch(`${this._address}/movies/${_id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(res => this._handleResponse(res));
  }
}

export default new MainApi({ address: serverAddress });
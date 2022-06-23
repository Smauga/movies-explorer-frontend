const serverAddress = 'https://api.nomoreparties.co';

class MoviesApi {
  constructor({ address }) {
    this._address = address;
  }

  _handleResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getMovies() {
    return fetch(`${this._address}/beatfilm-movies`)
      .then(res => this._handleResponse(res));
  }
}



export default new MoviesApi({ address: serverAddress });
const serverAddress = 'https://api.nomoreparties.co';

class MoviesApi {
  constructor({ address }) {
    this._address = address;
  }

  _handleResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(res.status);
  }

  // Получения фильмов
  getMovies() {
    return fetch(`${this._address}/beatfilm-movies`)
      .then(res => this._handleResponse(res));
  }
}



export default new MoviesApi({ address: serverAddress });
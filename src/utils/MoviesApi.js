import { MOVIES_API_URL } from '../config/config';

class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  loadMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`)
      .then(this._checkResponse);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: MOVIES_API_URL,
});

export default moviesApi;

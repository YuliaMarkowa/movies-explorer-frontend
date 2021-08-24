import { MAIN_API_URL, MOVIES_API_URL } from '../config/config';
import { REGEX, TRAILER } from '../components/helpers/constants';

class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  loadUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._checkResponse);
  }

  editProfile({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name,
        email,
      }),
    }).then(this._checkResponse);
  }

  getSaveMoviesCards() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._checkResponse);
  }

  addMovieCard(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        country: `${movie.country !== (undefined || '' || null) ? movie.country : 'no info'}`,
        director: `${movie.director !== (undefined || '' || null) ? movie.director : 'no info'}`,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${MOVIES_API_URL}${movie.image.url}`,
        trailer: `${
        movie.trailerLink === null || '' || !movie.trailerLink.match(REGEX)
        ? TRAILER
        : movie.trailerLink
        }`,
        thumbnail: `${MOVIES_API_URL}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: `${movie.nameRU === ('' || null) ? 'no info' : movie.nameRU}`,
        nameEN: `${movie.nameEN === ('' || null) ? 'no info' : movie.nameEN}`,
      }),
    }).then(this._checkResponse);
  }

  removeMovieCard(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.text()
      .then((text) => Promise.reject(JSON.parse(text).message));
  }
}

const mainApi = new MainApi({
  baseUrl: MAIN_API_URL,
});

export default mainApi;

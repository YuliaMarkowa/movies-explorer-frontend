import { MAIN_API_URL, MOVIES_API_URL } from "../config/config";

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
  //сохраненные карточки, которые уже сохранены, когда вкладку закрывают и потом возвращаются сохраненные карточки должны отображаться
  getSaveMoviesCards() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._checkResponse);
  }
  //сохранить карточку, т.е поставить ей лайк и она же должна быть отображена на странице 'сохранные фильмы' а лайк в этот момент у этой же карточки должен быть красным на странице 'фильмы'
  addMovieCard(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${MOVIES_API_URL}${movie.image.url}`,
        trailer: movie.trailerLink,
        thumbnail: `${MOVIES_API_URL}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then(this._checkResponse);
  }
//удаляем карточку из сохраненных и кнопка лайк на странице фильмы снова становится без заливки
  removeMovieCard(movieId) {
    return fetch(`${this._baseUrl}/moviess/${movieId}`, {
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
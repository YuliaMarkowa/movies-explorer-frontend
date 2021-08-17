import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './MoviesCard.css';
import { formatDuration } from '../../../utils/utils';
import { MOVIES_API_URL } from "../../../config/config";


function MoviesCard({ movie }) {
  const [isSelected, setIsSelected] = useState(false);

  const movieCardSaveButton = `movie-card__button ${
    isSelected ? "movie-card__button_save-active" : "movie-card__button"
  }`;

  function toggleSaveClick() {
    setIsSelected(!isSelected);
  }

  return (
    <article className="movie-card">
      <a
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
        className="movie-card__link"
      >
        <img
          src={`${MOVIES_API_URL}${movie.image.url}`}
          alt={`Кадр из фильма ${movie.nameRU}`}
          className="movie-card__frame"
        />
      </a>
      <div className="movie-card__main">
        <p className="movie-card__title">{movie.nameRU}</p>
        <Switch>
          <Route path="/movies">
            <button
              aria-label="Сохранить"
              type="button"
              className={movieCardSaveButton}
              onClick={toggleSaveClick}
            ></button>
          </Route>
          <Route path="/saved-movies">
            <button
              aria-label="Удалить"
              type="button"
              className="movie-card__button movie-card__button_remove"
            ></button>
          </Route>
        </Switch>
      </div>
      <p className="movie-card__duration">{formatDuration(movie.duration)}</p>
    </article>
  );
}

export default MoviesCard;

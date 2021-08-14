import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './MoviesCard.css';
import { formatDuration } from '../../../utils/utils';

function MoviesCard({ image, duration, nameRU, trailerLink }) {
  const [isSelected, setIsSelected] = useState(false);

  const movieCardSaveButton = `movie-card__button ${
    isSelected ? "movie-card__button_save-active" : "movie-card__button"
  }`;

  const movieCardRemoveButton = "movie-card__button movie-card__button_remove";

  function handleClick() {
    setIsSelected(!isSelected);
  }

  return (
    <article className="movie-card">
      <a
        href={trailerLink}
        target="_blank"
        rel="noreferrer"
        className="movie-card__link"
      >
        <img
          src={image}
          alt={`Кадр из фильма ${nameRU}`}
          className="movie-card__frame"
        />
      </a>
      <div className="movie-card__main">
        <p className="movie-card__title">{nameRU}</p>
        <Switch>
          <Route path="/movies">
            <button
              aria-label="Сохранить"
              type="button"
              className={movieCardSaveButton}
              onClick={handleClick}
            ></button>
          </Route>
          <Route path="/saved-movies">
            <button
              aria-label="Удалить"
              type="button"
              className={movieCardRemoveButton}
            ></button>
          </Route>
        </Switch>
      </div>
      <p className="movie-card__duration">{formatDuration(duration)}</p>
    </article>
  );
};

export default MoviesCard;

import React, {useEffect, useLayoutEffect, useState, memo} from 'react';
import { Route, Switch } from 'react-router-dom';
import { formatDuration } from '../../../../utils/utils';
import { MOVIES_API_URL } from "../../../../config/config";
import { getLocalStorage } from '../../../helpers/helperLocalStorage';
import mainApi from '../../../../utils/MainApi';
import './MoviesCard.css';

function MoviesCard({
  movie,
  isSavedMovie,
  setIsSavedMovie,
  handleMovieRemove,
}) {
  const [isSelected, setIsSelected] = useState(false);

  const movieCardSaveButton = `movie-card__button ${
    isSelected ? "movie-card__button_save-active" : "movie-card__button"
  }`;

  useEffect(() => {
    if (isSavedMovie) {
      const filter = isSavedMovie.some(({ movieId }) => movieId === movie.id);

      if (!isSelected) {
        setIsSavedMovie(
          isSavedMovie.filter(({ movieId }) => movieId !== movie.id)
        );
      }

      if (isSelected && !filter) {
        mainApi
          .addMovieCard(movie)
          .then((movieData) => {
            setIsSavedMovie([...isSavedMovie, movieData]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [isSelected]);

  useLayoutEffect(() => {
    const savedMovies = getLocalStorage('savedMovies') ?? [];
    const filter = savedMovies.some(({ movieId }) => movieId === movie.id);
    if (filter) {
      setIsSelected(true);
    }
  }, []);

  return (
    <article className="movie-card">
      <a
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
        className="movie-card__link"
      >
        <img
          src={movie.image.url ? MOVIES_API_URL + movie.image.url : movie.image}
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
              onClick={() => setIsSelected(!isSelected)}
            ></button>
          </Route>
          <Route path="/saved-movies">
            <button
              aria-label="Удалить"
              type="button"
              onClick={() => handleMovieRemove(movie._id)}
              className="movie-card__button movie-card__button_remove"
            ></button>
          </Route>
        </Switch>
      </div>
      <p className="movie-card__duration">{formatDuration(movie.duration)}</p>
    </article>
  );
}

export default memo(MoviesCard);

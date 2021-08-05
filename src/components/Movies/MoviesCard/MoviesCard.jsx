import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './MoviesCard.css';
import frame from '../../../images/image-movies-card.jpg';

function MoviesCard() {
  const [isSelected, setIsSelected] = useState(false);

  const movieCardSaveButton = `movie-card__button ${
    isSelected ? "movie-card__button_save-active" : "movie-card__button"
  }`;

  const movieCardRemoveButton = "movie-card__button movie-card__button_remove";

  function handleClick() {
    setIsSelected(!isSelected)
  }

  return (
    <article className="movie-card">
      <img src={frame} alt="Кадр из фильма" className="movie-card__frame" />
      <div className="movie-card__main">
        <p className="movie-card__title">Книготорговцы</p>
        <Switch>
          <Route path='/movies'>
        <button
          aria-label="Сохранить"
          type="button"
          className={movieCardSaveButton}
          onClick={handleClick}
        ></button>
        </Route>
        <Route path='/saved-movies'>
        <button
          aria-label="Удалить"
          type="button"
          className={movieCardRemoveButton}
        ></button>
        </Route>
        </Switch>
      </div>
      <p className="movie-card__duration">1ч 42м</p>
    </article>
  );
}

export default MoviesCard;
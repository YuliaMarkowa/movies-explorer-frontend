import './MoviesCard.css';
import frame from '../../../images/image-movies-card.jpg';

function MoviesCard() {
  return (
    <article className="movie-card">
      <img src={frame} alt="Кадр из фильма" className="movie-card__frame" />
      <div className="movie-card__main">
        <p className="movie-card__title">Книготорговцы</p>
        <button
          aria-label="понравилось"
          type="button"
          className="movie-card__like-button"
        ></button>
      </div>
      <p className="movie-card__duration">1ч42м</p>
    </article>
  );
}

export default MoviesCard;
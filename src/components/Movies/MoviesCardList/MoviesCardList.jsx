import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ movies }) {
  return (
    <ul className="movies__list">
      {movies?.map((movie) => (
        <li key={movie.id}>
          <MoviesCard movie={movie} />
        </li>
      ))}
    </ul>
  );
}

export default MoviesCardList;

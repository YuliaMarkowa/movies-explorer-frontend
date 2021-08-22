import React, {useEffect, useState, memo} from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoreButton from '../MoreButton/MoreButton';
import './MoviesCardList.css';

function MoviesCardList({
  isFetched,
  isMovieAmount,
  getMoviesAmount,
  movies,
  isSavedMovie,
  setIsSavedMovie,
  handleMovieRemove,
}) {
  const [updatedMovies, setUpdatedMovies] = useState([]);
  const [triggerBtn, setTriggerBtn] = useState(0);

  function handleMoreBtn() {
    setTriggerBtn(getMoviesAmount + triggerBtn);
  }

  useEffect(() => {
    setUpdatedMovies([...movies.slice(0, isMovieAmount)]);
  }, [isMovieAmount, movies]);

  useEffect(() => {
    setUpdatedMovies([...movies.slice(0, triggerBtn + isMovieAmount)]);
  }, [triggerBtn]);

  return (
    <>
      <ul className="movies__list">
        {updatedMovies.length
          ? updatedMovies.map((movie) => (
              <li key={movie.id || movie._id}>
                <MoviesCard
                  movie={movie}
                  handleMovieRemove={handleMovieRemove}
                  isSavedMovie={isSavedMovie}
                  setIsSavedMovie={setIsSavedMovie}
                />
              </li>
            ))
          : (isFetched || isSavedMovie) && <p className="movies__list-empty">Ничего не найдено</p>}
      </ul>

      {!(updatedMovies.length === movies.length) && (
        <MoreButton moreMovies={handleMoreBtn} />
      )}
    </>
  );
}

export default memo(MoviesCardList);

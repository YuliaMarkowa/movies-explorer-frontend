import { useState, useEffect, useLayoutEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '../../helpers/helperLocalStorage';
import { ERROR_FETCH_MOVIES } from '../../helpers/constants';
import { findFilm, filterFilmDuration } from '../../../utils/utils';
import MoviesCardList from '../components/MoviesCardList/MoviesCardList';
import SearchForm from '../components/SearchForm/SearchForm';
import Preloader from '../../Preloader/Preloader';
import moviesApi from '../../../utils/MoviesApi';
import ErrorComponent from '../../ErrorComponent/ErrorComponent';

function FetchedMovies({
    isMovieAmount,
    getMoviesAmount,
    isSavedMovie,
    setIsSavedMovie,
  }) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [fetchMoviesError, setFetchMoviesError] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [isWord, setIsWord] = useState('');
  
    function getLocalStorageInfo() {
      const savedWord = getLocalStorage('word');
      const savedMovies = getLocalStorage('movies');
      const savedIsChecked = getLocalStorage('isChecked');
      const savedIsFetched = getLocalStorage('isFetched');
  
      return { savedWord, savedMovies, savedIsChecked, savedIsFetched };
    }
  
    function getMovies(word, movies, isChecked) {
      if (movies) {
        setMovies(
          isChecked
            ? filterFilmDuration(findFilm(movies, word))
            : findFilm(movies, word)
        );
      }
    }
  
    //функция запроса к апи
    function movieSearch(word, isChecked) {
      setIsLoading(true);
      moviesApi
        .loadMovies()
        .then((moviesData) => {
          setIsFetched(true);
          setLocalStorage('isFetched', true);
          setLocalStorage('movies', moviesData);
          getMovies(word, moviesData, isChecked);
          setFetchMoviesError(false);
        })
        .catch((err) => {
          setFetchMoviesError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  
    function handleSearch(word) {
      const { savedMovies, savedIsChecked } = getLocalStorageInfo();
  
      if (!movies.length && !savedMovies) {
        movieSearch(word, savedIsChecked);
      }
  
      getMovies(word, savedMovies, savedIsChecked);
    }
  
    function getFromLocalMovies() {
      const { savedWord, savedMovies, savedIsChecked } = getLocalStorageInfo();
      getMovies(savedWord, savedMovies, savedIsChecked);
    }
  
    useLayoutEffect(() => {
      const { savedIsChecked, savedIsFetched } = getLocalStorageInfo();
      setIsChecked(savedIsChecked ?? false);
      setIsFetched(savedIsFetched ?? false);
      getFromLocalMovies();
    }, []);
  
    useEffect(() => {
      setLocalStorage("isChecked", isChecked);
      getFromLocalMovies();
    }, [isChecked]);
  
    return (
      <>
        {fetchMoviesError && <ErrorComponent message={ERROR_FETCH_MOVIES} />}
  
        <SearchForm
          nameWord='word'
          isWord={isWord}
          setIsWord={setIsWord}
          handleSearch={handleSearch}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          isLoading={isLoading}
        />
  
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            isSavedMovie={isSavedMovie}
            setIsSavedMovie={setIsSavedMovie}
            isFetched={isFetched}
            isMovieAmount={isMovieAmount}
            getMoviesAmount={getMoviesAmount}
            movies={movies}
          />
        )}
      </>
    );
  }
  
  export default FetchedMovies;

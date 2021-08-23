import {useEffect, useLayoutEffect, useState} from 'react';
import {getLocalStorage, setLocalStorage} from '../../helpers/helperLocalStorage';
import { findFilm, filterFilmDuration } from '../../../utils/utils';
import SearchForm from '../components/SearchForm/SearchForm';
import MoviesCardList from '../components/MoviesCardList/MoviesCardList';
import Devider from './Devider/Devider';
import mainApi from '../../../utils/MainApi';

function SavedMovies() {
    const [isSavedMovies, setIsSavedMovies] = useState([]);
    const [isMovieAmount, setIsMoviesAmount] = useState(null);
    const [getMoviesAmount, setGetMoviesAmount] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [isSavedMoviesLength, setIsSavedMoviesLength] = useState(!isSavedMovies.length);
    const [isWord, setIsWord] = useState("");
  
    useLayoutEffect(() => {
      const {
        savedIsMovieAmount,
        savedIsFetched,
        savedGetMoviesAmount,
      } = getLocalStorageInfo();
      setIsMoviesAmount(savedIsMovieAmount);
      setGetMoviesAmount(savedGetMoviesAmount);
      setIsSavedMoviesLength(savedIsFetched || false)
    }, []);
  
    function handleMovieRemove(movieId) {
      mainApi
        .removeMovieCard(movieId)
        .then(() => {
          const filter = isSavedMovies.filter(({ _id }) => _id !== movieId);
          setLocalStorage('savedMovies', filter);
          setIsSavedMovies(filter);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    function getLocalStorageInfo() {
      const savedWord = getLocalStorage('savedWord');
      const savedIsFetched = getLocalStorage('isFetched');
      const savedMovies = getLocalStorage('savedMovies');
      const savedIsChecked = getLocalStorage('isCheckedSaved');
      const savedIsMovieAmount = getLocalStorage('isMovieAmount');
      const savedGetMoviesAmount = getLocalStorage('getMoviesAmount');
  
      return {
        savedWord,
        savedIsFetched,
        savedMovies,
        savedIsChecked,
        savedIsMovieAmount,
        savedGetMoviesAmount,
      };
    }
  
    function handleSearch(word) {
      const { savedMovies, savedIsChecked } = getLocalStorageInfo();
      getMovies(word, savedMovies, savedIsChecked);
      setIsSavedMoviesLength(true)
    }
  
    function getMovies(word, movies, isChecked) {
      if (movies) {
        setIsSavedMovies(
          isChecked
            ? filterFilmDuration(findFilm(movies, word))
            : findFilm(movies, word)
        );
      }
    }
  
    useEffect(() => {
      setLocalStorage('isCheckedSaved', isChecked);
      
      const { savedWord, savedMovies, savedIsChecked } = getLocalStorageInfo();
      getMovies(savedWord ?? isWord, savedMovies, savedIsChecked ?? isChecked);
    }, [isChecked]);
  
    return (
      <div className="saved-movies">
        <SearchForm
          nameWord="savedWord"
          isWord={isWord}
          setIsWord={setIsWord}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          handleSearch={handleSearch}
        />

          <MoviesCardList
            isMovieAmount={isMovieAmount}
            getMoviesAmount={getMoviesAmount}
            handleMovieRemove={handleMovieRemove}
            movies={isSavedMovies}
            isSavedMoviesLength={isSavedMoviesLength}
          />
        <Devider />
      </div>
    );
  }
  
  export default SavedMovies;

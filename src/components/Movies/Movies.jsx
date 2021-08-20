import { useEffect, useLayoutEffect, useState } from 'react';
import { Route, Switch }  from 'react-router-dom';
import { getLocalStorage, setLocalStorage } from '../helpers/helperLocalStorage';
import FetchedMovies from './FetchedMovies/FetchedMovies';
import SavedMovies from './SavedMovies/SavedMovies';
import {
  SCREEN_BIG_SIZE,
  SCREEN_MIDDLE_SIZE,
  SCREEN_LITTLE_SIZE,
  SCREEN_MINI_SIZE,
  NUMBER_TWELVE,
  NUMBER_EIGHT,
  NUMBER_FIVE,
  NUMBER_FOUR,
  NUMBER_TWO
} from '../helpers/constants';

function Movies() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isMovieAmount, setIsMoviesAmount] = useState(null);
    const [getMoviesAmount, setGetMoviesAmount] = useState(null);
    //SavedMovies
    const [isSavedMovie, setIsSavedMovie] = useState([]);
  
    useLayoutEffect(() => {
      function debounce(fn, ms) {
        let timer;
        return (_) => {
          clearTimeout(timer);
          timer = setTimeout((_) => {
            timer = null;
            fn.apply(this, arguments);
          }, ms);
        };
      }
  
      function handleResize() {
        setScreenWidth(window.innerWidth);
      }
  
      const debouncedHandleResize = debounce(handleResize, 300);
  
      if (screenWidth >= SCREEN_BIG_SIZE) {
        setIsMoviesAmount(NUMBER_TWELVE);
        setGetMoviesAmount(NUMBER_FOUR);
      } else if (screenWidth > SCREEN_MIDDLE_SIZE) {
        setIsMoviesAmount(NUMBER_EIGHT);
        setGetMoviesAmount(NUMBER_TWO);
      } else if (screenWidth >= SCREEN_MINI_SIZE && screenWidth <= SCREEN_LITTLE_SIZE) {
        setIsMoviesAmount(NUMBER_FIVE);
        setGetMoviesAmount(NUMBER_TWO);
      } 
  
      setLocalStorage('isMovieAmount', isMovieAmount);
      setLocalStorage('getMoviesAmount', getMoviesAmount);
  
      window.addEventListener('resize', debouncedHandleResize);
  
      return () => {
        window.removeEventListener('resize', debouncedHandleResize);
      };
    }, [screenWidth, isMovieAmount, getMoviesAmount]);
  
    useEffect(() => {
      setLocalStorage('isMovieAmount', isMovieAmount);
      setLocalStorage('getMoviesAmount', getMoviesAmount);
    }, [isMovieAmount, getMoviesAmount]);
  
    useEffect(() => {
      setLocalStorage('savedMovies', isSavedMovie);
    }, [isSavedMovie]);
  
    useLayoutEffect(() => {
      const saved = getLocalStorage('savedMovies');
      if (!isSavedMovie.length && saved) {
        setIsSavedMovie(saved);
      }
    }, [isSavedMovie.length]);
  
    return (
      <Switch>
        <Route path="/movies">
          <FetchedMovies
            getMoviesAmount={getMoviesAmount}
            isMovieAmount={isMovieAmount}
            isSavedMovie={isSavedMovie}
            setIsSavedMovie={setIsSavedMovie}
          />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies/>
        </Route>
      </Switch>
    );
  }
  
  export default Movies;

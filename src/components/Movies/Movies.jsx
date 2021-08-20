import { useEffect, useLayoutEffect, useState } from 'react';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import mainApi from '../../utils/MainApi';
import { getLocalStorage, setLocalStorage } from '../helpers/helperLocalStorage';
import {ERROR_FETCH_MOVIES} from '../helpers/constants';
import { findFilm, filterFilmDuration } from '../../utils/utils';

function Movies() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [fetchMoviesError, setFetchMoviesError] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [isMovieAmount, setIsMoviesAmount] = useState(null); //количество карточек в строке
    const [getMoviesAmount, setGetMoviesAmount] = useState(null); //количество подгружаемых карточек по клику на "ещё"
    const [isFetched, setIsFetched] = useState(false);

    function debounce(fn, ms) {
        let timer
        return _ => {
        clearTimeout(timer)
        timer = setTimeout(_ => {
            timer = null
            fn.apply(this, arguments)
        }, ms)
        };
    }

    function handleResize() {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        const debouncedHandleResize = debounce(handleResize, 300)

        if (screenWidth >= 1280) {
            setIsMoviesAmount(12);
            setGetMoviesAmount(4);
        } else if (screenWidth > 769) {
            setIsMoviesAmount(8);
            setGetMoviesAmount(2);
        } else if((screenWidth >= 320) && (screenWidth <= 480)) {
            setIsMoviesAmount(5);
            setGetMoviesAmount(2);
        };

        window.addEventListener("resize", debouncedHandleResize);

        return () => {
            window.removeEventListener("resize", debouncedHandleResize);
        };
    });

//функция запроса к апи
    function movieSearch(word, isChecked) {
        setIsLoading(true);
        moviesApi
            .loadMovies()
            .then((moviesData) => {
                setIsFetched(true);
                setLocalStorage('movies', moviesData);
                getMovies(word, moviesData, isChecked);
                setFetchMoviesError(false);
            })
            .catch((err) => {
                //тут тригерится сущность которая будет отрисовывать компонент с ошибкой
                setFetchMoviesError(true)
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

//handleSearch поднимает из формы SearchForm значение запроса
//доп. условие в сабмите: если муви уже есть, то запрос не делаем, а берем из стейта. Если их нет, то делаем запрос
    function handleSearch(word) {
        const {savedMovies, savedIsChecked} = getLocalStorageInfo();

        if (!movies.length && !savedMovies) {
            movieSearch(word, savedIsChecked);
        };

        getMovies(word, savedMovies, savedIsChecked);
    }

//достаём данные из локала при загрузке страницы, а запрос за ними ограничен только одним разом
    function getFromLocalMovies() {
        const {savedWord, savedMovies, savedIsChecked} = getLocalStorageInfo();
        getMovies(savedWord, savedMovies, savedIsChecked);
    };

    useLayoutEffect(() => {
        const {savedIsChecked} = getLocalStorageInfo();
        setIsChecked(savedIsChecked ?? false);
        getFromLocalMovies();
    }, []);

    useEffect(() => {
        getFromLocalMovies();
    }, [isChecked]);


    function getLocalStorageInfo() {
        const savedWord = getLocalStorage('word');
        const savedMovies = getLocalStorage('movies');
        const savedIsChecked = getLocalStorage('isChecked');

        return {savedWord, savedMovies, savedIsChecked}
    };

    function getMovies(word, movies, isChecked) {
        if(movies) {
            setMovies(
                isChecked
                    ? filterFilmDuration(findFilm(movies, word))
                    : findFilm(movies, word)
                )
        };
    }


    return (
        <>
            {fetchMoviesError && 
                (
                    <ErrorComponent message={ERROR_FETCH_MOVIES} />
                )
            } 

            <SearchForm 
                handleSearch={handleSearch}
                isChecked={isChecked} 
                setIsChecked={setIsChecked} />
                
            {isLoading ? 
                (
                    <Preloader />
                )
            : 
                (
                    <MoviesCardList
                        isFetched={isFetched}
                        isMovieAmount={isMovieAmount}
                        getMoviesAmount={getMoviesAmount}
                        movies={movies} />
                )
            }
        </>
    );
}

export default Movies;

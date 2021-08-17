import './Movies.css';
import { useEffect, useState } from 'react';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import FilterCheckBox from './FilterCheckBox/FilterCheckBox';
import MoreButton from './MoreButton/MoreButton';
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';
//Не сдавайся перед трудностями. Это просто задача, которую нужно решить
//Там одно сообщение только вывести надо, если сабмит пустой формы

function Movies() {
  //const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


//функция запроса к апи
  function movieSearch() {
    setIsLoading(true);
    moviesApi
      .loadMovies()
      .then((moviesData) => {
        localStorage.setItem('movies', JSON.stringify(moviesData));
        setMovies(moviesData); //записываем данные в стейт
        findFilm(moviesData);
        console.log(moviesData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //фильтр-короткометражки
  function filterFilmDuration(movies) {
    return movies.filter((movie) => movie.duration < 40);
  };


  //поиск по слову
  //когда пройдёт проверка в условии handleSearch, отправить стейт movies на поиск по слову. Или сразу после получения данных в асинхронной функции, либо если данные уже есть, то их
  function findFilm(movies, word) {
    return movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(word.toLowerCase());
    });
  }


//handleSearch поднимает из формы SearchForm значение запроса
//доп. условие в сабмите: если муви уже есть, то запрос не делаем, а берем из стейта. Если их нет, то делаем запрос
  function handleSearch(word) {
    if (movies.length === 0) {
      movieSearch();
    }
    //если данные уже есть в стейте, надо сделать поиск по стейту movies
    findFilm(movies, word);
    console.log(findFilm)
  }


//достаём данные из локала при загрузке страницы, а запрос за ними ограничен только одним разом
  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('movies'));
    console.log(movies)
    //если данных в локале нет, массив должен остаться пустым, условие исключает null, undefined
    if (movies) {
    setMovies(movies);
  }
  }, [])

  return (
    <>
      <SearchForm handleSearch={handleSearch} />
      <FilterCheckBox />
      {isLoading ? <Preloader /> : <MoviesCardList movies={movies} />}
      <MoreButton />
    </>
  );
}

export default Movies;
  
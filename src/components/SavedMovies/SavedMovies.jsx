import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import FilterCheckBox from '../Movies/FilterCheckBox/FilterCheckBox';
import Devider from './Devider/Devider';

function SavedMovies() {
    return (
      <>
        <SearchForm />
        <FilterCheckBox />
        <MoviesCardList />
        <Devider />
      </>
    );
  };
  
  export default SavedMovies;

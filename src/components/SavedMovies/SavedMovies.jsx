import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Devider from './Devider/Devider';

function SavedMovies() {
    return (
      <>
        <SearchForm />
        <MoviesCardList />
        <Devider />
      </>
    );
  };
  
  export default SavedMovies;

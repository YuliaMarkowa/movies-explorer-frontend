import './Movies.css';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import MoreButton from './MoreButton/MoreButton';

function Movies() {
    return(
        <>
        <SearchForm />
        <MoviesCardList />
        <MoreButton />
        </>
    );
}

export default Movies;
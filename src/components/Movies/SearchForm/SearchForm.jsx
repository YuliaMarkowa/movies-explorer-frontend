import './SearchForm.css';
import FilterCheckBox from '../FilterCheckBox/FilterCheckBox';

function SearchForm() {
  return (
    <section className="search-movie">
      <form name="search" className="search-movie__form">
        <div className="search-movie__container">
          <input
            type="text"
            placeholder="Фильм"
            name="movie"
            className="search-movie__input"
            required
          />
          <button type="submit" name="submit" className="search-movie__submit">
            Найти
          </button>
        </div>
        <FilterCheckBox />
      </form>
    </section>
  );
}

export default SearchForm;
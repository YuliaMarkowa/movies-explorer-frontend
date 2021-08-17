import './SearchForm.css';
//import { useEffect } from 'react';
//import FilterCheckBox from '../FilterCheckBox/FilterCheckBox';
import useFormValidator from '../../../hooks/useFormValidator';

function SearchForm({ handleSearch }) {

  const { values, handleChange } =
    useFormValidator();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleSearch(values.movie);
  };

  return (
    <section className="search-movie">
      <form name="search" className="search-movie__form" onSubmit={handleSubmit}>
        <div className="search-movie__container">
          <input
            type="text"
            placeholder="Фильм"
            name="movie"
            className="search-movie__input"
            onChange={handleChange}
            value={values.movie || ""}
            required
          />
          <button
            aria-label="Найти"
            type="submit"
            name="submit"
            className="search-movie__submit"
          >
            Найти
          </button>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;

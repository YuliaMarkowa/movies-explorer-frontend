import './SearchForm.css';
import { useEffect, useState } from 'react';
import FilterCheckBox from '../FilterCheckBox/FilterCheckBox';
import {getLocalStorage, setLocalStorage} from '../../../helpers/helperLocalStorage';
import {ERROR_INPUT_VALUE} from '../../../helpers/constants';
import ErrorComponent from '../../../ErrorComponent/ErrorComponent';

function SearchForm({
    handleSearch,
    isChecked,
    setIsChecked,
    isWord,
    setIsWord,
    nameWord,
    isLoading
  }) {
    const [errorInput, setErrorInput] = useState(false);
  
    const handleSubmit = (evt) => {
      evt.preventDefault();
      if (!isWord) {
        setErrorInput(true);
        setLocalStorage(nameWord, isWord);
      } else {
        handleSearch(isWord);
        setLocalStorage(nameWord, isWord);
        setErrorInput(false);
      }
    };
  
    useEffect(() => {
      const wordSaved = getLocalStorage(nameWord);
      if (wordSaved) {
        setIsWord(wordSaved);
      }
    }, []);
  
    return (
      <>
        {errorInput && (<ErrorComponent message={ERROR_INPUT_VALUE} />)}
        <section className="search-movie">
          <form
            name="search"
            className="search-movie__form"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="search-movie__container">
              <input
                type="text"
                placeholder="Фильм"
                name="movie"
                className="search-movie__input"
                onChange={({ target: { value } }) => setIsWord(value)}
                value={isWord}
                disabled={isLoading}
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
            <FilterCheckBox isChecked={isChecked} setIsChecked={setIsChecked} />
          </form>
        </section>
      </>
    );
  }
  
  export default SearchForm;

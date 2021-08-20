import './SearchForm.css';
import { useEffect, useState } from 'react';
import FilterCheckBox from '../FilterCheckBox/FilterCheckBox';
import useFormValidator from '../../../hooks/useFormValidator';
import{getLocalStorage, setLocalStorage} from '../../helpers/helperLocalStorage';
import {ERROR_INPUT_VALUE} from '../../helpers/constants';
import ErrorComponent from '../../ErrorComponent/ErrorComponent';

function SearchForm({ handleSearch, isChecked, setIsChecked}) {

  const [word, setWord] = useState('');
  const [errorInput, setErrorInput] = useState(false);

  const { values, handleChange } =
    useFormValidator();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // если введенное число пусткая строка , а к приведению 
    // к булин значению пусткая строка === false , то срабатывает консоль лог
    if(!values.movie) {
      setErrorInput(true);
    } else {
        handleSearch(word);
        setLocalStorage('word', word);
        setErrorInput(false);
    }
  };

  useEffect(() => {
    setWord(values.movie ?? '');
  }, [values.movie])

  useEffect(() => {
    const wordSaved = getLocalStorage('word');
    if (wordSaved) {
        setWord(wordSaved);
    }
  }, [])

  return (
    <>
        {errorInput &&
            (
                <ErrorComponent message={ERROR_INPUT_VALUE} />
            )
        }
        <section className="search-movie">
        <form name="search" className="search-movie__form" noValidate onSubmit={handleSubmit}>
            <div className="search-movie__container">
            <input
                type="text"
                placeholder="Фильм"
                name="movie"
                className="search-movie__input"
                onChange={handleChange}
                value={word}
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
            <FilterCheckBox isChecked={isChecked} setIsChecked={setIsChecked}/>
        </form>
        </section>
    </>
  );
}

export default SearchForm;

import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo-header.svg';
import icon from '../../images/icon-main.svg';

function Header({ loggedIn }) {
    return (
      <header className={`header ${!loggedIn ? "header_dark" : ""}`}>
        <div className="header__container">
          <Link to="/">
            <img src={logo} alt="Главная страница" className="header__logo" />
          </Link>
        {!loggedIn ? (
          <div className="header__link-container">
            <Link to="/signup" className="header__link">
              Регистрация
            </Link>
            <Link to="/signin" className="header__button-enter">
              Войти
            </Link>
          </div>
        ) : (
          <>
          <div className="header__menu">
            <nav className="header__nav">
              <Link
                to="/movies"
                className="header__nav-movies"
              >
                Фильмы
              </Link>
              <Link
                to="/saved-movies"
                className="header__nav-movies header__nav-movies_saved"
              >
                Сохраненные фильмы
              </Link>
            </nav>
            <Link
              to="/profile"
              className="header__nav-movies header__nav-movies_account"
            >
              Аккаунт
              <img
                src={icon}
                alt="Аватар пользователя"
                className="header__icon"
              />
            </Link>
          </div>
          <button></button>
          </>
        )}
        </div>
      </header>
    );
  }

export default Header;
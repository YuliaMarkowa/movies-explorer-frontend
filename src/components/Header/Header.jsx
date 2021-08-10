import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo-header.svg';
import user from '../../images/icon-main.svg';

function Header({ loggedIn }) {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  function toggleNavMenu() {
    setIsNavMenuOpen(!isNavMenuOpen);
  }

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
                <Link to="/movies" className="header__nav-movies">
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
                  src={user}
                  alt="Аватар пользователя"
                  className="header__icon"
                />
              </Link>
            </div>
            <button
              className="header__menu-button"
              aria-label="открыть меню"
              type="button"
              onClick={toggleNavMenu}
            ></button>
            <Navigation isOpen={isNavMenuOpen} onClose={toggleNavMenu} />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
//import { useState } from 'react';
import './Navigation.css';
import user from '../../images/icon-main.svg';

function Navigation({ isOpen, onClose }) {
  return (
    <article
      className={`navigation-modal ${!isOpen && "navigation-modal_opened"}`}
    >
      <nav className="navigation-modal__main">
        <ul className="navigation-modal__links">
          <li className="navigation-modal__item">
            <Link to="/" className="navigation-modal__link">
              Главная
            </Link>
          </li>
          <li className="navigation-modal__item">
            <Link to="/movies" className="navigation-modal__link">
              Фильмы
            </Link>
          </li>
          <li className="navigation-modal__item">
            <Link to="/saved-movies" className="navigation-modal__link">
              Сохраненные фильмы
            </Link>
          </li>
        </ul>
        <Link to="/profile" className="navigation-modal__link-account">
          Аккаунт
          <img
            src={user}
            alt="Аватар пользователя"
            className="navigation-modal__user"
          />
        </Link>
      </nav>
      <button
        onClick={onClose}
        aria-label="закрыть"
        className="navigation-modal__close-button"
        type="button"
      ></button>
    </article>
  );
};

export default Navigation;

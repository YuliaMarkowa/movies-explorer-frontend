import './Profile.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Profile() {
  const [isButtonActive, setIsButtonActive] = useState(false);

  function toggleButton() {
    setIsButtonActive(!isButtonActive);
  }

  return (
    <section className="profile-page">
      <h1 className="profile-page__heading">Привет, Виталий!</h1>
      <form className="profile-page__form" name="profileForm">
        <div className="profile-page__info-container">
          <label className="profile-page__text">Имя</label>
          <input
            type="text"
            name="name"
            className="profile-page__input"
            id="name-input"
            minLength="2"
            maxLength="30"
            required
          />
        </div>
        <div className="profile-page__info-container">
          <label className="profile-page__text">E-mail</label>
          <input
            type="email"
            name="email"
            className="profile-page__input"
            id="email-input"
            required
          />
        </div>
      </form>
      {!isButtonActive ? (
        <>
          <button
            type="submit"
            className="profile-page__edit-button"
            onClick={toggleButton}
          >
            Редактировать
          </button>
          <Link to="/">
            <button type="button" className="profile-page__logout-button">
              Выйти из аккаунта
            </button>
          </Link>
        </>
      ) : (
        <button
          aria-label="Сохранить"
          type="submit"
          className="profile-page__save-button"
        >
          Сохранить
        </button>
      )}
    </section>
  );
}

export default Profile;


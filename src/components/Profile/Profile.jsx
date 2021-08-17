import { useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormValidator from '../../hooks/useFormValidator';
import Preloader from '../Preloader/Preloader';
import './Profile.css';

function Profile({
  handleLogOut,
  handleUpdateUser,
  isLoading,
  serverErrorMessage,
  resetServerErorr,
}) {
  const { name, email } = useContext(CurrentUserContext);

  const { values, setValues, errors, isValid, handleChange } =
    useFormValidator();

  useEffect(() => {
    setValues({
      name,
      email,
    });
  }, [name, email]);
  console.log(name, email);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleUpdateUser(values);
  }

  useEffect(() => {
    resetServerErorr();
  }, []);

  return (
    <section className="profile-page">
      <h1 className="profile-page__heading">Привет, {name}!</h1>
      <form
        className="profile-page__form"
        name="profileForm"
        onSubmit={handleSubmit}
        noValidate
      >
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <div className="profile-page__info-container">
              <label className="profile-page__text">Имя</label>
              <input
                type="text"
                name="name"
                className="profile-page__input"
                id="name-input"
                minLength="2"
                maxLength="30"
                value={values.name || ""}
                onChange={handleChange}
                required
              />
            </div>
            <span className="profile-page__input-error">
              {errors.name || ""}
            </span>
            <div className="profile-page__info-container">
              <label className="profile-page__text">E-mail</label>
              <input
                type="email"
                name="email"
                className="profile-page__input"
                id="email-input"
                value={values.email || ""}
                onChange={handleChange}
                required
              />
            </div>
            <span className="profile-page__input-error">
              {errors.email || ""}
            </span>
            <div className="profile-page__edit-button-container">
              <span className="profile-page__server-error">
                {serverErrorMessage}
              </span>
              <button
                type="submit"
                className={`profile-page__edit-button ${
                  !isValid ? "profile-page__edit-button_disabled" : ""
                }`}
                disabled={
                  !isValid || (values.name === name && values.email === email)
                }
              >
                Редактировать
              </button>
            </div>
            <button
              type="button"
              className="profile-page__logout-button"
              onClick={handleLogOut}
            >
              Выйти из аккаунта
            </button>
          </>
        )}
      </form>
    </section>
  );
}

export default Profile;

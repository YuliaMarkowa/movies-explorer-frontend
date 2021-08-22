import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFormValidator from '../../hooks/useFormValidator';
import Preloader from '../Preloader/Preloader';
import './AuthForm.css';
import logo from '../../images/logo-header.svg';

function AuthForm({
  headingContent,
  submitContent,
  guessContent,
  pathContent,
  path,
  signUp,
  onSubmit,
  isLoading,
  serverErrorMessage,
  resetServerErorr,
}) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormValidator();

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(values);
  }

  useEffect(() => {
    resetForm();
    resetServerErorr();
  }, []);

  return (
    <section className="auth">
      <Link to="/">
        <img src={logo} alt="На главную страницу" className="auth__logo" />
      </Link>
      <h1 className="auth__heading">{headingContent}</h1>
      <form
        className="auth__form"
        name="authForm"
        onSubmit={handleSubmit}
        noValidate
      >
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            {signUp ? (
              <>
                <label className="auth__text">Имя</label>
                <input
                  type="text"
                  name="name"
                  className="auth__input"
                  id="name-input"
                  minLength="2"
                  maxLength="30"
                  value={values.name || ""}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
                <span className="auth__input-error">{errors.name || ""}</span>
                <label className="auth__text">E-mail</label>
                <input
                  type="email"
                  name="email"
                  className="auth__input"
                  id="email-input"
                  pattern="^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$"
                  value={values.email || ""}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
                <span className="auth__input-error">{errors.email || ""}</span>
                <label className="auth__text">Пароль</label>
                <input
                  type="password"
                  name="password"
                  className="auth__input"
                  id="password-input"
                  minLength="8"
                  value={values.password || ""}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
                <span className="auth__input-error">
                  {errors.password || ""}
                </span>
              </>
            ) : (
              <>
                <label className="auth__text">E-mail</label>
                <input
                  type="email"
                  name="email"
                  className="auth__input"
                  id="email-input"
                  value={values.email || ""}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
                <span className="auth__input-error">{errors.email || ""}</span>
                <label className="auth__text">Пароль</label>
                <input
                  type="password"
                  name="password"
                  className="auth__input"
                  id="password-input"
                  minLength="8"
                  value={values.password || ""}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
                <span className="auth__input-error">
                  {errors.password || ""}
                </span>
              </>
            )}
              <div className="auth__submit-container">
                <span className="auth__server-error">{serverErrorMessage}</span>
                <button
                  type="submit"
                  className={`auth__submit ${
                    !isValid ? "auth__submit_disabled" : ""
                  }`}
                  disabled={!isValid}
                >
                  {submitContent}
                </button>
              </div>
          </>
        )}
      </form>
      <p className="auth__caption">
        {guessContent}
        <Link to={path} className="auth__link">
          {pathContent}
        </Link>
      </p>
    </section>
  );
}

export default AuthForm;

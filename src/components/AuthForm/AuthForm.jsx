import './AuthForm.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo-header.svg';

function AuthForm({
  headingContent,
  submitContent,
  guessContent,
  pathContent,
  path,
  signUp,
}) {
  return (
    <section className="auth">
      <Link to="/">
        <img src={logo} alt="На главную страницу" className="auth__logo" />
      </Link>
      <h1 className="auth__heading">{headingContent}</h1>
      <form className="auth__form" name="authForm">
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
              required
            />
            <label className="auth__text">E-mail</label>
            <input
              type="email"
              name="email"
              className="auth__input"
              id="email-input"
              required
            />
            <label className="auth__text">Пароль</label>
            <input
              type="password"
              name="password"
              className="auth__input"
              id="password-input"
              minLength="8"
              required
            />
            <span className="auth__input-error">Что-то пошло не так...</span>
          </>
        ) : (
          <>
            <label className="auth__text">E-mail</label>
            <input
              type="email"
              name="email"
              className="auth__input"
              id="email-input"
              required
            />
            <label className="auth__text">Пароль</label>
            <input
              type="password"
              name="password"
              className="auth__input"
              id="password-input"
              minLength="8"
              required
            />
          </>
        )}
        <button type="submit" className="auth__submit">
          {submitContent}
        </button>
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

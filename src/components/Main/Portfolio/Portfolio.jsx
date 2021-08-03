import './Portfolio.css';
import arrow from '../../../images/portfolio-arrow.svg';

function Portfolio() {
  return (
    <section className="my-works">
      <div className="my-works__container">
        <h3 className="my-works__heading">Портфолио</h3>
        <div className="my-works__links">
          <a
            href="https://github.com/YuliaMarkowa/how-to-learn"
            target="_blank"
            rel="noreferrer"
            className="my-works__link"
          >
            Статичный сайт
            <img
              src={arrow}
              alt="Изображение стрелки"
              className="my-works__image"
            />
          </a>
          <a
            href="https://github.com/YuliaMarkowa/russian-travel"
            target="_blank"
            rel="noreferrer"
            className="my-works__link"
          >
            Адаптивный сайт
            <img
              src={arrow}
              alt="Изображение стрелки"
              className="my-works__image"
            />
          </a>
          <a
            href="https://github.com/YuliaMarkowa/react-mesto-auth"
            target="_blank"
            rel="noreferrer"
            className="my-works__link"
          >
            Одностраничное приложение
            <img
              src={arrow}
              alt="Изображение стрелки"
              className="my-works__image"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
import './AboutMe.css';
import avatar from '../../../images/student-img.jpeg';

function AboutMe() {
  return (
    <section className="myself">
      <div className="myself__container">
        <h2 className="myself__title">Студент</h2>
      <div className="myself__main">
        <div className="myself__info">
          <h3 className="myself__heading">Юля</h3>
          <p className="myself__caption">
            Фронтенд-разработчик, 32 года
          </p>
          <p className="myself__text">
          Я начала заниматься разработкой, не имея никакого опыта.
          Слушаю музыку на виниле.
          По образованию я инженер.
          </p>
          <nav className="myself__links">
          <a
            href="https://t.me/markowayulia"
            target="_blank"
            rel="noreferrer"
            className="myself__link"
          >
            Telegram
          </a>
          <a
            href="https://github.com/YuliaMarkowa"
            target="_blank"
            rel="noreferrer"
            className="myself__link"
          >
            Github
          </a>
        </nav>
        </div>
        <img src={avatar} alt="Аватар пользователя" className="myself__avatar" />
        </div>
        </div>
    </section>
  );
}

export default AboutMe;

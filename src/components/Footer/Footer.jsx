import './Footer.css';
const currentDate = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <h3 className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <div className="footer__nav-menu">
          <p className="footer__copyright">&copy; {currentDate}</p>
          <nav className="footer__navigation">
            <ul className="footer__links">
              <li className="footer__link-point">
                <a
                  href="https://praktikum.yandex.ru/profile/web/"
                  target="_blank"
                  rel="noreferrer"
                  className="footer__link"
                >
                  Яндекс.Практикум
                </a>
              </li>
              <li className="footer__link-point">
                <a
                  href="https://github.com/YuliaMarkowa"
                  target="_blank"
                  rel="noreferrer"
                  className="footer__link"
                >
                  Github
                </a>
              </li>
              <li className="footer__link-point">
                <a
                  href="https://t.me/markowayulia"
                  target="_blank"
                  rel="noreferrer"
                  className="footer__link"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

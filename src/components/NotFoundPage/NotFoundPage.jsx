import './NotFoundPage.css';
import { useHistory } from 'react-router-dom';

function NotFoundPage() {
    const history = useHistory();
    const back = () => history.goBack();

    return (
      <section className="wrong-path">
        <h1 className="wrong-path__heading">404</h1>
        <p className="wrong-path__text">Страница не найдена</p>
        <button type="button" onClick={back} className="wrong-path__button">
          Назад
        </button>
      </section>
    );
  };
  
  export default NotFoundPage;

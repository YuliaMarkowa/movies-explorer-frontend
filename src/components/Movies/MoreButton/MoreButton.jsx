import './MoreButton.css';

function MoreButton({moreMovies}) {
  return (
    <section className="more-button__container">
      <button aria-label="Загрузить ещё" type="button" className="more-button" onClick={moreMovies}>
        Ещё
      </button>
    </section>
  );
};

export default MoreButton;

import './AboutProject.css';

function AboutProject() {
    return(
        <section className="about-project">
          <h2 className="about-project__title">О проекте</h2>
              <div className="about-project__info">
              <article className="about-project__text">
                  <h3 className="about-project__info-heading">Дипломный проект включал 5 этапов</h3>
                  <p className="about-project__info-caption">Составление плана, работу над бэкендом,
                   вёрстку, добавление функциональности и финальные доработки.</p>
              </article>
              <article className="about-project__text">
                  <h3 className="about-project__info-heading">На выполнение диплома ушло 5 недель</h3>
                  <p className="about-project__info-caption">У каждого этапа был мягкий и жёсткий дедлайн,
                   которые нужно было соблюдать, чтобы успешно защититься.</p>
              </article>
              </div>
              <div className="about-project__length-container">
                  <div className="about-project__length-item">
              <div className="about-project__length">1 неделя</div>
              <p className="about-project__length-label">Back-end</p>
              </div>
              <div className="about-project__length-item">
              <div className="about-project__length about-project__length_light">4 недели</div>
              <p className="about-project__length-label">Front-end</p>
              </div>
              </div>
        </section>

    );
};

export default AboutProject;

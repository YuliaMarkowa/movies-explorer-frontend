import './Techs.css';

function Techs() {
  return (
    <section className="techs">
      <div className="techs__container">
        <h3 className="techs__title">Технологии</h3>
        <div className="techs__list">
          <h2 className="techs__heading">7 технологий</h2>
          <p className="techs__caption">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
        </div>
        <ul className="techs__stecks">
          <li className="techs__steck">HTML</li>
          <li className="techs__steck">CSS</li>
          <li className="techs__steck">JS</li>
          <li className="techs__steck">React</li>
          <li className="techs__steck">Git</li>
          <li className="techs__steck">Express.js</li>
          <li className="techs__steck">mongoDB</li>
        </ul>
      </div>
    </section>
  );
};

export default Techs;

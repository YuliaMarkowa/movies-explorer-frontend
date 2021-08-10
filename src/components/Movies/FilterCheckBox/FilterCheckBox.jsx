import './FilterCheckBox.css';

function FilterCheckBox() {
  return (
    <div className="switch">
      <label className="switch__container">
        <input type="checkbox" className="switch__input" />
        <span className="switch__slider" />
      </label>
      <span className="switch__text">Короткометражки</span>
    </div>
  );
};

export default FilterCheckBox;

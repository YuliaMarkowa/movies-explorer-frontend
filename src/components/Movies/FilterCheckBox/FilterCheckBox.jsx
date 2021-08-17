import './FilterCheckBox.css';

function FilterCheckBox({ isChecked, onClick }) {
  return (
    <div className="switch">
      <label className="switch__container">
        <input 
          type="checkbox" 
          className="switch__input"
          checked={isChecked}
          onChange={onClick}
         />
        <span className="switch__slider" />
      </label>
      <span className="switch__text">Короткометражки</span>
    </div>
  );
};

export default FilterCheckBox;

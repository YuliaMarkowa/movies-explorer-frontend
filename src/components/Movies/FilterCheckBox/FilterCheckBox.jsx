import './FilterCheckBox.css';
import{setLocalStorage} from '../../helpers/helperLocalStorage';

function FilterCheckBox({isChecked, setIsChecked}) {

  function changeIsCheked(event) {
        setIsChecked(event.target.checked);
        setLocalStorage('isChecked', event.target.checked);
  }

  return (
    <div className="switch">
      <label className="switch__container">
        <input 
          type="checkbox" 
          className="switch__input"
          checked={isChecked}
          onChange={changeIsCheked}
         />
        <span className="switch__slider" />
      </label>
      <span className="switch__text">Короткометражки</span>
    </div>
  );
};

export default FilterCheckBox;

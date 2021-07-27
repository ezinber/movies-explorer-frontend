import { memo } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <label htmlFor="filter-checkbox" className="filter-checkbox">
      <input
        className="filter-checkbox__invisible-checkbox"
        type="checkbox"
        id="filter-checkbox"
      />
      <span className="filter-checkbox__visible-checkbox" />
      Короткометражки
    </label>
  )
}

export default memo(FilterCheckbox);

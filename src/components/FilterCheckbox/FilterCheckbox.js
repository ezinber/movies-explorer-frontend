import { memo } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ inputRef }) {

  const handleChange = () => {
    inputRef.current.hasAttribute('checked')
      ? inputRef.current.removeAttribute('checked')
      : inputRef.current.setAttribute('checked', true);
  }

  return (
    <label htmlFor="filter-checkbox" className="filter-checkbox">
      <input
        className="filter-checkbox__invisible-checkbox"
        type="checkbox"
        id="filter-checkbox"
        onChange={handleChange}
        ref={inputRef}
      />
      <span className="filter-checkbox__visible-checkbox" />
      Короткометражки
    </label>
  )
}

export default memo(FilterCheckbox);

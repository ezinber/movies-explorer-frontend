import { memo, useState, useRef } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({ onSubmit }) {
  const [searchValue, setSearchValue] = useState('')
  const checkbox = useRef();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(searchValue, checkbox.current.hasAttribute('checked'));
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__input-wrapper">
        <input
          className="search-form__input"
          type="text"
          placeholder="Фильм"
          minLength="2"
          value={searchValue}
          onChange={handleChange}
          required
        />
        <button
          className="search-form__button button"
          type="submit"
          title="Найти"
        />
      </div>
      <FilterCheckbox inputRef={checkbox} />
    </form>
  )
}

export default memo(SearchForm);

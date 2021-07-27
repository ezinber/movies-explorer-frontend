import { memo } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  return (
    <form className="search-form">
      <div className="search-form__input-wrapper">
        <input
          className="search-form__input"
          type="text"
          placeholder="Фильм"
          minLength="2"
          required
        />
        <button
          className="search-form__button button"
          type="submit"
          title="Найти"
        />
      </div>
      <FilterCheckbox />
    </form>
  )
}

export default memo(SearchForm);

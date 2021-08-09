import { memo } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies({ movies }) {
  return (
    <main className="movies">
      <SearchForm />
      {movies && <MoviesCardList moviesList={movies} />}
      <button className="movies__more-button button" type="button">
        Ещё
      </button>
    </main>
  )
}

export default memo(Movies);

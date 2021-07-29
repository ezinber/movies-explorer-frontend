import { memo } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies({ movies }) {
  return (
    <main className="movies">
      <SearchForm />
      {movies && <MoviesCardList moviesList={movies} />}
    </main>
  )
}

export default memo(Movies);

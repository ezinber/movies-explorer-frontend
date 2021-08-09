import { memo } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

function SavedMovies({ movies }) {
  const savedMovies = movies?.filter(item => item.isSaved === true);

  return (
    <main className="movies">
      <SearchForm />
      {savedMovies && <MoviesCardList moviesList={savedMovies} buttonStyle="delete" />}
    </main>
  )
}

export default memo(SavedMovies);

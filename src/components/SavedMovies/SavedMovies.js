import { memo, useState } from 'react';
import { filterMovies } from '../../utils/MoviesUtils';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

function SavedMovies({ movies }) {
  const [moviesList, setMoviesList] = useState(movies);

  const handleSearchSubmit = (searchValue, isChecked) => {
    const filteredMovies = filterMovies(moviesList, searchValue, isChecked);
    setMoviesList(filteredMovies);
  }

  return (
    <main className="movies">
      <SearchForm onSubmit={handleSearchSubmit} />
      {movies && <MoviesCardList movies={moviesList} buttonStyle="delete" isSaved={true} />}
    </main>
  )
}

export default memo(SavedMovies);

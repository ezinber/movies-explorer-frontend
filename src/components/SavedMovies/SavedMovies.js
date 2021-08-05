import { memo, useEffect, useState } from 'react';
import { filterMovies } from '../../utils/MoviesUtils';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

function SavedMovies({ movies, onClick }) {
  const [moviesList, setMoviesList] = useState([]);

  const handleSearchSubmit = (searchValue, isChecked) => {
    const filteredMovies = filterMovies(moviesList, searchValue, isChecked);
    setMoviesList(filteredMovies);
  }

  useEffect(() => {
    setMoviesList(movies);
  }, [movies])

  return (
    <main className="movies">
      <SearchForm onSubmit={handleSearchSubmit} />
      {movies
        &&
          <MoviesCardList
            movies={moviesList}
            buttonStyle="delete"
            isSaved={true}
            onClick={onClick}
          />}
    </main>
  )
}

export default memo(SavedMovies);

import { memo, useEffect, useState } from 'react';
import { filterMoviesByName, filterMoviesByDuration } from '../../utils/MoviesUtils';
import { emptyMoviesListMessages } from '../../utils/constants';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

function SavedMovies({ movies, onClick }) {
  const {
    initialSavedMoviesMessage,
    emptyMoviesMessage,
  } = emptyMoviesListMessages;

  const [moviesList, setMoviesList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [emptyMessage, setEmptyMessage] = useState(initialSavedMoviesMessage);

  const handleSearchSubmit = (searchValue) => {
    if (movies.length > 0) {
      emptyMessage === initialSavedMoviesMessage
        && setEmptyMessage(emptyMoviesMessage);

      const filteredMovies = filterMoviesByName(movies, searchValue);

      return setMoviesList(filteredMovies);
    }

    return;
  }

  const handleSortByDuration = (check) => {
      emptyMessage === initialSavedMoviesMessage
        && moviesList.length > 0
          && setEmptyMessage(emptyMoviesMessage);

      setIsChecked(check);
  }

  useEffect(() => {
    const filteredMovies = isChecked
      ? filterMoviesByDuration(movies)
      : movies;

    setMoviesList(filteredMovies);
  }, [movies, isChecked])

  return (
    <main className="movies">
      <SearchForm
        onSubmit={handleSearchSubmit}
        handleSort={handleSortByDuration}
      />
      {moviesList.length > 0 ? (
        <MoviesCardList
          movies={moviesList}
          buttonStyle="delete"
          isSaved={true}
          onClick={onClick}
        />
      ) : (
        <span className="saved-movies__text-empty">
          {emptyMessage}
        </span>
      )}
    </main>
  )
}

export default memo(SavedMovies);

import { memo, useEffect, useState, useContext } from 'react';
import { IsLoadingContext } from '../../contexts/IsLoadingContext';
import {
  setDisplayedMoviesCount,
  filterMoviesByDuration 
} from '../../utils/MoviesUtils';
import { emptyMoviesListMessages } from '../../utils/constants';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import './Movies.css';

function Movies({
  movies,
  savedMovies,
  onSubmit,
  onClick,
}) {
  const {
    initialMoviesMessage,
    emptyMoviesMessage,
  } = emptyMoviesListMessages;

  const [moviesList, setMoviesList] = useState([]);
  const [initialCount, setInitialCount] = useState(0);
  const [additionCount, setAdditionCount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [emptyMessage, setEmptyMessage] = useState(initialMoviesMessage)

  const isLoading = useContext(IsLoadingContext);

  const handleAdd = () => {
    setMoviesList(movies?.slice(0, moviesList.length + additionCount));
  }

  const handleSearchSubmit = (searchValue) => {
    emptyMessage === initialMoviesMessage
      && setEmptyMessage(emptyMoviesMessage);

      onSubmit(searchValue);
  }

  const handleSortByDuration = (check) => {
    emptyMessage === initialMoviesMessage
      &&  moviesList.length > 0
        && setEmptyMessage(emptyMoviesMessage);

      setIsChecked(check);
  }

  useEffect(() => {
    const setCount = () => 
      setDisplayedMoviesCount(initialCount, setInitialCount, setAdditionCount);

    const filteredMovies = isChecked
      ? filterMoviesByDuration(movies)
      : movies;

    setCount();

    setMoviesList(filteredMovies.slice(0, initialCount));

    window.addEventListener('resize', setCount);

    return () => window.removeEventListener('resize', setCount);
  }, [movies, initialCount, isChecked])

  return (
    <main className="movies">
      <SearchForm onSubmit={handleSearchSubmit} handleSort={handleSortByDuration} />
      {isLoading ? (
        <Preloader />
      ) : moviesList.length > 0 ? (
        <MoviesCardList
          movies={moviesList}
          savedMovies={savedMovies}
          onClick={onClick}
        />
      ) : (
        <span className="movies__text-empty">
          {emptyMessage}
        </span>
      )}
      {!isLoading
        && moviesList.length < movies.length
          && moviesList.length >= initialCount
            && (
              <button
                className="movies__more-button button"
                type="button"
                onClick={handleAdd}
              >
                Ещё
              </button>
            )
      }
    </main>
  )
}

export default memo(Movies);

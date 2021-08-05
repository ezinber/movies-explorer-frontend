import { memo, useEffect, useState } from 'react';
import { setDisplayedMoviesCount } from '../../utils/MoviesUtils';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import './Movies.css';

function Movies({
  movies,
  savedMovies,
  handleSearchSubmit,
  onClick,
  isLoading
}) {
  const [moviesList, setMoviesList] = useState([]);
  const [initialCount, setInitialCount] = useState(0);
  const [additionCount, setAdditionCount] = useState(0);

  const handleAdd = () => {
    setMoviesList(movies?.slice(0, moviesList.length + additionCount));
  }

  useEffect(() => {
    const setCount = () => setDisplayedMoviesCount(initialCount, setInitialCount, setAdditionCount);

    setCount();

    setMoviesList(movies?.slice(0, initialCount));

    window.addEventListener('resize', setCount);

    return () => window.removeEventListener('resize', setCount);
  }, [movies, initialCount])

  return (
    <main className="movies">
      <SearchForm onSubmit={handleSearchSubmit} />
      {
        isLoading
        ? <Preloader />
        : moviesList
          &&
            <MoviesCardList
              movies={moviesList}
              savedMovies={savedMovies}
              onClick={onClick}
            />
      }
      {!isLoading && moviesList?.length < movies?.length &&
        <button
          className="movies__more-button button"
          type="button"
          onClick={handleAdd}
        >
          Ещё
        </button>
      }
    </main>
  )
}

export default memo(Movies);

import { memo, useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import './Movies.css';

function Movies({ movies, handleSearchSubmit, isLoading }) {
  const [moviesList, setMoviesList] = useState(movies);
  const [initialCount, setInitialCount] = useState(0);
  const [addCount, setAddCount] = useState(0);

  const handleAdd = () => {
    setMoviesList(movies?.slice(0, moviesList.length + addCount));
  }

  useEffect(() => {
    const handleCountSet = () => {
      const windowWidth = window.innerWidth;
  
      if (windowWidth >= 1088 && initialCount !== 12) {
        setInitialCount(12);
        setAddCount(3);
      } else if (windowWidth >= 690 && windowWidth < 1088 && initialCount !== 8) {
        setInitialCount(8);
        setAddCount(2);
      } else if (windowWidth < 690 && initialCount !== 5) {
        setInitialCount(5);
        setAddCount(1);
      }
    }

    handleCountSet();

    setMoviesList(movies?.slice(0, initialCount));

    window.addEventListener('resize', handleCountSet);

    return () => window.removeEventListener('resize', handleCountSet);
  }, [movies, initialCount])

  return (
    <main className="movies">
      <SearchForm onSubmit={handleSearchSubmit} />
      {isLoading ? <Preloader /> : moviesList && <MoviesCardList movies={moviesList} />}
      {!isLoading && moviesList?.length < movies?.length &&
        <button className="movies__more-button button" type="button" onClick={handleAdd}>
          Ещё
        </button>
      }
    </main>
  )
}

export default memo(Movies);

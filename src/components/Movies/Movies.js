import { memo } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import './Movies.css';

function Movies({ movies, handleSearchSubmit, isLoading }) {
/*
  const handleSubmit = (value) => {
    setKeyword(value);
    getAllMovies()
    .then((res) => {
      // setMovies(res);
      localStorage.setItem('movies', res);
      setMoviesList(res.filter((item) => item.nameRU.includes(keyword)));
      // setMoviesList(res);
    })
    .catch((err) => console.log(err));
  }
*/
/*
  useEffect(() => {
    if (!moviesList && localStorage.getItem('movies')) {
      const localMovies = JSON.parse(localStorage.getItem('movies'));
      setMoviesList(localMovies);
    }
  }, [])
*/
  return (
    <main className="movies">
      <SearchForm onSubmit={handleSearchSubmit} />
      {isLoading ? <Preloader /> : movies && <MoviesCardList movies={movies} />}
      {!isLoading &&
        <button className="movies__more-button button" type="button">
          Ещё
        </button>
      }
    </main>
  )
}

export default memo(Movies);

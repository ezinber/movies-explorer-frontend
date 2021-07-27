import { memo } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

function Movies() {
  const moviesList = [
    {
      _id: '3',
      nameRU: '33 слова о дизайне',
      duration: '1ч 47м',
      image: 'https://picsum.photos/800/600',
      isSaved: true,
    },
    {
      _id: '5',
      nameRU: '33 слова о дизайне',
      duration: '1ч 47м',
      image: 'https://picsum.photos/800/600',
      isSaved: true,
    },
  ];

  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList moviesList={moviesList} />
    </main>
  )
}

export default memo(Movies);
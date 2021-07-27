import { memo } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies() {
  const moviesList = [
    {
      _id: '1',
      nameRU: '33 слова о дизайне',
      duration: '1ч 47м',
      image: 'https://picsum.photos/800/600',
      isSaved: false,
    },
    {
      _id: '2',
      nameRU: '33 слова о дизайне',
      duration: '1ч 47м',
      image: 'https://picsum.photos/800/600',
      isSaved: false,
    },
    {
      _id: '3',
      nameRU: '33 слова о дизайне',
      duration: '1ч 47м',
      image: 'https://picsum.photos/800/600',
      isSaved: true,
    },
    {
      _id: '4',
      nameRU: '33 слова о дизайне',
      duration: '1ч 47м',
      image: 'https://picsum.photos/800/600',
      isSaved: false,
    },
    {
      _id: '5',
      nameRU: '33 слова о дизайне',
      duration: '1ч 47м',
      image: 'https://picsum.photos/800/600',
      isSaved: true,
    },
    {
      _id: '6',
      nameRU: '33 слова о дизайне',
      duration: '1ч 47м',
      image: 'https://picsum.photos/800/600',
      isSaved: false,
    },
  ];

  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList moviesList={moviesList} />
      <button className="movies__more-button button" type="button">
        Ещё
      </button>
    </main>
  )
}

export default memo(Movies);

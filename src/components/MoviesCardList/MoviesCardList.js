import { memo } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ moviesList }) {
  return (
    <ul className="movies-card-list">
      {moviesList.map(movie => (
        <MoviesCard
          key={movie._id}
          movie={movie}
        />
      ))}
    </ul>
  )
}

export default memo(MoviesCardList);

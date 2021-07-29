import { memo } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ moviesList, buttonStyle }) {
  return (
      <ul className="movies-card-list">
        {moviesList.map(movie => (
          <MoviesCard
            key={movie._id}
            movie={movie}
            buttonStyle={buttonStyle}
          />
        ))}
      </ul>
  )
}

export default memo(MoviesCardList);

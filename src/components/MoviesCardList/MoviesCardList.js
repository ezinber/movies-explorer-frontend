import { memo } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ movies, buttonStyle }) {

  return (
      <ul className="movies-card-list">
        {movies.map(movie => (
          <MoviesCard
            key={movie.id}
            movie={movie}
            buttonStyle={buttonStyle}
          />
        ))}
      </ul>
  )
}

export default memo(MoviesCardList);

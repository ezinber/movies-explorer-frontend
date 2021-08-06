import { memo } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ movies, ...props }) {
  console.log(movies);
  return (
      <ul className="movies-card-list">
        {movies.map(movie => (
          <MoviesCard
            key={movie.id}
            movie={movie}
            {...props}
          />
        ))}
      </ul>
  )
}

export default memo(MoviesCardList);

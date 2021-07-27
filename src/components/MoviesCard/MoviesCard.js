import { memo } from 'react';
import './MoviesCard.css';

function MoviesCard({ movie }) {

  return (
    <li className="movies-card">
      <h2 className="movies-card__title" title={movie.nameRU}>
        {movie.nameRU}
      </h2>
      <p className="movies-card__duration">
        {movie.duration}
      </p>
      <div className="movies-card__image-wrapper">
        <img className="movies-card__image" src={movie.image} alt={movie.nameRU} />
      </div>
      <button
        className={`button movies-card__save-button${movie.isSaved ? ' movies-card__save-button_saved' : ''}`}
        type="button"
        title="Сохранить"
      />
    </li>
  )
}

export default memo(MoviesCard);

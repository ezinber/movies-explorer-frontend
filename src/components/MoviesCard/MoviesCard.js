import { memo } from 'react';
import { VENDOR_URL } from '../../config';
import { calcMovieDuration } from '../../utils/MoviesUtils';
import './MoviesCard.css';

function MoviesCard({
  movie,
  savedMovies,
  isSaved = savedMovies?.some((item) => item.id === movie.id),
  buttonStyle = 'saved'
}) {
  const buttonClassMod = ` movies-card__button_type_${buttonStyle}`
  const duration = calcMovieDuration(movie.duration);

  return (
    <li className="movies-card">
      <h2 className="movies-card__title" title={movie.nameRU}>
        {movie.nameRU}
      </h2>
      <p className="movies-card__duration">
        {duration}
      </p>
      <div className="movies-card__image-wrapper">
        <img
          className="movies-card__image"
          src={VENDOR_URL + movie.image.url}
          alt={movie.nameRU}
        />
      </div>
      <button
        className={`button movies-card__button${isSaved ? buttonClassMod : ''}`}
        type="button"
      />
    </li>
  )
}

export default memo(MoviesCard);

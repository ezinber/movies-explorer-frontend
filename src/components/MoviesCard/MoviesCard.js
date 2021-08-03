import { memo } from 'react';
import { VENDOR_URL } from '../../utils/MoviesApi';
import './MoviesCard.css';

function MoviesCard({ movie, buttonStyle = 'saved' }) {
  const buttonClassMod = ` movies-card__button_type_${buttonStyle}`

  const calcDuration = (t) => {
    if (t > 59) {
      const h = (t - t % 60) / 60;
      const m = t % 60;

      return `${h}ч ${m > 0 ? m + 'м' : ''}`
    }

    return `${t}м`;
  }

  const duration = calcDuration(movie.duration);

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
        className={`button movies-card__button${movie.isSaved ? buttonClassMod : ''}`}
        type="button"
      />
    </li>
  )
}

export default memo(MoviesCard);

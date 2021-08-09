import { memo } from 'react';
import { VENDOR_URL } from '../../config';
import { calcMovieDuration } from '../../utils/MoviesUtils';
import { trailerPlug } from '../../utils/constants';
import './MoviesCard.css';

function MoviesCard({
  movie,
  savedMovies,
  onClick,
  isSaved = savedMovies?.some((item) => item.id === movie.id),
  buttonStyle = 'saved'
}) {
  const buttonClassMod = ` movies-card__button_type_${buttonStyle}`
  const duration = calcMovieDuration(movie.duration);

  const handleClickMovieButton = () => {
    onClick(movie, isSaved);
  }

  const trailer = movie.trailerLink && movie.trailerLink.includes('http', 0)
  ? movie.trailerLink
  : trailerPlug;

  return (
    <li className="movies-card">
      <h2 className="movies-card__title" title={movie.nameRU}>
        {movie.nameRU}
      </h2>
      <p className="movies-card__duration">
        {duration}
      </p>
      <div className="movies-card__image-wrapper">
        <a
          className="button"
          href={trailer}
          target='_blank'
          rel="noreferrer"
          title="Посмотреть трейлер"
        >
          <img
            className="movies-card__image"
            src={VENDOR_URL + movie.image.url}
            alt={movie.nameRU}
          />
        </a>
      </div>
      <button
        className={`button movies-card__button${isSaved ? buttonClassMod : ''}`}
        type="button"
        onClick={handleClickMovieButton}
        title={isSaved ? 'Убрать из сохранённых' : 'Сохранить'}
      />
    </li>
  )
}

export default memo(MoviesCard);

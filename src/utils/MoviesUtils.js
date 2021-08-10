import { ShortFilmDuration } from "../config";

export const filterMoviesByName = (data, searchValue) => {
  const filteredMovies = data.filter((item) => {
    const name = item.nameRU.toLowerCase();
    const search = searchValue.toLowerCase();

    return name.includes(search);
  })

  return filteredMovies;
}

export const filterMoviesByDuration = (data) => {
  const filteredMovies = data.filter((item) => {
    return item.duration <= ShortFilmDuration;
  })

  return filteredMovies;
}

export const calcMovieDuration = (t) => {
  if (t > 59) {
    const h = (t - t % 60) / 60;
    const m = t % 60;

    return `${h}ч ${m > 0 ? m + 'м' : ''}`
  }

  return `${t}м`;
}

export const setDisplayedMoviesCount = (initialCount, setInitialCount, setAddCount) => {
  const windowWidth = window.innerWidth;

  if (windowWidth >= 1088 && initialCount !== 12) {
    setInitialCount(12);
    setAddCount(3);
  } else if (windowWidth >= 690 && windowWidth < 1088 && initialCount !== 8) {
    setInitialCount(8);
    setAddCount(2);
  } else if (windowWidth < 690 && initialCount !== 5) {
    setInitialCount(5);
    setAddCount(1);
  }
}

export const convertMovie = (res, url) => {
  const movieData = {
    ...res,
    image: {
      url: res.image.replace(url, ''),
      formats: {
        thumbnail: res.thumbnail.replace(url, ''),
      }
    },
    trailerLink: res.trailer,
    id: res.movieId,
  }

  return movieData;
}

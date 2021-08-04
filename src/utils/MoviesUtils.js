export const filterMovies = (data, searchValue, isChecked) => {
  const filteredMovies = data.filter((item) => {
    const name = item.nameRU.toLowerCase();
    const search = searchValue.toLowerCase();
    const isShort = item.duration <= 40;

    if (isChecked) {
      return name.includes(search) && isShort;
    }

    return name.includes(search);
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

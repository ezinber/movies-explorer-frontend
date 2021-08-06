import { BASE_URL, VENDOR_URL } from "../config";
import { convertMovie } from "./MoviesUtils";

export const register = (
  name,
  email,
  password,
) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })
  .then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};

export const signin = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};

export const signout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'GET',
    credentials: 'include',
  })
  .then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};

export const getUser = () => {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: 'include',
  })
  .then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

export const saveMovie = ({
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  nameRU,
  nameEN,
  id,
}) => {
  const trailer = trailerLink.includes('http', 0)
    ? trailerLink
    : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      country: country || '...',
      director: director || '...',
      duration,
      year: year || '...',
      description: description || '...',
      image: VENDOR_URL + image.url,
      trailer,
      nameRU: nameRU || '...',
      nameEN: nameEN || '...',
      thumbnail: VENDOR_URL + image.formats.thumbnail.url,
      movieId: id,
    }),
  })
  .then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  .then((res) => convertMovie(res, VENDOR_URL))
};

export const deleteMovie = (movieId) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  .then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
}

export const getSavedMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    credentials: 'include',
  })
  .then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  .then((res) => res.map((item) => convertMovie(item, VENDOR_URL)))
}

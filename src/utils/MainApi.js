import { BASE_URL } from "../config";

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
  trailer,
  nameRU,
  nameEN,
  thumbnail,
  movieId,
}) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    }),
  })
  .then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};

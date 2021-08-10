import { BASE_URL, VENDOR_URL } from "../config";
import { trailerPlug } from "./constants";
import { convertMovie } from "./MoviesUtils";

const handleFirstResponse = (res) => 
  res.ok ? res.json() : Promise.reject(res.status);

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
  .then((res) => handleFirstResponse(res));
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
  .then((res) => handleFirstResponse(res));
};

export const signout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'GET',
    credentials: 'include',
  })
  .then((res) => handleFirstResponse(res));
};

export const getUser = () => {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: 'include',
  })
  .then((res) => handleFirstResponse(res));
}

export const updateUser = (name, email) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      name,
      email,
    }),
  })
  .then((res) => handleFirstResponse(res));
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
      trailer: trailerLink || trailerPlug,
      nameRU: nameRU || '...',
      nameEN: nameEN || '...',
      thumbnail: VENDOR_URL + image.formats.thumbnail.url,
      movieId: id,
    }),
  })
  .then((res) => handleFirstResponse(res))
  .then((res) => convertMovie(res, VENDOR_URL))
};

export const deleteMovie = (movieId) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  .then((res) => handleFirstResponse(res));
}

export const getSavedMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    credentials: 'include',
  })
  .then((res) => handleFirstResponse(res))
  .then((res) => res.map((item) => convertMovie(item, VENDOR_URL)))
}

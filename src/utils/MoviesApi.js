export const VENDOR_URL = 'https://api.nomoreparties.co';
export const AUTH_TOKEN = 'c0773531-78a8-4cdf-a081-1a1c757b9f2b';

export const getAllMovies = () => {
  return fetch(`${VENDOR_URL}/beatfilm-movies`)
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

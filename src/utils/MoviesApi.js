import { VENDOR_URL } from "../config";

export const getAllMovies = () => {
  return fetch(`${VENDOR_URL}/beatfilm-movies`)
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

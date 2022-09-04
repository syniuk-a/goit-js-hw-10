import Notiflix from "notiflix";
import 'notiflix/dist/notiflix-3.2.5.min.css';

export function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
      if (!response.ok) {
        throw Notiflix.Notify.failure("Oops, there is no country with that name")
      }
      return response.json();
    });
};
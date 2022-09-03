import '../css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function createCountry(country) {
  const markup = country.map(({ flags, name }) => {
    return `<p><img src="${flags.svg}" alt="flag" width="30px"/>${name.official}</p>`
  }).join('');

  countryInfo.innerHTML = markup;
};
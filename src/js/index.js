import './css/styles.css';
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

function createMarkup(data) {
  const country = data.map(({ name, flags, capital, population, languages }) => {
    return `<h1><img src="${flags.svg}" class="country" alt="flag" width="30px"/>${name.official}</h1>
        <ul>
            <li>Capital:<span>${capital}</span></li>
            <li>Population:<span>${population}</span></li>
            <li>Languages:<span>${Object.values(languages).join(', ')}</span></li>
        </ul>`}).join('');
  
  countryList.innerHTML = country;
  countryInfo.innerHTML = '';
};

searchBox.addEventListener('input', debounce(() => {
  const name = searchBox.value.trim();
  if (name === '') {
    return;
  }
  fetchCountries(name).this(showCountry).catch(showError);
}, DEBOUNCE_DELAY));

function showError(error) {
  console.log(error);
};

function showCountry(country) {
  if (country.status === 404) {
    return Notiflix.Notify.failure("Oops, there is no country with that name");
  } else if (country.length > 10) {
    return Notiflix.Notify.info("Too many matches found. Please enter a more specific name");
  } else if (country.length >= 2 && country.length <= 10) {
    return createCountry(country)
  } else {
    return createMarkup(country)
  }
};
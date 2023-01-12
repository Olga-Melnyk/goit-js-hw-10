import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { debounce } from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

// input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const countryName = input.value;
}

fetchCountries('peru').then(data => console.log(data));

function createList({ flags, name }) {
  return `<li>
    <img src="${flags.svg}" alt="${name.official}">
        <h2>${name.official}</h2>
</li>`;
}

function createCard({ name, capital, population, flags, languages }) {
  return `<div>
        <img src="${flags.svg}" alt="${name.official}" />
        <h2>${name.official}</h2>
      </div>
      <p><span>Capital:</span> ${capital}</p>
      <p><span>Population:</span> ${population}</p>
      <p><span>Languages:</span> ${languages}</p>`;
}

/* <li>
    <img src="" alt="">
        <h2></h2>
</li> */

/* <div>
        <img src="" alt="" />
        <h2></h2>
      </div>
      <p></p>
      <p></p>
      <p></p> */

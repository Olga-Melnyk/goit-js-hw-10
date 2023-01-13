import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { debounce } from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#search-box');
const countrylist = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  const countryName = input.value;
  if (countryName === '') {
    countrylist.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(countryName)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        countrylist.innerHTML = '';
        countryInfo.innerHTML = '';
      }
      if (countries.length <= 10) {
        const markupList = countries.map(country => createList(country));
        countrylist.innerHTML = markupList.json('');
        countryInfo.innerHTML = '';
      }
      if (countries.length === 1) {
        const markupInfo = countries.map(country => createCard(country));
        countryInfo.innerHTML = markupInfo.json('');
        countrylist.innerHTML = '';
      }
    })
    .catch(err => {
      Notify.failure('Oops, there is no country with that name');
      countrylist.innerHTML = '';
      countryInfo.innerHTML = '';
      return err;
    });

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
}

import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { debounce } from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#search-box');
const countrylist = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

let countryName = '';
const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  countryName = input.value.trim();
  if (countryName === '') {
    countrylist.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  } else {
    fetchCountries(countryName)
      .then(countries => {
        if (countries.length < 10 && countries.length > 1) {
          createList(countries);
          countryInfo.innerHTML = '';
        } else if (countries.length === 1) {
          createCard(countries);
          countrylist.innerHTML = '';
        } else {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          countrylist.innerHTML = '';
          countryInfo.innerHTML = '';
        }
      })
      .catch(err => {
        Notify.failure('Oops, there is no country with that name');
        countrylist.innerHTML = '';
        countryInfo.innerHTML = '';
        return err;
      });

    function createList(countries) {
      const markupList = countries
        .map(
          country =>
            `<li>
    <img src="${country.flags.svg}" alt="${country.name.official}" width="40", height="30">
        <p>${country.name.official}</p>
</li>`
        )
        .join('');
      countrylist.insertAdjacentHTML('beforeend', markupList);
    }

    function createCard(countries) {
      const country = countries[0];
      const markupInfo = `<div><div>
        <img src="${country.flags.svg}" alt="${
        country.name.official
      }" width="40", height="30" />
        <h2>${country.name.official}</h2>
      </div>
      <p><span>Capital:</span> ${country.capital}</p>
      <p><span>Population:</span> ${country.population}</p>
      <p><span>Languages:</span> ${Object.values(country.languages).join(
        ', '
      )}</p></div>`;
      countryInfo.innerHTML = markupInfo;
    }
  }
}

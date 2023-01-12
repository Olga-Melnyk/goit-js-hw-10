import './css/styles.css';

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('click', onSearch);

const DEBOUNCE_DELAY = 300;

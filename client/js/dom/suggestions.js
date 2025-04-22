import {input, suggestions} from "../common/constants.js";
import {filterCountriesByName} from "../functions/prepareData.js";

export function suggestedCountry(countries) {
  suggestions.innerHTML = '';
  const query = input.value.toLowerCase();
  const filteredCountries = filterCountriesByName(query, countries);

  if (query.length === 0 || filteredCountries.length === 0) {
    suggestions.style.display = 'none';
    return Promise.resolve(null);
  }
  suggestions.style.display = 'block';

  return new Promise(resolve => {
    filteredCountries.forEach(country => {
      const li = document.createElement('li');
      li.innerHTML = `<p>${country.name}</p>`;
      li.addEventListener('click', () => {
        input.value = country.name;
        suggestions.innerHTML = '';
        suggestions.style.display = 'none';
        resolve(country);
      });
      suggestions.appendChild(li);
    });
  });
}

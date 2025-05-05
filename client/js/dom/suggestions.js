import {input, suggestions} from "../common/constants.js";
import {filterCountriesByName} from "../functions/prepare_data.js";

export function suggestedCountry(countries) {
  suggestions.innerHTML = '';
  suggestions.scrollTop = 0;
  const query = input.value.toLowerCase();

  if (query.length === 0) {
    suggestions.style.display = 'none';
    return Promise.resolve(null);
  }

  const filteredCountries = filterCountriesByName(query, countries);
  suggestions.style.display = 'block';

  if (filteredCountries.length === 0){
    const li = document.createElement("li");
    li.innerHTML = `<p class="nsc-error">There's no such country</p>`;
    suggestions.appendChild(li);
    return Promise.resolve(null);
  }

  return new Promise(resolve => {
    filteredCountries.forEach(country => {
      const li = document.createElement('li');
      li.innerHTML = `<p>${country.name}</p>`;
      li.addEventListener('click', () => {
        input.value = '';
        suggestions.innerHTML = '';
        suggestions.style.display = 'none';
        resolve(country);
      });
      suggestions.appendChild(li);
    });
  });
}

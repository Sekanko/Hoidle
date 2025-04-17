import {filterCountriesByName, getCountries, sendGuess} from "./functions.js";
import {form, guesses, input, submitEvent, suggestions} from "./constants.js";


async function main(){
  let countries = await getCountries();
  let guess;

  console.log(countries);

//input
  input.addEventListener('input',() => {
    suggestions.innerHTML = '';
    const query = input.value.toLowerCase();

    if (query.length === 0){
      return;
    }

    const filteredCountries = filterCountriesByName(query, countries);


    filteredCountries.forEach(country => {
      const li = document.createElement('li');
      li.innerHTML = `<h2>${country.name}</h2>`;

      li.addEventListener('click',() => {

        suggestions.innerHTML = '';
        input.value = country;
        guess = country;
        form.dispatchEvent(submitEvent);
        input.value = '';
      });
        suggestions.append(li);
    });
  });

//form
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!countries.includes(guess)){
      alert("Country doesn't exists");
      return;
    }

    let fieldColorsAsResult = await sendGuess(guess);
    fieldColorsAsResult = fieldColorsAsResult.map(color => color.toLowerCase());

    const wholeGuessContainer = document.createElement('div');
    wholeGuessContainer.style.display = 'flex';

    Object.entries(guess).forEach((field, index) => {
      const fieldDiv = document.createElement('div')
      const color = fieldColorsAsResult[index];
      const fieldValue = field[1];
      fieldDiv.style.background = color;
      fieldDiv.className = 'fieldContainer'
      fieldDiv.innerHTML = `<p>${fieldValue}</p>`
      wholeGuessContainer.append(fieldDiv);
    });
    guesses.append(wholeGuessContainer);

    countries = countries.filter(country => country !== guess);

    if (fieldColorsAsResult.every(color => color === "green")){
      console.log("You won");
    }
  });
}

main();

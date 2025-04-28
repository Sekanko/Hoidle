import {form, guesses, input, submitEvent} from "./common/constants.js";
import {getCountries, sendGuess} from "./api/data.js";
import {createGuessRow, slideDownWholeTableAnimation} from "./dom/dom.js";
import {waitForAnimationEnd} from "./functions/waitForAnimation.js";
import {suggestedCountry} from "./dom/suggestions.js";
import {winFunctionality} from "./dom/win.js";
import fitty from 'https://cdn.skypack.dev/fitty';
import {errorProcedure} from "./dom/error.js";

async function main(){
  let countries = await getCountries().catch(error => errorProcedure(error));
  let guess;

  input.addEventListener('input',async () => {

    guess = await suggestedCountry(countries).catch(error => errorProcedure(error));

    if (guess) {
      form.dispatchEvent(submitEvent);
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const inputValue = input.value.toLowerCase().trim();

    if (inputValue !== ""){
      const firstSuggestion = await document.querySelector('li p');

      if (firstSuggestion !== null && !firstSuggestion.classList.contains('nsc-error')) {
        await firstSuggestion.click().catch(error => errorProcedure(error));
      }
    }

    if (!countries.includes(guess)){
      return;
    }

    const tbody = document.querySelector("#guesses tbody");
    const hasRows = tbody.querySelectorAll("tr").length !== 0;

    let fieldColorsAsResult = await sendGuess(guess).catch(error => errorProcedure(error));
    fieldColorsAsResult = fieldColorsAsResult.map(color => color.toLowerCase());

    if (hasRows) {
      slideDownWholeTableAnimation(guesses, 'wholeGuess',true);

      tbody.classList.add("shift-down");
      await waitForAnimationEnd(tbody);
      tbody.classList.remove("shift-down");
    }

    const row = createGuessRow(guess, fieldColorsAsResult);

    guesses.tBodies[0].prepend(row);
    await fitty(".fieldValue",{
      maxSize: 18,
      minSize: 10,
      multiLine: true
    });

    countries = countries.filter(country => country !== guess);
    guess = ''

    if (fieldColorsAsResult.every(color => color === "green")){
      await winFunctionality().catch(error => errorProcedure(error));
    }
  });
}

main();

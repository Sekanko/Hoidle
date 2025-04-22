import {form, guesses, input, submitEvent, suggestions} from "./common/constants.js";
import {getCountries, sendGuess} from "./api/data.js";
import {createGuessRow, slideDownWholeTableAnimation} from "./dom/dom.js";
import {waitForAnimationEnd} from "./functions/promises.js";
import {suggestedCountry} from "./dom/suggestions.js";
import {winFunctionality} from "./dom/win.js";

async function main(){
  let countries = await getCountries();
  let guess;

  //DEBUG
  console.log(countries);

  input.addEventListener('input',async () => {
    guess = await suggestedCountry(countries);

    if (guess) {
      form.dispatchEvent(submitEvent);
    }
    console.log(guess);
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    form.reset();
    //TODO: submit button and "enter" key as working submit options

    if (!countries.includes(guess)){
      return;
    }

    const tbody = document.querySelector("#guesses tbody");
    const hasRows = tbody.querySelectorAll("tr").length !== 0;

    let fieldColorsAsResult = await sendGuess(guess);
    fieldColorsAsResult = fieldColorsAsResult.map(color => color.toLowerCase());

    if (hasRows) {
      slideDownWholeTableAnimation(guesses, 'wholeGuess',true);

      tbody.classList.add("shift-down");
      await waitForAnimationEnd(tbody);
      tbody.classList.remove("shift-down");
    }

    const row = createGuessRow(guess, fieldColorsAsResult);
    guesses.tBodies[0].prepend(row);

    // countries = countries.filter(country => country !== guess);
    guess = ''

    if (fieldColorsAsResult.every(color => color === "green")){
      await winFunctionality();
    }
  });
}

main();

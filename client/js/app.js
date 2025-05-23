import {form, guesses, input, registerEndpoint, submitEvent} from "./common/constants.js";
import {getCountries, sendGuess} from "./api/data.js";
import {createGuessRow, setSlideHeight} from "./dom/guess_table.js";
import {waitForAnimationEnd} from "./functions/wait_for_animation.js";
import {suggestedCountry} from "./dom/suggestions.js";
import {winFunctionality} from "./dom/win.js";
import fitty from 'https://cdn.skypack.dev/fitty';
import {errorProcedure} from "./dom/error.js";
import {signIn, signUp, signOut} from "./dom/auth/sign.js";
import {signing} from "./dom/auth/authView.js";
import {sendUser} from "./dom/auth/sendUser.js";

async function main(){
  if (localStorage.getItem('token') !== null){
    const accHolder = document.querySelector("#accountHolder");
    accHolder.innerHTML = JSON.parse(localStorage.getItem('user')).username;
  }

  let countries = await getCountries().catch(error => errorProcedure(error));
  countries.sort((a, b) => a.name.localeCompare(b.name));
  let guess;

  const account = document.querySelector('#account');
  account.addEventListener('click', () => {

    if (localStorage.getItem('token') !== null){
      const loggedInList = document.querySelector("#loggedInList");
      loggedInList.classList.toggle("hidden");

      const signOutButton = document.querySelector("#signOut");
      signOutButton.addEventListener('click', () => {
        signOut();
        location.reload();
      });

    } else {
        const signList = document.querySelector("#signList");
        signList.classList.toggle("hidden");

        const signInButton = document.querySelector("#signIn");
        const signUpButton = document.querySelector("#signUp");

        if (!signInButton.dataset.listenerAttached) {
          signInButton.addEventListener('click', () => {
            signing("Sign in", signIn);
          });
          signInButton.dataset.listenerAttached = "true";
        }

      if (!signUpButton.dataset.listenerAttached) {
        signUpButton.addEventListener('click', () => {
          signing("Register", signUp);
        });
        signUpButton.dataset.listenerAttached = "true";
      }
    }
  });

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
      setTimeout(async () => {
        const firstSuggestion = document.querySelector('li p');
        if (firstSuggestion !== null && !firstSuggestion.classList.contains('nsc-error')) {
          await firstSuggestion.click();
        }
      }, 0);
    }

    if (!countries.includes(guess)){
      return;
    }

    const tbody = document.querySelector("#guesses tbody");
    const hasRows = tbody.querySelectorAll("tr").length !== 0;

    let fieldColorsAsResult = await sendGuess(guess).catch(error => errorProcedure(error));
    fieldColorsAsResult = fieldColorsAsResult.map(color => color.toLowerCase());

    if (hasRows) {
      setSlideHeight(guesses, '.wholeGuess');

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

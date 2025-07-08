import {form, guesses, input, submitEvent} from "./common/constants.js";
import {getCountries, sendGuess} from "./api/data.js";
import {createGuessRow, setSlideHeight} from "./dom/guess_table.js";
import {waitForAnimationEnd} from "./functions/wait_for_animation.js";
import {suggestedCountry} from "./dom/suggestions.js";
import {winFunctionality} from "./dom/win.js";
import fitty from 'https://cdn.skypack.dev/fitty';
import {errorProcedure} from "./dom/error.js";
import {signIn, signOut, signUp} from "./api/sign.js";
import {signing} from "./dom/auth/authView.js";
import {loaded, loading} from "./dom/loading.js";
import {getAttemptsLeaderBoard, getStreakLeaderBoard} from "./api/leaderBoards.js";
import {buildLeaderBoard} from "./dom/auth/leaderborad.js";
import {showUserDetails} from "./dom/auth/accountDetailsView.js";
import {getUserInfo} from "./api/userInfo.js";

async function main(){
  loading('Unfortunately, due to my poor budget, which is currently 0.00$' +
    ', I can\'t give you data any faster. Please wait, it will take around 2 minutes.');
  if (localStorage.getItem('token') !== null){
    const accHolder = document.querySelector("#accountHolder");
    const user = await getUserInfo().catch(error => errorProcedure(error));
    accHolder.innerHTML = user.username;
    localStorage.setItem('user', JSON.stringify(user));
  }

  let attempts = 0;
  let countries = await getCountries().catch(error => errorProcedure(error));
  let attemptsLeaders = await getAttemptsLeaderBoard().catch(error => errorProcedure(error));
  let streakLeaders = await getStreakLeaderBoard().catch(error => errorProcedure(error));

  const leaderboardIntervalFunction = async () => {
    try {
      attemptsLeaders = await getAttemptsLeaderBoard();
      streakLeaders = await getStreakLeaderBoard();
      await buildLeaderBoard(attemptsLeaders,'#attempts');
      await buildLeaderBoard(streakLeaders, '#streak');
    } catch (err) {
      errorProcedure(err);
    }
  }

  await leaderboardIntervalFunction();
  setInterval(leaderboardIntervalFunction, 30000);

  loaded();
  const attemptsButton = document.querySelector("#attemptsButton");
  const streakButton = document.querySelector("#streakButton");

  const attemptsContainer = document.querySelector('#attempts');
  const streakContainer = document.querySelector('#streak');

  attemptsButton.addEventListener('click', () => {
    attemptsContainer.classList.remove("hidden");
    streakContainer.classList.add("hidden");
  });

  streakButton.addEventListener('click', () => {
    attemptsContainer.classList.add("hidden");
    streakContainer.classList.remove("hidden");
  });
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

      const detailsButton = document.querySelector("#details");
      if (!detailsButton.dataset.listenerAttached){
        detailsButton.addEventListener('click', () => {
          showUserDetails();
        });
        detailsButton.dataset.listenerAttached = "true";
      }
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
    attempts++;

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
      await winFunctionality(attempts).catch(error => errorProcedure(error));
    }
  });
}

main();

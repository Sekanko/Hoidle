export {
  dataAllCountries,
  sendGuessDirection,
  input,
  suggestions,
  form,
  submitEvent,
  guesses,
};


const dataAllCountries = 'http://localhost:8081/data/allCountries';
const sendGuessDirection = 'http://localhost:8081/game/control/guessed';
const input = document.getElementById("guessInput");
const suggestions = document.getElementById("suggestions");
const form = document.getElementById('guessForm')
const guesses = document.getElementById('guesses');
const submitEvent = new Event('submit', {
  bubbles: true,
  cancelable: true
});


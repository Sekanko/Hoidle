export {
  dataAllCountries,
  sendGuessDirection,
  input,
  suggestions,
  form,
  submitEvent,
  guesses,
  rgbaColors,
};

const dataAllCountries = 'https://hoidle-1-1-0-latest.onrender.com/data/allCountries';
const sendGuessDirection = 'https://hoidle-1-1-0-latest.onrender.com/game/control/guessed';
const input = document.getElementById("guessInput");
const suggestions = document.getElementById("suggestions");
const form = document.getElementById('guessForm');
const guesses = document.getElementById('guesses');
const submitEvent = new Event('submit', {
  bubbles: true,
  cancelable: true
});

const alpha = 0.9;
const rgbaColors = {
  red: `rgba(255, 0, 0, ${alpha})`,
  green: `rgba(101, 175, 82, ${alpha})`,
  orange: `rgba(255, 165, 0, ${alpha})`
};

//api
const http = 'http://localhost:8080/';
// const http = 'https://hoidle.onrender.com/';
// const http = 'https://hoidle-tin.onrender.com/';
export const dataAllCountries = http + 'data/allCountries';
export const sendGuessDirection = http + 'game/control/guessed';
export const login = http + 'auth/login';
export const registerEndpoint = http + 'auth/register';
export const top5AttemptsEndpoint = http + 'auth/top5/attempts';
export const top5StreakEndpoint = http + 'auth/top5/streak';
export const updateEndpoint = http + 'auth/update';
export const todaysCountryEndpoint = http + 'game/control/dayCountryOfTheDay';

//dom
export const input = document.getElementById("guessInput");
export const suggestions = document.getElementById("suggestions");
export const form = document.getElementById('guessForm');
export const guesses = document.getElementById('guesses');

//other
export const submitEvent = new Event('submit', {
  bubbles: true,
  cancelable: true
});

export const alpha = 0.9;
export const rgbaColors = {
  red: `rgba(255, 0, 0, ${alpha})`,
  green: `rgba(101, 175, 82, ${alpha})`,
  orange: `rgba(255, 165, 0, ${alpha})`
};

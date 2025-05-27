//api
export const dataAllCountries = 'http://localhost:8080/data/allCountries';
export const sendGuessDirection = 'http://localhost:8080/game/control/guessed';
// export const dataAllCountries = 'https://hoidle-1-1-0-latest.onrender.com/data/allCountries';
// export const sendGuessDirection = 'https://hoidle-1-1-0-latest.onrender.com/game/control/guessed';

export const login = 'http://localhost:8080/auth/login';
export const registerEndpoint = 'http://localhost:8080/auth/register';
export const top5AttemptsEndpoint = 'http://localhost:8080/auth/top5/attempts';
export const top5StreakEndpoint = 'http://localhost:8080/auth/top5/streak'
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

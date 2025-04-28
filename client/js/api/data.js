import {dataAllCountries, sendGuessDirection} from "../common/constants.js";

export {
  getCountries,
  sendGuess
}

async function getCountries() {
  let countries = [];
  const response = await fetch(dataAllCountries);

  if (!response.ok){
    throw new Error("Data wasn't received");
  }
  return response.json();
}
async function sendGuess(guess) {
    return await fetch(
      sendGuessDirection,
      {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(guess)
      }
    ).then(response => {
      if (!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    });
}

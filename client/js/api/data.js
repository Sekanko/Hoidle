import {dataAllCountries, sendGuessDirection} from "../common/constants.js";
import {loaded, loading} from "../dom/loading.js";

export {
  getCountries,
  sendGuess
}

async function getCountries() {
  loading('Unfortunately, due to my poor budget, which is currently 0.00$' +
    ', I can\'t give you data any faster. Please wait, it will take around 2 minutes.');
  try {
    const response = await fetch(dataAllCountries);

    if (!response.ok) {
      throw new Error("Data wasn't received");
    }
    return await response.json();
  } finally {
    loaded();
  }
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

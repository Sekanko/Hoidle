import {dataAllCountries, sendGuessDirection} from "./constants.js";

export {
  getCountries,
  sendGuess,
  filterCountriesByName
};

async function getCountries() {
   let countries = [];

   try {
     const response = await fetch(dataAllCountries);

     if (!response.ok){
       throw new Error("Data wasn't received");
     }
     return response.json();
   } catch (e){
     console.log(e);
     return [];
   }
 }

 async function sendGuess(guess) {
  try {
    const response =
      await fetch(
        sendGuessDirection,
        {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(guess)
        }
      );
    return response.json();
  } catch (e){
    throw new Error(e)
  }
}

function filterCountriesByName(name, countries){
  return countries.filter(country => country.name.toLowerCase().includes(name));
}



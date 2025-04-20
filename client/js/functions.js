import {dataAllCountries, sendGuessDirection} from "./constants.js";

export {
  getCountries,
  sendGuess,
  filterCountriesByName,
  prepareFieldForDisplay
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

function prepareFieldForDisplay(field){

  if (typeof field === "number"){
    return field;
  }

  let displayValue = field;

  if (Array.isArray(displayValue)) {
    displayValue = displayValue.join(",</br>");
  }

  displayValue = String(displayValue);
  displayValue = displayValue.trim().replaceAll('_',' ').toLowerCase();
  displayValue = displayValue.charAt(0).toUpperCase() + displayValue.slice(1);

  return displayValue;
}

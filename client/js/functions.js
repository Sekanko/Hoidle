import {dataAllCountries, guesses, sendGuessDirection} from "./constants.js";

export {
  getCountries,
  sendGuess,
  filterCountriesByName,
  prepareFieldForDisplay,
  waitForAnimationEnd,
  slideDownWholeTableAnimation
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

function waitForAnimationEnd(element) {
  return new Promise(resolve => {
    element.addEventListener("animationend", resolve, { once: true });
  });
}

function slideDownWholeTableAnimation(element, trClass) {

  const rowHeight = element
    .getElementsByClassName(trClass)[0]
    .getBoundingClientRect()
    .height;

  const tableStyle = window.getComputedStyle(element);
  const borderSpacing = tableStyle.getPropertyValue('border-spacing');
  const [columnGap, rowGap] =
    borderSpacing.split(' ')
    .map(v => parseFloat(v));

  const animationHeight = rowHeight + rowGap;

  document
    .documentElement
    .style
    .setProperty('--element-height', `${animationHeight}px`);
}

export {
  filterCountriesByName,
  prepareFieldForDisplay
}

function filterCountriesByName(name, countries){
  return countries.filter(country => country.name.toLowerCase().startsWith(name.toLowerCase()));
}

function prepareFieldForDisplay(field){

  if (typeof field === "number"){
    return field;
  }

  let displayValue = field;

  if (Array.isArray(displayValue)) {
    displayValue = displayValue.map(v => prepareValue(v));

    displayValue = displayValue.join(", ");
  } else {
    displayValue = prepareValue(displayValue);
  }

  return displayValue;
}


function prepareValue(value){
  let returnValue = String(value);
  returnValue = returnValue.trim().replaceAll('_',' ').toLowerCase();
  returnValue = returnValue.split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return returnValue;
}

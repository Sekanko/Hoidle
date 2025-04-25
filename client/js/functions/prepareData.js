export {
  filterCountriesByName,
  prepareFieldForDisplay
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
  returnValue = returnValue.charAt(0).toUpperCase() + returnValue.slice(1);
  return returnValue;
}

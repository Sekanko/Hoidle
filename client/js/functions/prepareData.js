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
    displayValue = displayValue.join(",</br>");
  }

  displayValue = String(displayValue);
  displayValue = displayValue.trim().replaceAll('_',' ').toLowerCase();
  displayValue = displayValue.charAt(0).toUpperCase() + displayValue.slice(1);

  return displayValue;
}

export {
  filterCountriesByName,
  prepareFieldForDisplay
}

function filterCountriesByName(name, countries){
  name = name.toLowerCase().replaceAll(' ','');
  return countries.filter(country => {
    const countryName = country.name.toLowerCase();
    const countryNameSplit = countryName.split(' ');
    let text ='';
    for (let i=countryNameSplit.length - 1; i > 0; i--) {
      text = countryNameSplit[i] + text;
      if (text.startsWith(name)){
        return true;
      }
    }
    return countryName.replaceAll(' ','').startsWith(name);
  });
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
  let returnValue = String(value).replace(/([a-z])([A-Z])/g, '$1 $2') ;
  returnValue = returnValue.trim().replaceAll('_',' ').toLowerCase();
  returnValue = returnValue.split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return returnValue;
}

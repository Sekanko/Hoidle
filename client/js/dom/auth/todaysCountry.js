import {todaysCountryEndpoint} from "../../common/constants.js";

export async function getTodaysCountry(){
  const response = await fetch(todaysCountryEndpoint,{
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
  });

  if (!response.ok){
    throw new Error("Something went wrong!");
  }
  const data = await response.json();
  return data.countryName;
}

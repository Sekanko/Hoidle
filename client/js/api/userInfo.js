import {userInfoEndpoint} from "../common/constants.js";

export async function getUserInfo(){
  const token = localStorage.getItem('token');

  const response = await fetch(userInfoEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
      "Authorization": `Bearer ${token}`
    },
    body: token
  })
  if (!response.ok){
    throw new Error();
  }
  return await response.json();
}

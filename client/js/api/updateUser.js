import {updateEndpoint} from "../common/constants.js";

export async function updateUser(userToSave){
  const token = localStorage.getItem('token');
  userToSave.password = "uselessButRequiredToUpdateField";

  const response = await fetch(updateEndpoint, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(userToSave)
  });

  if (!response.ok){
    throw new Error();
  }
}

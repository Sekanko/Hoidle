import {login, registerEndpoint,} from "../../common/constants.js";
import {sendUser} from "./sendUser.js";
export async function signIn(email, password) {
  const response = await sendUser(email, password, login);

  const json = await response.json();
  const user = json.user;
  const token = json.token;

  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

export async function signUp(email, password) {
  await sendUser(email, password, registerEndpoint);
}

export function signOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.reload();
}

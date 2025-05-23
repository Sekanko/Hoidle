import {loaded, loading} from "../loading.js";

export function signing(type, functionToCall) {
  const isRegister = type === 'Register';
  const instance = basicLightbox.create(`
  <div id="authForm">
      <h2>${type}</h2>
      <input type="text" placeholder="email" id="email">
      <input type="password" placeholder="Password" id="password">
      ${isRegister ? '<input type="password" placeholder="Confirm password" id="confirmPassword">' : ''}
      <button id="submit" class="hoiButton">${type}</button>
      <button id="authCancel" class="hoiButton">Go back</button>
    </div>
  `);

  instance.show();

  const cancel = document.querySelector('#authCancel');
  cancel.addEventListener('click', () => instance.close());

  const submit = document.querySelector('#submit');
  submit.addEventListener('click', () => {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    if (isRegister) {
      const confirmPassword = document.querySelector('#confirmPassword').value;
      if (password !== confirmPassword){
        throw new Error('Passwords do not match');
      }
    }

    loading("Logging in ...");

    functionToCall(email, password)
      .then(() => {
        location.reload();
      })
      .catch(error => {
        const authForm = document.querySelector('#authForm');
        if (error.status === 401){
          authForm.prepend(errorContainer('Wrong credentials. Please try again.'));
        } else {
          authForm.prepend(errorContainer('Something went wrong. Please try again.'));
        }
        loaded();
      });
  })
}

function errorContainer(message) {
  let errorDiv = document.querySelector('.error');
  if (errorDiv !== null){
    errorDiv.remove();
  }
  errorDiv = document.createElement('div');
  errorDiv.classList.add('error');
  errorDiv.innerHTML = message;
  return errorDiv;
}

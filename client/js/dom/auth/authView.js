import {loaded, loading} from "../loading.js";

export function signing(type, functionToCall) {
  const isRegister = type === 'Register';
  const instance = basicLightbox.create(`
  <div id="authForm">
      <h2>${type}</h2>
      <input type="text" placeholder="email" id="email" required>
      <input type="password" placeholder="Password" id="password" required>
      ${isRegister ? '<input type="password" placeholder="Confirm password" id="confirmPassword" required>' : ''}
      <button id="submit" class="hoiButton">${type}</button>
      <button id="authCancel" class="hoiButton">Go back</button>
    </div>
  `,
    {
      onShow: (instance) => {
        document.body.style.overflow = "hidden";
      },
      onClose: (instance) => {
        document.body.style.overflow = "";
      }
    }
  );

  instance.show();

  const cancel = document.querySelector('#authCancel');
  cancel.addEventListener('click', () => instance.close());

  const submit = document.querySelector('#submit');
  submit.addEventListener('click', () => {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const authForm = document.querySelector('#authForm');

    if (isRegister) {
      const confirmPassword = document.querySelector('#confirmPassword').value;
      if (password !== confirmPassword){
        authForm.prepend(errorContainer('Passwords do not match'));
        return;
      }
    }

    if (isRegister){
      loading('Singing up ...');
    } else {
      loading("Logging in ...");
    }
    functionToCall(email, password)
      .then(() => {
        location.reload();
      })
      .catch(error => {
        console.log(error)
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

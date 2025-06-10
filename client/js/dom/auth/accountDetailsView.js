import {updateUser} from "../../api/updateUser.js";
import {errorProcedure} from "../error.js";
import {prepareFieldForDisplay} from "../../functions/prepare_data.js";
import {getTodaysCountry} from "./todaysCountry.js";

export function showUserDetails() {
  const user = JSON.parse(localStorage.getItem("user"));
  let allFields = '';

  Object.entries(user).forEach(([key, value]) => {
    const displayKey = prepareFieldForDisplay(key);
    const accountFieldContainer = `
    <div class="accountFieldCont">
        <div class="accountFieldName">${displayKey}</div>
        <div class="fieldRow">
          <input id="${key}Value" class="accountInput" value="${value}" readonly>
          ${key === 'username' ? `<button id="${key}Edit" class="hoiButton">Edit</button>` : ''}
        </div>
      </div>`
    allFields += accountFieldContainer;
  });

  const isAdmin = user.role === 'ADMIN';

  const instance = basicLightbox.create(`
  <div id="accountDetails">
  ${allFields}
    <button id="closeButton" class="hoiButton">Close</button>
    ${isAdmin ? `<div id="todaysCountry">Show today's country</div>` : ``}
  </div>
  `,
    {
      onShow: (instance) => {
        document.body.style.overflow = "hidden";
      },
      onClose: (instance) => {
        document.body.style.overflow = "";
      }
    });
  instance.show();

  if (isAdmin){
    const todaysCoutryContainer = document.querySelector('#todaysCountry');
    todaysCoutryContainer.addEventListener('click', async () => {
      todaysCoutryContainer.innerText = await getTodaysCountry();
      todaysCoutryContainer.classList = 'revealed';
    });
  }

  const usernameEditButton = document.querySelector('#usernameEdit');
  usernameEditButton.addEventListener('click', async () => {
    if (usernameEditButton.textContent === 'Save') {
      const currentUsername = user.username;
      const newUsername = document.querySelector('#usernameValue').value;

      if (currentUsername !== newUsername) {
        try {
          let cloneUser = Object.assign({}, user);
          cloneUser.username = newUsername;
          await updateUser(cloneUser);
          user.username = newUsername;
          localStorage.setItem('user', JSON.stringify(user));
          location.reload();
        } catch (err) {
          errorProcedure(err);
        }
      }
    }
    const usernameInput = document.querySelector('#usernameValue');
    const isNowReadonly = usernameInput.toggleAttribute("readonly");
    usernameEditButton.textContent = isNowReadonly ? 'Edit' : 'Save';
  });

  const cancelButton = document.querySelector('#closeButton');
  cancelButton.addEventListener('click', () => instance.close());
}

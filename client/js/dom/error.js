import {loaded} from "./loading.js";
import {signOut} from "../api/sign.js";

export function errorProcedure(error){
  loaded();
  if (document.querySelector('.error') !== null){
    return;
  }

  const instance = basicLightbox.create(`
    <div class="error">
        ${error.message} Please try again or&nbsp;
        <u id="reset" style="cursor: pointer">reset data</u>
    </div>
  `,
    {
      closable: false,
      onShow: (instance) => {
        document.body.style.overflow = "hidden";
      },
      onClose: (instance) => {
        document.body.style.overflow = "";
      }
    });
  instance.show();
  document.querySelector('#reset').addEventListener('click',()=> {
    signOut();
  });
}

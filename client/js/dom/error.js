import {loaded} from "./loading.js";

export function errorProcedure(error){
  loaded();
  if (document.querySelector('.error') !== null){
    return;
  }

  const instance = basicLightbox.create(`
    <div class="error"> ${error.message} Please try again.</div>
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
}

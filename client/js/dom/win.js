import {form} from "../common/constants.js";
import {waitForAnimationEnd} from "../functions/wait_for_animation.js";
import {errorProcedure} from "./error.js";

export async function winFunctionality() {
  let allElementsInForm = Array.from(form.querySelectorAll("*"));
  allElementsInForm = allElementsInForm.filter(el => !el.classList.contains('suggestions'));

  allElementsInForm.forEach(element => {
    element.classList.add('hide');
  });

  const article = document.querySelector("article");
  const articleStyles = getComputedStyle(article);
  const topMargin = parseFloat(articleStyles.marginTop);

  const finalDivHeight = form.offsetHeight + topMargin / 2;
  const finalArticleTopMargin = topMargin / 2;

  for (const element of allElementsInForm) {
    if (element.tagName === 'UL') {
      element.remove();
      continue;
    }
    await waitForAnimationEnd(element).catch(error => errorProcedure(error));
    element.remove();
  }


  const div = document.createElement('div');
  div.classList.add('winInformation');
  div.classList.add('appear');
  div.style.height = `${finalDivHeight}px`;
  div.style.width = `40%`;
  div.innerHTML =
    `<p>Congratulations!</p>
         <p>You have guessed the correct country!</p>
        `;
  article.style.marginTop = `${finalArticleTopMargin}px`;
  form.appendChild(div);
}

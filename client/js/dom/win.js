import {form} from "../common/constants.js";
import {waitForAnimationEnd} from "../functions/wait_for_animation.js";
import {errorProcedure} from "./error.js";
import {updateUser} from "../api/updateUser.js";

export async function winFunctionality(attempts) {
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

  const formatter = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Europe/Warsaw',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const parts = formatter.formatToParts(new Date());
  const year = parts.find(p => p.type === 'year').value;
  const month = parts.find(p => p.type === 'month').value;
  const day = parts.find(p => p.type === 'day').value;
  const today = `${year}-${month}-${day}`;

  const user = JSON.parse(localStorage.getItem('user'));
  if (user === null){
    return;
  }

  if (user.lastWin !== today){
    user.todaysAttempts = attempts;
    user.streak += 1;
    user.lastWin = today;
    user.longestStreak = Math.max(user.longestStreak, user.streak);
    let cloneUser = Object.assign({}, user);

    try {
      await updateUser(cloneUser);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (err){
      errorProcedure(err);
    }
  } else {
    const instance = basicLightbox.create(`
      <div class="info">You have already played today, so data will not be updated</div>
    `)
    instance.show();
  }
}

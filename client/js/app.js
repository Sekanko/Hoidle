import {
  filterCountriesByName,
  getCountries,
  prepareFieldForDisplay,
  sendGuess, slideDownWholeTableAnimation,
  waitForAnimationEnd
} from "./functions.js";
import {form, guesses, input, rgbaColors, submitEvent, suggestions} from "./constants.js";
async function main(){
  let countries = await getCountries();
  let guess;

  console.log(countries);

  //input
  input.addEventListener('input',() => {
    suggestions.innerHTML = '';
    const query = input.value.toLowerCase();
    const filteredCountries = filterCountriesByName(query, countries);

    if (query.length === 0 || filteredCountries.length === 0) {
      suggestions.style.display = 'none';
      return;
    }

    suggestions.style.display = 'block';


    filteredCountries.forEach(country => {
      const li = document.createElement('li');
      li.innerHTML = `<p>${country.name}</p>`;

      li.addEventListener('click',() => {

        suggestions.innerHTML = '';
        input.value = country;
        guess = country;
        form.dispatchEvent(submitEvent);
        input.value = '';
        suggestions.style.display = 'none';
      });
        suggestions.append(li);
    });
  });

//form
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!countries.includes(guess)){
      alert("Country doesn't exists");
      return;
    }

    let fieldColorsAsResult = await sendGuess(guess);
    fieldColorsAsResult = fieldColorsAsResult.map(color => color.toLowerCase());

    //animation
    const tbody = document.querySelector("#guesses tbody");
    const hasRows = tbody.querySelectorAll("tr").length !== 0;

    if (hasRows) {
      slideDownWholeTableAnimation(guesses, 'wholeGuess',true);

      tbody.classList.add("shift-down");
      await waitForAnimationEnd(tbody);
      tbody.classList.remove("shift-down");
    }

    const tr = document.createElement('tr');
    tr.classList.add('wholeGuess');

    Object.entries(guess)
      .forEach((field, index) => {
        const fieldTd = document.createElement('td')
        const color = fieldColorsAsResult[index];
        let displayValue = field[1];

        if (typeof displayValue === "boolean"){
          displayValue = displayValue ? "Yes" : "No";
        } else if (field[0] !== "name"){
          displayValue = prepareFieldForDisplay(displayValue);
        }

        fieldTd.style.background = rgbaColors[color] || color;
        fieldTd.className = 'fieldContainer';
        fieldTd.innerHTML = `<p class="fieldValue">${displayValue}</p>`;
        fieldTd.style.animationDelay = `${index * 0.2}s`;

        tr.append(fieldTd);
    });
    guesses.tBodies[0].prepend(tr);

    // countries = countries.filter(country => country !== guess);

    if (fieldColorsAsResult.every(color => color === "green")){
      let allElementsInForm = Array.from(form.querySelectorAll("*"));
      allElementsInForm = allElementsInForm.filter(el => !el.classList.contains('suggestions'));

      allElementsInForm.forEach(element => {
        element.classList.add('hide');
      })

      const article = document.querySelector("article");
      const articleStyles = getComputedStyle(article);
      const topMargin = parseFloat(articleStyles.marginTop);

      const finalDivHeight = form.offsetHeight + topMargin/2;
      const finalArticleTopMargin = topMargin/2;


      for (const element of allElementsInForm) {
        if (element.tagName === 'UL'){
          element.remove();
          continue;
        }
        await waitForAnimationEnd(element);
        element.remove();
      }

      const div = document.createElement('div');
      div.classList.add('winInformation');
      div.classList.add('appear');
      div.style.height = `${finalDivHeight}px`;
      div.style.width = `40%`;
      // div.style.marginBottom = `${finalDivHeight*0.2}`
      div.innerHTML =
        `<p>Congratulations!</p>
         <p>You have guessed correct country!</p>
        `;
      article.style.marginTop = `${finalArticleTopMargin}px`;
      form.appendChild(div);

    }
  });
}

main();

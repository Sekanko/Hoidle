import {rgbaColors} from "../common/constants.js";
import {prepareFieldForDisplay} from "../functions/prepareData.js";


export {
  slideDownWholeTableAnimation,
  createGuessRow,
  fitInText,
}

function slideDownWholeTableAnimation(elementToMove, elementToGetHeightFrom, isClassName= false) {
  let rowHeight;
  if (isClassName) {
    rowHeight = elementToMove
      .getElementsByClassName(elementToGetHeightFrom)[0]
      .getBoundingClientRect()
      .height;
  } else {
    rowHeight = elementToMove
      .getElementsByTagName(elementToGetHeightFrom)[0]
      .getBoundingClientRect()
      .height;
  }

  const tableStyle = window.getComputedStyle(elementToMove);
  const borderSpacing = tableStyle.getPropertyValue('border-spacing');
  const [columnGap, rowGap] =
    borderSpacing.split(' ')
      .map(v => parseFloat(v));

  const animationHeight = rowHeight + rowGap;

  document
    .documentElement
    .style
    .setProperty('--element-height', `${animationHeight}px`);
}

function createGuessRow(guess, colors) {
  const tr = document.createElement('tr');
  tr.classList.add('wholeGuess');

  Object.entries(guess)
    .forEach((field, index) => {
      const fieldTd = document.createElement('td')
      const color = colors[index];
      let displayValue = field[1];

      if (typeof displayValue === "boolean"){
        displayValue = displayValue ? "Yes" : "No";
      } else if (field[0] !== "name"){
        displayValue = prepareFieldForDisplay(displayValue);
      }

      fieldTd.style.background = rgbaColors[color] || color;
      fieldTd.className = 'fieldContainer';
      const cont = document.createElement('div');
      cont.className = 'centerContainer';
      const text = document.createElement('span');
      text.innerHTML = displayValue;
      text.className = 'fieldValue';
      cont.append(text);
      fieldTd.append(cont);

      fieldTd.style.animationDelay = `${index * 0.2}s`;

      tr.append(fieldTd);
    });

  return tr;
}

function fitInText(el, minFont = 8, maxFont = 36) {
  let fontSize = maxFont;
  el.style.fontSize = fontSize + "px";
  el.style.whiteSpace = 'nowrap';

  console.log(el)
  console.log(el.textContent);
  console.log(el.width);


  while (el.scrollWidth > el.clientWidth && fontSize > minFont) {
    fontSize--;
    el.style.fontSize = fontSize + "px";
  }
}

import {rgbaColors} from "../common/constants.js";
import {prepareFieldForDisplay} from "../functions/prepare_data.js";


export {
  setSlideHeight,
  createGuessRow,
}

function setSlideHeight(elementToMove, ValueOfElementForQuerySelector) {
  let rowHeight;
  rowHeight = elementToMove
    .querySelector(ValueOfElementForQuerySelector)
    .getBoundingClientRect()
    .height;

  const tableStyle = window.getComputedStyle(elementToMove);
  const borderSpacing = tableStyle.getPropertyValue('border-spacing');

  const [columnGap, rowGapRaw] = borderSpacing.split(' ');
  const rowGap = parseFloat(rowGapRaw ?? columnGap);

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

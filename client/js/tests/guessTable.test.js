import {createGuessRow, setSlideHeight} from '../dom/guessTable.js'
import {rgbaColors} from "../common/constants.js";

describe('Guess table unit test', () => {
  let table;
  beforeEach(() => {
    table = document.createElement('table');
    table.style.borderSpacing = '2px';
    let tr = document.createElement('tr');
    for (let i = 0; i < 5; i++) {
      const th = document.createElement('th');
      th.innerHTML = `<span>span ${i + 1}</span>`;
      tr.appendChild(th);
    }
    table.appendChild(tr);

    for (let i = 0; i < 5; i++) {
      tr = document.createElement('tr');
      tr.classList.add('wholeGuess');
      for (let j = 0; j < 5; j++) {
        const td = document.createElement('td');
        td.innerHTML = `<span class="fieldValue">${i+1}. span ${j + 1}</span>`;
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }

    document.body.appendChild(table);
    const firstRow = table.getElementsByClassName('wholeGuess')[0];

    firstRow.getBoundingClientRect = () => ({
      x: 0,
      y: 0,
      width: 100,
      height: 123,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      toJSON: () => {}
    });

    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({
        getPropertyValue: (prop) => (prop === 'border-spacing' ? '2px' : '')
      })
    });
  });

  test('Set slide height test', () => {
    setSlideHeight(table, '.wholeGuess');
    const value = document.documentElement.style.getPropertyValue('--element-height');
    expect(value).toBe('125px');
  });

  test('Create guess row test',() => {
    const guess = {
      stringField: "String",
      numberField: 1,
      booleanField: true,
      arrayField: [1, 2, 3],
      randomField: ['1 String, 2 String, 3 String'],
    }
    const colors = ['red', 'green', 'green', 'orange', 'red'];
    const row = createGuessRow(guess, colors);

    expect(row).not.toBeNull();
    expect(row.children.length).toBe(5);

    for (let i = 0; i < 5; i++) {
      const rowElement = row.children[i];
      const elemntBgColor = rowElement.style.backgroundColor;
      expect(elemntBgColor).toBe(rgbaColors[colors[i]] || colors[i]);

      const guessValue = Object.values(guess)[i]

      if (i === 2){
        expect(rowElement.textContent).toBe('Yes' || 'No');
      } else if (i === 1){
        expect(parseInt(rowElement.textContent) ).toBe(guessValue);
      } else if (i === 3){
        expect(rowElement.textContent).toBe('1, 2, 3');
      } else {
        expect(rowElement.textContent).toBe(guessValue.toString());
      }
    }

  })

});

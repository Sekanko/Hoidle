import {suggestedCountry} from '../dom/suggestions.js';
import {screen, waitFor} from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as constants from "../common/constants.js";

describe('Sugestions unit test', () => {
  jest.mock('../common/constants.js', () => ({
    suggestions: null,
    inp: null,
  }))

  let input, suggestions, countries;

  beforeEach(() => {
    const header = document.createElement('header');
    header.innerHTML = 'TEST HEADER';
    const article = document.createElement('article');
    article.style.marginTop = '100px';

    const form = document.createElement('form');
    form.id = 'guessForm';
    input = document.createElement('input');
    suggestions = document.createElement('ul');
    form.appendChild(input);
    form.appendChild(suggestions);

    article.appendChild(form);

    document.body.appendChild(header);
    document.body.appendChild(article);

    Object.defineProperties(constants, {
      input: {
        value: input,
        writable: true,
      },
      suggestions: {
        value: suggestions,
        writable: true,
      }
    });

    countries = [
      {name: 'Australia'},
      {name: 'Austria'},
      {name: 'Belarus'},
      {name: 'Belgium'},
      {name: 'Bosnia and Herzegovina'},
      {name: 'Bulgaria'},
      {name: 'Croatia'},
      {name: 'Czechia'},
      {name: 'Denmark'},
      {name: 'Estonia'}
    ]
  });


  test('Input value is empty', async () => {
    input.value = '';
    const result = await suggestedCountry(countries);
    expect(suggestions.innerHTML).toBe('');

    expect(suggestions.style.display).toBe('none');
    expect(result).toBeNull();
  });

  test('Input value is not empty but there is not country matching it', async () => {
    input.value = 'wrong input value';
    const result = await suggestedCountry(countries);

    expect(suggestions.innerHTML).not.toBe('');
    expect(suggestions.style.display).toBe('block');
    expect(result).toBeNull();

    expect(suggestions.innerHTML).toBe('<li><p class="nsc-error">There\'s no such country</p></li>');
  });

  test('There is a match to input value', async () => {
    input.value = 'Bosnia a';
    suggestedCountry(countries);

    await waitFor(() => suggestions.innerHTML);

    setTimeout(() => {}, 1)
    expect(suggestions.innerHTML).not.toBe('');
    expect(suggestions.style.display).toBe('block');
    expect(suggestions.innerHTML).toBe('<li><p>Bosnia and Herzegovina</p></li>');
  });

  test('There is a match to input value with click event', async () => {
    input.value = 'C';
    const guessName = 'Czechia'

    const result = suggestedCountry(countries);

    await waitFor(() => screen.getByText(guessName));
    const li = screen.getByText(guessName);
    await userEvent.click(li);

    const finalResult = await result;

    expect(finalResult).toEqual({name: guessName});
    expect(input.value).toBe('');
    expect(suggestions.innerHTML).toBe('');
    expect(suggestions.style.display).toBe('none');

  });

});

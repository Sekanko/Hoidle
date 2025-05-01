import { winFunctionality } from '../dom/win.js';
import * as constants from '../common/constants.js';

describe('Win functionality unit test', () => {
  jest.mock('../common/constants.js', () => ({
    form: null,
  }));

  let form;

  beforeEach(() => {
    const header = document.createElement('header');
    header.innerHTML = 'TEST HEADER';
    const article = document.createElement('article');
    article.style.marginTop = '100px';

    form = document.createElement('form');
    form.id = 'guessForm';
    form.innerHTML = '<span>TEST FORM</span>';
    form.style.height = '50px';

    Object.defineProperty(constants, 'form', {
      value: form,
      writable: true,
    });

    article.appendChild(form);
    document.body.appendChild(header);
    document.body.appendChild(article);
  });

  test('Win functionality', async () => {
    const formHeight = form.offsetHeight;

    await winFunctionality();
    const article = document.querySelector('article');

    expect(article).not.toBeNull();
    expect(article.style.marginTop).toBe('50px');

    const winDiv = document.querySelector('.winInformation');

    expect(winDiv).not.toBeNull();
    expect(winDiv.innerHTML).not.toBe('');
    expect(winDiv.style.height).toBe(formHeight + 50 + "px");
    expect(form.textContent.includes('TEST FORM')).toBe(false);
  });
});

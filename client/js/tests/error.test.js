import {errorProcedure} from '../dom/error.js';

describe('Testing of error  view', () => {
  beforeEach(() => {
    const header = document.createElement('header');
    header.innerHTML = 'TEST HEADER';
    const article = document.createElement('article');
    article.innerHTML = 'TEST ARTICLE';

    document.body.appendChild(header);
    document.body.appendChild(article);
  });

  test('Error procedure', () => {
    const error = new Error('Test error');
    errorProcedure(error);
    const errorDiv = document.querySelector('.error');
    expect(errorDiv).not.toBeNull();
    expect(errorDiv.innerHTML).toBe('Test error');

    const header = document.querySelector('header');
    expect(header).not.toBeNull();
    expect(header.innerHTML).toBe('TEST HEADER');
  })
});

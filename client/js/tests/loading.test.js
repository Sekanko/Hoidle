import { loading, loaded } from "../dom/loading.js";

describe("loading functionalities", () => {
  let article;
  beforeEach(() => {
    article = document.createElement('article');
    const div = document.createElement('div');
    div.innerHTML = 'TEST DIV';

    const form = document.createElement('form');
    form.innerHTML = 'TEST FORM';

    article.appendChild(div);
    article.appendChild(form);
    document.body.appendChild(article);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("loading", () => {
    loading();
    expect(article.innerHTML).not.toBe('');
    expect(article.querySelector('.loadingContainer')).not.toBeNull();
  });

  test("loaded", () => {
    const div = document.createElement('div');
    div.className = 'loadingContainer';
    article.appendChild(div);

    const content = document.createElement('p');
    content.textContent = "Hello";
    content.style.display = "none";
    article.appendChild(content);

    loaded();

    expect(article.querySelector('.loadingContainer')).toBeNull();
    expect(content.style.display).toBe('');
  })
});

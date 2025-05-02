export function errorProcedure(error){
  const article = document.querySelector("article");

  article.innerHTML = '';

  const errorContainer = document.createElement('div');
  errorContainer.className = 'error';
  errorContainer.innerHTML = `${error.message}`

  article.append(errorContainer);
}

export {
  loading,
  loaded
}
function loading(message = "Loading...") {
  const article = document.querySelector("article");
  [...article.children].forEach(child => child.style.display = "none");

  const loadingContainer = document.createElement('div');
  loadingContainer.className = 'loadingContainer';

  const loader = document.createElement('div');
  loader.className = 'loader';

  const loadingMessage = document.createElement('p');
  loadingMessage.innerHTML = message;

  loadingContainer.append(loader, loadingMessage);
  article.append(loadingContainer);
}

function loaded(){
  const article = document.querySelector("article");
  article.removeChild(article.querySelector(".loadingContainer"));
  [...article.children].forEach(child => child.style.display = "");
}

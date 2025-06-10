export {
  loading,
  loaded
}

function loading(message = "Loading...") {
  const body = document.querySelector("body");

  const loadingContainer = document.createElement('div');
  loadingContainer.className = 'loadingContainer';

  const loader = document.createElement('div');
  loader.className = 'loader';

  const loadingMessage = document.createElement('p');
  loadingMessage.innerHTML = message;

  const blackoutContainer = document.createElement('div');
  blackoutContainer.className = 'blackout';

  loadingContainer.append(loader, loadingMessage);
  body.append(loadingContainer);
  body.append(blackoutContainer);
}

function loaded() {
  const loading = document.querySelector(".loadingContainer");
  if (loading === null){
    return
  }
  const blackout = document.querySelector(".blackout");
  loading.remove();
  blackout.remove();
}

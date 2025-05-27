export async function buildLeaderBoard(users, containerQuery){
  const usersContainer = document.querySelector(containerQuery);
  usersContainer.innerHTML = '';

  let title;
  if (usersContainer.id === 'attempts'){
    title = "Today's attempts"
  } else {
    title = "Longest streak"
  }
  usersContainer.innerHTML = `<h3>${title}</h3>`
  if (users.length === 0){
    usersContainer.insertAdjacentHTML('beforeend', '<p>There are no users yet</p>');
  }
  users.forEach(user => {
    const [username, valueField] = Object.values(user);

    const div = document.createElement('div');
    div.classList.add('leaderBoardUser');
    div.innerHTML = `
    <span class="username">${username}</span>
    <span class="valueField">${valueField}</span>
  `;
    usersContainer.appendChild(div);
  });

}

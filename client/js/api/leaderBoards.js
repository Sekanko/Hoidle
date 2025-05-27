import { top5AttemptsEndpoint, top5StreakEndpoint } from "../common/constants.js";

export async function getAttemptsLeaderBoard(){
  return await getAndPrepareData(top5AttemptsEndpoint, 'todaysAttempts');
}

export async function getStreakLeaderBoard(){
  return await getAndPrepareData(top5StreakEndpoint, 'streak');
}

async function getAndPrepareData(endpoint, fieldName) {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.map(user => {
    return {
      username: user.username,
      [fieldName]: user[fieldName],
    }
  });
}

export async function sendUser(email, password, endpoint) {
  const requestUser = {
    email: email,
    password: password
  }
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestUser)
  });

  if (!response.ok) {
    const error = new Error();
    error.status = response.status;
    throw error;
  }
  return response;
}

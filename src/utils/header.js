export function createHeaders(authToken) {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  return { headers };
}

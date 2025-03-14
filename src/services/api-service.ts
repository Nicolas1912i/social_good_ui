export function uploadCsv(data: string, accessToken: string): Promise<Response> {
  return fetch("http://localhost:4000/contacts?access_token=" + accessToken, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
}

export function getContacts(accessToken: string): Promise<Response> {
  return fetch("http://localhost:4000/contacts?access_token=" + accessToken, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
}
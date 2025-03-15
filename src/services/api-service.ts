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

export function getUploadStatus(accessToken: string, activity_id: string): Promise<Response> {
  return fetch("http://localhost:4000/status?access_token=" + accessToken + "&activity_id=" + activity_id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
}
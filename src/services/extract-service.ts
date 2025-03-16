export function extractAccessToken(): string {
  const authResponse = window.location.hash.slice(1);
  const match = authResponse.match(/access_token=([^&]+)/);
  if (match && match[1]) {
    return match[1];
  }

  throw new Error("Unable to extract access token");
}

import { ApiUrlEnum } from "@/enums/api-url-enum";
import { API_CONFIG } from "@/config/api-config";

export function getUrl(url: ApiUrlEnum): string {
  switch (url) {
    case ApiUrlEnum.Authorize:
      return API_CONFIG.AUTHORIZATION_URL;
    case ApiUrlEnum.Contact:
      return API_CONFIG.CONTACTS_URL;
    case ApiUrlEnum.Status:
      return API_CONFIG.STATUS_URL;
  }
}

export function uploadCsv(
  data: string,
  accessToken: string,
): Promise<Response> {
  const url = `${getUrl(ApiUrlEnum.Contact)}?access_token=${accessToken}`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
}

export function getContacts(accessToken: string): Promise<Response> {
  const url = `${getUrl(ApiUrlEnum.Contact)}?access_token=${accessToken}`;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function getUploadStatus(
  accessToken: string,
  activity_id: string,
): Promise<Response> {
  const url = `${getUrl(ApiUrlEnum.Status)}?access_token=${accessToken}&activity_id=${activity_id}`;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

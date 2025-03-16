type ApiConfig = {
  AUTHORIZATION_URL: string;
  CONTACTS_URL: string;
  STATUS_URL: string;
};

export const API_CONFIG: ApiConfig = {
  AUTHORIZATION_URL: "http://localhost:4000/authorize",
  CONTACTS_URL: "http://localhost:4000/contacts",
  STATUS_URL: "http://localhost:4000/status",
};

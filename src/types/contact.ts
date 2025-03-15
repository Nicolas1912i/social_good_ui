type EmailAddress = {
  address: string;
}

type PhoneNumber = {
  phone_number: string;
}

type StreetAddress = {
  street: string;
  city: string;
  state: string;
  country: string;
}

export type Contact = {
  email_address: EmailAddress;
  email: string;
  first_name: string;
  last_name: string;
  street_addresses: StreetAddress[];
  address: string;
  phone_numbers: PhoneNumber[];
  phone: string;
}
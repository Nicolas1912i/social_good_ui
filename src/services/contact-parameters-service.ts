import { Contact } from "@/types/contact";

export function setContactsParameters(contact: Contact): Contact {
  const streetAddress = contact.street_addresses[0]
    ? contact.street_addresses[0]
    : undefined;
  const phoneNumber = contact.phone_numbers[0]
    ? contact.phone_numbers[0].phone_number
    : undefined;
  contact.email = contact.email_address.address;

  if (streetAddress)
    contact.address = `${streetAddress.street}, ${streetAddress.city}, ${streetAddress.state}, ${streetAddress.country}`;
  if (phoneNumber) contact.phone = phoneNumber;

  return contact;
}

export class CustomerDTO {
  firstName: string;
  lastName: string;
  username: string;
  emailAddress: string;

  constructor(
    firstName: string,
    lastName: string,
    username: string,
    emailAddress: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.emailAddress = emailAddress;
  }
}

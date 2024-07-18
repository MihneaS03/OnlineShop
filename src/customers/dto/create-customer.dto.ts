export class CreateCustomerDTO {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  emailAddress: string;

  constructor(
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    emailAddress: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.emailAddress = emailAddress;
  }
}

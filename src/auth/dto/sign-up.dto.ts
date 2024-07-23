export class SignUpDTO {
  username: string;
  emailAddress: string;
  password: string;

  constructor(username: string, emailAddress: string, password: string) {
    this.username = username;
    this.emailAddress = emailAddress;
    this.password = password;
  }
}

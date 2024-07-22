export class LoginDTO {
  username: string;
  password: string;

  constructor(username: string, emailAddress: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

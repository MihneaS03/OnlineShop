import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDTO {
  @ApiProperty({ description: 'The first name of the customer' })
  firstName: string;

  @ApiProperty({ description: 'The last name of the customer' })
  lastName: string;

  @ApiProperty({ description: 'The username of the customer' })
  username: string;

  @ApiProperty({ description: 'The password of the customer' })
  password: string;

  @ApiProperty({ description: 'The email address of the customer' })
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

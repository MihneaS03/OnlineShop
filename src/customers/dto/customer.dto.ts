import { ApiProperty } from '@nestjs/swagger';

export class CustomerDTO {
  @ApiProperty({ description: 'The first name of the customer' })
  firstName: string;

  @ApiProperty({ description: 'The last name of the customer' })
  lastName: string;

  @ApiProperty({ description: 'The username of the customer' })
  username: string;

  @ApiProperty({ description: 'The email address of the customer' })
  emailAddress: string;

  @ApiProperty({ description: 'The role of the user' })
  role: string;

  constructor(
    firstName: string,
    lastName: string,
    username: string,
    emailAddress: string,
    role: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.emailAddress = emailAddress;
    this.role = role;
  }
}

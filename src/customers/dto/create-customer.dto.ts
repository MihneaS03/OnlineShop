import { IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDTO {
  @ApiProperty({ description: 'The first name of the customer' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'The last name of the customer' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'The username of the customer' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'The password of the customer' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'The email address of the customer' })
  @IsNotEmpty()
  emailAddress: string;

  @ApiProperty({ description: 'The role of the user' })
  @IsNotEmpty()
  role: string;

  constructor(
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    emailAddress: string,
    role: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.emailAddress = emailAddress;
    this.role = role;
  }
}

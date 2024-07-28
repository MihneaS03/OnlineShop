import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDTO {
  @ApiProperty({ description: 'The first name of the customer' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'The last name of the customer' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'The username of the customer' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'The password of the customer' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: 'The email address of the customer' })
  @IsNotEmpty()
  @IsString()
  emailAddress: string;

  @ApiProperty({ description: 'The role of the user' })
  @IsNotEmpty()
  @IsString()
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

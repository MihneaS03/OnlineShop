import { Order } from 'src/orders/domain/order.domain';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({ name: 'FirstName' })
  firstName: string;

  @Column({ name: 'LastName' })
  lastName: string;

  @Column({ name: 'Username' })
  username: string;

  @Column({ name: 'Password' })
  password: string;

  @Column({ name: 'EmailAddress' })
  emailAddress: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

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

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enum/role.enum';

@Entity({
  name: 'users'
})
export class User {
  @ApiProperty({type: String})
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({type: String})
  @Column({ length: 50 })
  name: string;

  @ApiProperty({type: String})
  @Column({ length: 50, unique: true })
  email: string;

  @ApiProperty({type: String})
  @Column({ length: 100})
  password: string;

  @ApiProperty({type: Number})
  @Column({ type: 'int', nullable: true })
  phone: number;

  @ApiProperty({type: String})
  @Column({ length: 50, nullable: true })
  country: string;

  @ApiProperty({type: String})
  @Column({ type: 'text', nullable: true })
  address: string;

  @ApiProperty({type: String})
  @Column({ length: 50, nullable: true })
  city: string;

  @ApiProperty({type: () => [Order]})
  @OneToMany(() => Order, order => order.userId)
  orders: Order[];

  @ApiProperty({type: Date})
  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' } )
  createdAt: Date;

  @ApiProperty({default: 'User'})
  @Column({type: 'enum', enum: Role, default: Role.User})
  administrator: Role;
}

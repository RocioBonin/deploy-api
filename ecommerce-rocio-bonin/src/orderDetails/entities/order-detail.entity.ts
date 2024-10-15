import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinColumn } from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { Product } from '../../product/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
    name: 'orderDetails'
  })
export class OrderDetail {
  @ApiProperty({type: String})
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({type: Number})
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty({type: () => Order})
  @OneToOne(() => Order, order => order.orderDetail)
  @JoinColumn()
  order: Order;

  @ApiProperty({type: () => [Product]})
  @ManyToMany(() => Product, product => product.orderDetails)
  products: Product[];
}

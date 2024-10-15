import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { OrderDetail } from '../../orderDetails/entities/order-detail.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
    name: 'orders'
})
export class Order {
  @ApiProperty({type: String})
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({type: () => User})
  @ManyToOne(() => User, user => user.orders)
  userId: User;

  @ApiProperty({type: Date})
  @Column()
  date: Date;

  @ApiProperty({type: () => OrderDetail})
  @OneToOne(() => OrderDetail, orderDetail => orderDetail.order)
  orderDetail: OrderDetail;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { OrderDetail } from '../../orderDetails/entities/order-detail.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
    name: 'products'
  })
export class Product {
  @ApiProperty({type: String})
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({type: String})
  @Column({ length: 50 })
  name: string;

  @ApiProperty({type: String})
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({type: Number})
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty({type: Number})
  @Column({ type: 'int' })
  stock: number;

  @ApiProperty({type: String})
  @Column({ default: 'https://tienda.personal.com.ar/images/720/webp/Motorola_Razr_40_Morado_Amatista_c5ce39799d.png' })
  imgUrl: string;

  @ApiProperty({type: () => Category})
  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @ApiProperty({type:  () => [OrderDetail]})
  @ManyToMany(() => OrderDetail, orderDetail => orderDetail.products)
  @JoinTable()
  orderDetails: OrderDetail[];
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name:'categories'
})
export class Category {
  @ApiProperty({type: String})
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({type: String})
  @Column({ length: 50 })
  name: string;

  @ApiProperty({type: () => [Product]})
  @OneToMany(() => Product, product => product.category)
  products: Product[];
}

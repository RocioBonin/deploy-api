import { ApiProperty } from "@nestjs/swagger";
import { OrderDetail } from "../../orderDetails/entities/order-detail.entity";
import { CreateOrderDto } from "./create-order.dto";
import { CreateProductDto } from "../../product/dto/create-products.dto";
import { IsUUID } from "class-validator";

export class OrderResponseDto {
    @ApiProperty({
        type: String,
        description: "ID del detalle de orden"
    })
    @IsUUID()
    id: string;

    @ApiProperty({
        type: Number,
        description: 'Precio total de la orden',
    })
    price: number;

    @ApiProperty({
        type: () => [CreateProductDto],
        description: 'Lista de productos en la orden',
    })
    products: CreateProductDto[];
    
    @ApiProperty({
        type: () => CreateOrderDto,
        description: 'Orden asociada con el detalle',
    })
    order: CreateOrderDto;

    constructor(orderDetail: OrderDetail) {
        this.id = orderDetail.id;
        this.price = orderDetail.price;
        this.products = orderDetail.products;
        this.order = {
            id: orderDetail.order.id,
            date: orderDetail.order.date,
            userId:orderDetail.order.userId.id
        };
    };
};
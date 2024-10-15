import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsObject } from "class-validator";

export class CreateOrderDetailDto {
    @ApiProperty({
        type: Number,
        description: "Precio del producto"
    })
    @IsNumber()
    price: number;

    @ApiProperty({
        type: Object,
        description: "Muestra la orden con su información"
    })
    @IsObject()
    order: object;

    @ApiProperty({
        type: Array,
        description: "Es un array que contiene todos los productos asociados"
    })
    @IsArray()
    products: Array<Object>
}
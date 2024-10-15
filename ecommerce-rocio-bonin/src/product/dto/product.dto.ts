import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUUID } from "class-validator";

export class ProductDto {
    @ApiProperty({
        type: String,
        description: "Clave única del producto"
    })
    @IsUUID()
    id: string;

    @ApiProperty({
        type: String,
        description: "Nombre del producto"
    })
    @IsString()
    name: string;

    @ApiProperty({
        type: String,
        description: "Descripción del producto"
    })
    @IsString()
    description: string;

    @ApiProperty({
        type: Number,
        description: "Precio del producto"
    })
    @IsNumber()
    price: number;

    @ApiProperty({
        type: Number,
        description: "Indica la cantidad de stock del producto"
    })
    @IsNumber()
    stock: number;

    @ApiProperty({
        type: String,
        description: "Imagen del producto"
    })
    @IsString()
    imgUrl: string;
}
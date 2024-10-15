import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
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

    @ApiProperty({
        required: false,
        type: String,
        description: "Indica el nombre de la categoria a la que pertenece el producto"
    })
    @IsString()
    @IsOptional()
    categoryName?: string;
}
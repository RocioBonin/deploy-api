import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";

export class ProductsId {
    @ApiProperty({
        type: String,
        description: 'ID del producto que se va a incluir en la orden',
    })
    id: string;
}

export class CreateOrderDto {
    @ApiProperty({
        type: String,
        description: 'Clave única de la orden',
    }) 
    @IsUUID()
    id?: string;
    
    @ApiProperty({
        type: String,
        description: 'ID del usuario que realiza la orden',
    })
    @IsNotEmpty()
    @IsUUID('all', { message: 'El userId debe ser un UUID válido.' })
    userId: string;

    @ApiProperty({
        required: false,
        type: Date,
        description: "Fecha de la orden"
    })
    date?: Date;

    @ApiProperty({
        required: false,
        type: () => ProductsId,
        description: 'Lista de IDs de productos para la orden',
        minimum: 1,
    })
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true }) 
    @Type(() => ProductsId) 
    products?: ProductsId[];
}
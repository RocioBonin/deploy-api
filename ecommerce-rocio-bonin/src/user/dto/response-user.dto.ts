import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
    @ApiProperty({
        type: String,
        description: "Clave única del usuario"
    })
    id: string;

    @ApiProperty({
        type: String,
        description: "Nombre del usuario"
    })
    name: string;

    @ApiProperty({
        type: String,
        description: "Email del usuario"
    })
    email: string;

    @ApiProperty({
        type: String,
        description: "Dirección del usuario"
    })
    address: string;

    @ApiProperty({
        type: Number,
        description: "Número de celular del usuario"
    })
    phone: number;

    @ApiProperty({ 
        required: false,
        type: String,
        description: "País del usuario"
     })
    country?: string;

    @ApiProperty({ 
        required: false,
        type: String,
        description: "Ciudad del usuario"
     })
    city?: string;

    @ApiProperty({
        type: Date,
        description: "Fecha de la creación del usuario"
    })
    createdAt: Date;

    @ApiProperty({
        type: () => [
            {
                id: String,
                date: Date,
            },
        ],
        description: "Órdenes del usuario",
    })
    orders: { id: string; date: Date }[];
    

    constructor(partial: Partial<UserResponseDto>) {
        const { id, name, email, address, phone, country, city, createdAt, orders } = partial
        this.id = id;
        this.name = name;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.country = country;
        this.city = city;
        this.createdAt = createdAt;
        this.orders = orders || [];
    }
}

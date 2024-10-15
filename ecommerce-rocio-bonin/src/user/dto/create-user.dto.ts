import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Length, Matches } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    @ApiProperty({
        type: String,
        description: "Nombre del usurario"
    })
    name: string;

    @IsEmail({}, {message: 'El correo electrónico debe tener una estructura válida.'})
    @ApiProperty({
        type: String,
        description: "El email del usuario"
    })
    email: string;
    
    @IsString()
    @Length(8, 15)
    @IsStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    @Matches(/[!@#$%^&*]/, { message: 'La contraseña debe contener al menos un carácter especial: !@#$%^&*' })
    @ApiProperty({
        type: String,
        description: "Contraseña del usuario"
    })
    password: string; 

    @Length(3, 80)
    @IsString()
    @ApiProperty({
        type: String,
        description: "Dirección del usuario"
    })
    address: string;
   
    @IsNotEmpty({message: 'El número de teléfono debe estar presente.'})
    @IsNumber()
    @ApiProperty({
        type: Number,
        description: "Número de celular del usuario"
    })
    phone: number;

    @IsString()
    @Length(5, 20)
    @ApiProperty({
        required: false,
        type: String,
        description: "País del usuario"
    })
    country?: string;

    @IsString()
    @Length(5, 20)
    @ApiProperty({
        required: false,
        type: String,
        description: "Ciudad del usuario"
    })
    city?: string;
}
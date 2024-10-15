import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber,  IsOptional, IsString, IsStrongPassword, Length, Matches } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @Length(3, 80)
    @ApiProperty({
        required: false,
        type: String,
        description: "Nombre del usuario"
    })
    name?: string;

    @IsOptional()
    @IsString()
    @IsEmail({}, {message: 'El correo electrónico debe tener una estructura válida.'})
    @ApiProperty({
        required: false,
        type: String,
        description: "El email del usuario"
    })
    email?: string;
    
    @IsOptional()
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
        required: false,
        type: String,
        description: "Contraseña del usuario"
    })
    password?: string; 

    @IsOptional()
    @Length(3, 80)
    @IsString()
    @ApiProperty({
        required: false,
        type: String,
        description: "Dirección del usuario"
    })
    address?: string;
   
    @IsOptional()
    @IsNumber()
    @ApiProperty({
        required: false,
        type: Number,
        description: "Número de celular del usuario"
    })
    phone?: number;

    @IsOptional()
    @IsString()
    @Length(5, 20)
    @ApiProperty({
        required: false,
        type: String,
        description: "País del usuario"
    })
    country?: string;

    @IsOptional()
    @IsString()
    @Length(5, 20)
    @ApiProperty({
        required: false,
        type: String,
        description: "Ciudad del usuario"
    })
    city?: string;
}
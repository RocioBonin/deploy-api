import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Length, Matches } from "class-validator";

export class SignUpAuthDto {
    @ApiProperty({
        type: String,
        description: "Nombre del usuario"
    })
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    name: string;

    @ApiProperty({
        type: String,
        description: "Email del usuario"
    })
    @IsEmail({}, {message: 'El correo electrónico debe tener una estructura válida.'})
    email: string;
    
    @ApiProperty({
        type: String,
        description: "Contraseña del usuario"
    })
    @IsString()
    @Length(8, 15)
    @IsStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    @Matches(/[!@#$%^&*]/, { message: 'La contraseña debe contener al menos un carácter especial: !@#$%^&*' })
    password: string; 

    @ApiProperty({
        type: String,
        description: "Confirmación de contraseña, debe ser idéntica"
    })
    @IsString()
    @IsNotEmpty()
    @Length(8, 15)
    @IsStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    @Matches(/[!@#$%^&*]/, { message: 'La contraseña debe contener al menos un carácter especial: !@#$%^&*' })
    passwordConfirm: string; 

    @ApiProperty({
        type: String,
        description: "Dirección del usuario"
    })
    @Length(3, 80)
    @IsString()
    address: string;
   
    @ApiProperty({
        type: Number,
        description: "Número de celular del usuario"
    })
    @IsNotEmpty({message: 'El número de teléfono debe estar presente.'})
    @IsNumber()
    phone: number;

    @ApiProperty({
        required: false,
        type: String,
        description: "El País del usuario"
    })
    @IsString()
    @Length(5, 20)
    country?: string;

    @ApiProperty({
        required: false,
        type: String,
        description: "Ciudad del usuario"
    })
    @IsString()
    @Length(5, 20)
    city?: string;
}
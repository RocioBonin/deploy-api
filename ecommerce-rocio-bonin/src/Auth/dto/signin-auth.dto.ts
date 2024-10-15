import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword, Matches } from "class-validator";

export class SignInAuthDto {
    @ApiProperty({
        type: String,
        description: "Email para ingresar, anteriormente creado por el usuario"
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        type: String,
        description: "Contraseña para ingresar, anteriormente creada por el usuario"
    })
    @IsNotEmpty()
    @IsStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    @Matches(/[!@#$%^&*]/, { message: 'La contraseña debe contener al menos un carácter especial: !@#$%^&*' })
    password: string;
}
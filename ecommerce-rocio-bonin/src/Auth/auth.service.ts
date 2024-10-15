import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { SignUpAuthDto } from "./dto/signup-auth.dto";
import { hash, compare } from "bcrypt";
import { SignInAuthDto } from "./dto/signin-auth.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService
    ) {}
    
    async signUp (signUpUser: SignUpAuthDto) {
        
        if(signUpUser.password != signUpUser.passwordConfirm) {
            throw new HttpException('Las contraseñas no coinciden', 400)
        }

        signUpUser.password = await hash(signUpUser.password, 10)

        await this.usersService.createUser(signUpUser)

        return signUpUser;
    }

    async signIn(credentials: SignInAuthDto) {
        const user = await this.usersService.findEmail(credentials.email)

        if(!user) {
            throw new HttpException('Usuario no encontrado' , 404)
        }
        
        const isPasswordMatching = await compare(
            credentials.password,
            user.password,
        )

        console.log('las contraseñas coinciden?', isPasswordMatching);

        if(!isPasswordMatching) {
            throw new HttpException('Credenciales Incorrectas', HttpStatus.UNAUTHORIZED)
        }

        const userPayload = {
            id: user.id,
            email: user.email,
            administrator: user.administrator,
        }

        const token = this.jwtService.sign(userPayload)

        return { token };
    }
}
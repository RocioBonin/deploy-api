import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpAuthDto } from "./dto/signup-auth.dto";
import { UserResponseDto } from "../user/dto/response-user.dto";
import { SignInAuthDto } from "./dto/signin-auth.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
 
    @Post('signup')
    @HttpCode(201)
    async signUp(@Body()  signUpUser: SignUpAuthDto) {
        const newUser =  await this.authService.signUp(signUpUser)
        return new UserResponseDto(newUser)
    }

    @Post('signin')
    @HttpCode(200)
    async signIn(@Body() credentials: SignInAuthDto) {
        return await this.authService.signIn(credentials)
    }
}

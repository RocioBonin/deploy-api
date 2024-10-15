import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";


@Module({
    imports: [UserModule, TypeOrmModule.forFeature([User])],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}


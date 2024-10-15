import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from './entities/user.entity';
import { Order } from "../order/entities/order.entity";


@Module({
    imports: [TypeOrmModule.forFeature([User, Order])],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
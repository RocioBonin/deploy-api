import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { OrderDetail } from "../orderDetails/entities/order-detail.entity";
import { User } from "../user/entities/user.entity";
import { Product } from "../product/entities/product.entity";
import { UserModule } from "../user/user.module";
import { ProductModule } from "../product/product.module";
import { OrderController } from "./order.controller";
import { OrdersService } from "./order.service";
import { OrdersRepository } from "./order.repository";
import { OrderDetailsModule } from "../orderDetails/orderDetail.module";
import { ProductService } from "../product/product.service";
import { UserService } from "../user/user.service";
import { OrderDetailsService } from "../orderDetails/orderDetail.service";



@Module({
    imports: [TypeOrmModule.forFeature([Order, User, OrderDetail, Product]),
    UserModule,
    ProductModule,
    OrderDetailsModule,
    ],
    
    controllers: [OrderController],
    providers: [OrdersService, OrdersRepository, ProductService, UserService, OrderDetailsService],
    exports: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
import { Module } from "@nestjs/common";
import { OrderDetailsService } from "./orderDetail.service";
import { OrderDetailController } from "./orderDetail.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderDetail } from "./entities/order-detail.entity";
import { OrderDetailRepository } from "./orderDetail.repository";
import { Order } from "../order/entities/order.entity";
import { Product } from "../product/entities/product.entity";

@Module({
    imports: [TypeOrmModule.forFeature([OrderDetail, Order, Product])],
    providers: [OrderDetailsService, OrderDetailRepository],
    controllers: [OrderDetailController],
    exports: [OrderDetailsService, OrderDetailRepository]
})
export class OrderDetailsModule {}
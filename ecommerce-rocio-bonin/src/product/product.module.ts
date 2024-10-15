import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Category } from "../categories/entities/category.entity";
import { OrderDetail } from "../orderDetails/entities/order-detail.entity";
import { ProductsSeed } from "../seeds/products/products.seed";
import { CategoriesSeed } from "../seeds/categories/categories.seed";

@Module({
    imports: [TypeOrmModule.forFeature([Product, Category, OrderDetail])],
    providers: [ProductService, ProductsSeed, CategoriesSeed],
    controllers: [ProductController],
    exports: [ProductService, ProductsSeed]
})
export class ProductModule {}
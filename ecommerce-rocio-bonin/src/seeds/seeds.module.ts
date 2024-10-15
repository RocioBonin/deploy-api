import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesSeed } from "./categories/categories.seed";
import { ProductsSeed } from "./products/products.seed";
import { Product } from "../product/entities/product.entity";
import { Category } from "../categories/entities/category.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Category, Product])],
    providers: [CategoriesSeed, ProductsSeed],
    exports: [CategoriesSeed, ProductsSeed],
})

export class SeedsModule {}
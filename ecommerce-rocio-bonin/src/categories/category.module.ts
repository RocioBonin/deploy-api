import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../product/entities/product.entity";
import { CategoriesService } from "./category.service";
import { CategoriesRepository } from "./category.repository";
import { CategoriesController } from "./category.controller";
import { CategoriesSeed } from "../seeds/categories/categories.seed";
import { Category } from "./entities/category.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Category, Product])],
    providers: [CategoriesService, CategoriesRepository, CategoriesSeed],
    controllers: [CategoriesController],
    exports: [CategoriesService, CategoriesRepository, CategoriesSeed]
})

export class CategoriesModule {}
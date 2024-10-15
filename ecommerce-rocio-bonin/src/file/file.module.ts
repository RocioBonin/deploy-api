import { Module } from "@nestjs/common";
import { CloudinaryService } from "./cloudinary.service";
import { CloudinaryConfig } from "../config/cloudinary";
import { FileController } from "./file.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../product/entities/product.entity";
import { FileRespository } from "./file.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [FileController],
    providers: [CloudinaryService, CloudinaryConfig, FileRespository],
})
export class FilesModule{}
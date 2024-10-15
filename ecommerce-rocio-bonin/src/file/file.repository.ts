import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../product/entities/product.entity";
import { Repository } from "typeorm";
import { CloudinaryService } from "./cloudinary.service";
import { UploadApiResponse } from "cloudinary";

@Injectable()
export class FileRespository {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly cloudinaryService: CloudinaryService
    ) {}

    async updateProductImage(productId: string, imageUrl: string): Promise<void> {
        await this.productRepository.update(productId, {imgUrl: imageUrl})
    }

    async uploadAndUpdateImage( productId: string, file: Express.Multer.File): Promise<UploadApiResponse> {
        const result = await this.cloudinaryService.uploadImage(file);
        await this.updateProductImage(productId, result.secure_url);
        return result;
    }
}
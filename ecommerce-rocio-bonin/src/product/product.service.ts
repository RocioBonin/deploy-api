import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductDto } from "./dto/product.dto";
import { MoreThan, Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateProductDto } from "./dto/create-products.dto";
import { ProductsSeed } from "../seeds/products/products.seed";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly productSeed: ProductsSeed
    ) { }

    async pagination(page: number, limit: number) {
        const offset = (page - 1) * limit;

        return await this.productRepository.find({
            skip: offset,
            take: limit,
        });
    }

    async getAllProducts(): Promise<Product[]> {
        return await this.productRepository.find({
            where: {
                stock: MoreThan(0),
            },
            relations: ['category']
        });
    }

    async getProductById(id: string): Promise<Product> {
        const product = await this.productRepository.findOne({ 
            where: { id } ,
            relations: ['category']
        });

        if(!product) {
            throw new NotFoundException(`Producto con id: ${id} no encontrado`)
        }
        return product;
    }

    async createProduct(productDto: CreateProductDto): Promise<Product> {
        const category = await this.productSeed.findCategoryByName(productDto.categoryName);

        const newProduct = {
            ...productDto,
            category,
        }
        const product = this.productRepository.create(newProduct);
        return await this.productRepository.save(product);
    }

    async updateProduct(id: string, updateProduct: Partial<ProductDto>): Promise<Product> {
        const product = await this.getProductById(id);

        if(!product) {
            throw new NotFoundException(`Producto con id: ${id} no encontrado`)
        }

        const updatedProduct = this.productRepository.merge(product, updateProduct);

        await this.productRepository.save(updatedProduct);

        return updatedProduct;
    }

    async deleteProduct(id: string): Promise<string> {
        const product = await this.getProductById(id);
        if(!product) {
            throw new NotFoundException(`Producto con id: ${id} no encontrado`)
        }
        await this.productRepository.remove(product);
        return id;
    }

    async buyProduct(id: string) {
        const product = await this.getProductById(id);

        if (product.stock === 0) {
            throw new Error('agotado');
        }

        await this.updateProduct(id, { stock: product.stock - 1 });

        return product.price;
    }
}
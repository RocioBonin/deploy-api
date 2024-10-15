import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "../Auth/authGuard/auth.guard";
import { ProductController } from "./product.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { ConfigService } from "@nestjs/config";
import { ProductService } from "./product.service";
import { Product } from "./entities/product.entity";

describe('ProductController', () => {
    let productController: ProductController;
    let mockAuthGuard: AuthGuard;
    let mockJwtService: JwtService;
    let mockConfigService: ConfigService;
    let mockProductService: Partial<ProductService>;

    const mockProduct: Partial<Product> = {
        name: "product1",
        description: "description1",
        price: 20,
        stock: 2,
        imgUrl: "img1"
    }

    beforeEach(async () => {
        mockProductService = {
            getAllProducts: () => Promise.resolve([{...mockProduct, id: "1"} as Product])
        }

        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                {provide: AuthGuard, useValue: mockAuthGuard},
                {provide: JwtService, useValue: mockJwtService},
                {provide: ConfigService, useValue: mockConfigService},
                {provide: ProductService, useValue: mockProductService}
            ]
        }).compile();

        productController = module.get<ProductController>(ProductController);
    })

    it('getAllProducts() retorna un array de productos', async () => {
        const products = await productController.getAllProducts();

        expect(products).toEqual([
            {
                id: "1",
                name: "product1",
                description: "description1",
                price: 20,
                stock: 2,
                imgUrl: "img1"
            }
        ])
    })
})
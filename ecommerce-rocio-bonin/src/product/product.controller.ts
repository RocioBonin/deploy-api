import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductDto } from "./dto/product.dto";
import { AuthGuard } from "../Auth/authGuard/auth.guard";
import { CreateProductDto } from "./dto/create-products.dto";
import { RolesGuard } from "../guards/role.guard";
import { Role } from "../user/enum/role.enum";
import { Roles } from "../decorators/roles.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";


@ApiTags('Products')
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get('page')
    findWithPagination(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 5,
    ){
        return this.productService.pagination(page, limit)
    }

    @Get()
    @HttpCode(200)
    getAllProducts() {
        return this.productService.getAllProducts();
    }

    @Get(':id')
    @HttpCode(200)
    getProductById(@Param('id', ParseUUIDPipe) id: string) {
        return this.productService.getProductById(id);
    }

    @Post()
    @HttpCode(201)
    async createProduct(@Body() product: CreateProductDto) {
        const newProduct = await this.productService.createProduct(product);
        return {id: newProduct.id}
    }

    @ApiBearerAuth()
    @Put(':id')
    @HttpCode(200)
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() product: ProductDto) {
        this.productService.updateProduct(id, product);
        return { id }
    } 

    @Delete(':id')
    @HttpCode(200)
    deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
        this.productService.deleteProduct(id);
        return { id }
    } 
}

import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { CategoriesService } from "./category.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Categories')
@Controller('categories') 
export class CategoriesController {
    constructor( private readonly categoriesService: CategoriesService) {}

    @Get()
    @HttpCode(200)
    getCategories() {
        return this.categoriesService.getCategories();
    }

    @Post()
    @HttpCode(201)
    addCategories( @Body() name: string ) {
        return this.categoriesService.addCategories(name);
    }
}
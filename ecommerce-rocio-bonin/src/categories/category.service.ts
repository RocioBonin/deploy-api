import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "./category.repository";

@Injectable()
export class CategoriesService {
    constructor( private readonly categoriesRepository: CategoriesRepository ) {}

    async getCategories() {
        return await this.categoriesRepository.getCategories();
    }

    async addCategories(name: string) {
        return await this.categoriesRepository.addCategories(name);
    }
}
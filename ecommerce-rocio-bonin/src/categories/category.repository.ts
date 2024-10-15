import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./entities/category.entity";

@Injectable()
export class CategoriesRepository {
     constructor(
          @InjectRepository(Category)
          private readonly repository: Repository<Category>
     ) { }

     async getCategories() {
          return await this.repository.find();
     }

     async addCategories(name: string): Promise<Category> {
          const newCategory = this.repository.create({ name });
          return await this.repository.save(newCategory)
     }
}
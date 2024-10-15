import { Test, TestingModule } from "@nestjs/testing";
import { CategoriesController } from "./category.controller"
import { CategoriesService } from "./category.service";
import { Category } from "./entities/category.entity";

describe('CategoryController', () => {
    let categoryController: CategoriesController;
    let mockCategoryService: Partial<CategoriesService>;

    const mockCategory: Partial<Category[]> = [
        { id: "1", name: "category1", products: [] },
        { id: "2", name: "category2", products: [] }

    ]

    beforeEach(async () => {
        mockCategoryService = {
            getCategories: () => Promise.resolve([...mockCategory] as Category[])
        }
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CategoriesController],
            providers: [
                {
                    provide: CategoriesService,
                    useValue: mockCategoryService,
                },
            ],
        }).compile();

        categoryController = module.get<CategoriesController>(CategoriesController);

    })

    it("getCategories() debería retornar un array de categorías", async () => {
        const categories = await categoryController.getCategories();

        expect(categories).toEqual(mockCategory);
    });

})